import {
  ResolverSet as ResolverSetEvent,
  RoyaltyPayoutAddressSet as RoyaltyPayoutAddressSetEvent,
  RoyaltyPayoutAmountSet as RoyaltyPayoutAmountSetEvent,
  Transfer as TransferEvent,
} from "../generated/HandshakeSld/HandshakeSld";
import {
  Account,
  Delegate,
  Resolver,
  Royalty,
  RoyaltyHistory,
  Sld,
  SldTransfer,
  Tld,
} from "../generated/schema";

import { BigInt, log, Address } from "@graphprotocol/graph-ts";
import { createSLDEvent, createTLDEvent } from "./entity-helpers";
import {
  toAddress,
  toPaddedHexString,
  toPaddedHexStringFromBigint,
} from "./utils";

export function handleResolverSet(event: ResolverSetEvent): void {
  let namehash = toPaddedHexString(event.params._nftNamehash);
  let sldEntity = Sld.load(namehash);

  if (!sldEntity) {
    sldEntity = new Sld(namehash);
    sldEntity.tokenId = BigInt.fromUnsignedBytes(event.params._nftNamehash);

    // Default values for mandatory fields
    sldEntity.label = "";
    sldEntity.fullName = "";

    // Create a default Account for owner and registrant
    let defaultAccount = new Account(toAddress(Address.zero()));
    defaultAccount.WhnsBalance = BigInt.fromI32(0);
    defaultAccount.save();
    sldEntity.owner = defaultAccount.id;
    sldEntity.registrant = defaultAccount.id;

    sldEntity.registrationBlockNumber = event.block.number;
    sldEntity.lastUpdateBlockNumber = event.block.number;
    sldEntity.expirationTimestamp = event.block.timestamp.plus(
      BigInt.fromI32(31536000)
    );
    sldEntity.renewalCount = BigInt.fromI32(0);
    sldEntity.transferCount = BigInt.fromI32(0);
    sldEntity.resolverVersion = BigInt.fromI32(0);

    // Optional fields
    sldEntity.registrationTimestamp = event.block.timestamp;
    sldEntity.registrationTransactionHash = event.transaction.hash;
    sldEntity.lastUpdateTimestamp = event.block.timestamp;
    sldEntity.lastUpdateTransactionHash = event.transaction.hash;
  }

  // Create new resolver ID
  let resolverId = namehash + "-" + sldEntity.resolverVersion.toString();

  let resolverObj = new Resolver(resolverId);
  resolverObj.tokenId = BigInt.fromUnsignedBytes(event.params._nftNamehash);
  resolverObj.address = toAddress(event.params._resolver);
  resolverObj.version = sldEntity.resolverVersion;
  resolverObj.save();

  // Update SLD entity with new resolver
  sldEntity.resolver = resolverId;
  sldEntity.lastUpdateBlockNumber = event.block.number;
  sldEntity.lastUpdateTimestamp = event.block.timestamp;
  sldEntity.lastUpdateTransactionHash = event.transaction.hash;
  sldEntity.save();

  createSLDEvent(
    sldEntity.tokenId,
    event.transaction.hash,
    event.block.timestamp
  );
}

export function handleRoyaltyPayoutAddressSet(
  event: RoyaltyPayoutAddressSetEvent
): void {
  let tldId = toPaddedHexString(event.params._nftNamehash);
  let tldEntity = Tld.load(tldId);
  if (tldEntity && tldEntity.royalty) {
    let royaltyEntity = Royalty.load(tldEntity.id);
    if (royaltyEntity) {
      // Create a new RoyaltyHistory entity
      let historyId = event.transaction.hash
        .concatI32(event.logIndex.toI32())
        .toHexString();
      let historyEntity = new RoyaltyHistory(historyId);
      historyEntity.tld = tldEntity.id;
      historyEntity.percentage = royaltyEntity.percentage;
      historyEntity.payoutAddress = toAddress(event.params._payoutAddress);
      historyEntity.blockNumber = event.block.number;
      historyEntity.blockTimestamp = event.block.timestamp;
      historyEntity.transactionHash = event.transaction.hash;
      historyEntity.save();

      // Update the current Royalty entity
      royaltyEntity.payoutAddress = toAddress(event.params._payoutAddress);

      royaltyEntity.save();
    }
  } else {
    if (tldEntity && tldEntity.royalty == null) {
      let royaltyEntity = new Royalty(tldEntity.id);
      royaltyEntity.payoutAddress = toAddress(event.params._payoutAddress);
      royaltyEntity.percentage = BigInt.fromI32(0);
      royaltyEntity.tld = tldEntity.id;
      royaltyEntity.save();

      tldEntity.royalty = royaltyEntity.id;
      tldEntity.save();
    }
  }

  createTLDEvent(
    BigInt.fromUnsignedBytes(event.params._nftNamehash),
    event.transaction.hash,
    event.block.timestamp
  );
}

export function handleRoyaltyPayoutAmountSet(
  event: RoyaltyPayoutAmountSetEvent
): void {
  let tldId = toPaddedHexString(event.params._nftNamehash);
  let tldEntity = Tld.load(tldId);
  if (tldEntity && tldEntity.royalty) {
    let royaltyEntity = Royalty.load(tldEntity.royalty as string);
    if (royaltyEntity) {
      // Create a new RoyaltyHistory entity
      let historyId = event.transaction.hash
        .concatI32(event.logIndex.toI32())
        .toHexString();
      let historyEntity = new RoyaltyHistory(historyId);
      historyEntity.tld = tldEntity.id;
      historyEntity.percentage = event.params._amount;
      historyEntity.payoutAddress = royaltyEntity.payoutAddress;
      historyEntity.blockNumber = event.block.number;
      historyEntity.blockTimestamp = event.block.timestamp;
      historyEntity.transactionHash = event.transaction.hash;
      historyEntity.save();

      // Update the current Royalty entity
      royaltyEntity.percentage = event.params._amount;
      royaltyEntity.save();
    }
  } else {
    if (tldEntity && tldEntity.royalty == null) {
      let royaltyEntity = new Royalty(tldEntity.id);

      royaltyEntity.percentage = event.params._amount;
      royaltyEntity.payoutAddress = tldEntity.owner;
      royaltyEntity.tld = tldEntity.id;
      royaltyEntity.save();

      tldEntity.royalty = royaltyEntity.id;
      tldEntity.save();
    }
  }

  createTLDEvent(
    BigInt.fromUnsignedBytes(event.params._nftNamehash),
    event.transaction.hash,
    event.block.timestamp
  );
}

//TODO: update resolver delegate
export function handleTransfer(event: TransferEvent): void {
  let sldId = toPaddedHexStringFromBigint(event.params.tokenId);
  let tokenId = event.params.tokenId;
  let sld = Sld.load(sldId);

  // Create or load the Account entity for the new owner (we'll need this in both cases)
  let newOwnerId = toAddress(event.params.to);
  let newOwnerAccount = Account.load(newOwnerId);
  if (newOwnerAccount == null) {
    newOwnerAccount = new Account(newOwnerId);
    newOwnerAccount.WhnsBalance = BigInt.fromI32(0);
    newOwnerAccount.save();
  }

  if (sld === null) {
    sld = new Sld(sldId);

    // Initialize required fields based on schema
    sld.tokenId = tokenId;
    sld.label = "";
    sld.fullName = "";
    sld.owner = newOwnerAccount.id;
    sld.registrant = newOwnerAccount.id; // Setting registrant as the first owner
    sld.registrationBlockNumber = event.block.number;
    sld.registrationTimestamp = event.block.timestamp;
    sld.registrationTransactionHash = event.transaction.hash;
    sld.lastUpdateBlockNumber = event.block.number;
    sld.lastUpdateTimestamp = event.block.timestamp;
    sld.lastUpdateTransactionHash = event.transaction.hash;
    sld.expirationTimestamp = BigInt.zero();
    sld.renewalCount = BigInt.fromI32(0);
    sld.transferCount = BigInt.fromI32(0);
    sld.resolverVersion = BigInt.fromI32(1);
  }

  // Now we can proceed with the transfer logic since we know sld exists
  // Create or load the Account entity for the old owner
  let oldOwnerId = toAddress(event.params.from);
  let oldOwnerAccount = Account.load(oldOwnerId);
  if (oldOwnerAccount == null) {
    oldOwnerAccount = new Account(oldOwnerId);
    oldOwnerAccount.WhnsBalance = BigInt.fromI32(0);
    oldOwnerAccount.save();
  }

  let delegateId = sldId.concat("-").concat(newOwnerId);
  let delegateEntity = Delegate.load(delegateId);
  if (delegateEntity == null) {
    delegateEntity = new Delegate(delegateId);
  }

  sld.delegate = delegateEntity.id;
  sld.owner = newOwnerAccount.id;
  sld.lastUpdateBlockNumber = event.block.number;
  sld.lastUpdateTimestamp = event.block.timestamp;
  sld.lastUpdateTransactionHash = event.transaction.hash;
  sld.transferCount = sld.transferCount.plus(BigInt.fromI32(1));

  // Create a new SldTransfer entity
  let transferEventId = sld.id + "-" + sld.transferCount.toString();
  let transferEvent = new SldTransfer(transferEventId);

  // Populate SldTransfer fields
  transferEvent.sld = sld.id;
  transferEvent.oldOwner = oldOwnerAccount.id;
  transferEvent.newOwner = newOwnerAccount.id;
  transferEvent.blockNumber = event.block.number;
  transferEvent.blockTimestamp = event.block.timestamp;
  transferEvent.transactionHash = event.transaction.hash;

  // Save entities
  delegateEntity.save();
  transferEvent.save();
  sld.save();

  log.info(
    "HIGHWAY TO THE DANGER ZONE\n" +
      "--------------------------------\n" +
      "Token ID: {}\n" +
      "Full Name: {}\n" +
      "Old Owner: {}\n" +
      "New Owner: {}\n" +
      "Block: {}\n" +
      "Timestamp: {}\n" +
      "TX Hash: {}\n" +
      "Transfer Count: {}\n" +
      "--------------------------------\n" +
      "REVVIN' UP YOUR ENGINE, LISTEN TO HER HOWLIN' ROAR! 🏍️\n",
    [
      sldId,
      sld.fullName,
      oldOwnerAccount.id,
      newOwnerAccount.id,
      event.block.number.toString(),
      event.block.timestamp.toString(),
      event.transaction.hash.toHexString(),
      sld.transferCount.toString(),
    ]
  );

  createSLDEvent(tokenId, event.transaction.hash, event.block.timestamp);
}
