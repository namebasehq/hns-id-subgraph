import {
  ResolverSet as ResolverSetEvent,
  RoyaltyPayoutAddressSet as RoyaltyPayoutAddressSetEvent,
  RoyaltyPayoutAmountSet as RoyaltyPayoutAmountSetEvent,
  Transfer as TransferEvent
} from "../generated/HandshakeSld/HandshakeSld"
import {
  Account,
  Delegate,
  Royalty,
  RoyaltyHistory,
  Sld,
  SldTransfer,
  Tld
} from "../generated/schema"

import { BigInt, ByteArray, Bytes, crypto } from "@graphprotocol/graph-ts";


// TODO: will need to implement this
export function handleResolverSet(event: ResolverSetEvent): void {

}

export function handleRoyaltyPayoutAddressSet(event: RoyaltyPayoutAddressSetEvent): void {
  let tldId = event.params._nftNamehash.toHexString();
  let tldEntity = Tld.load(tldId);
  if (tldEntity && tldEntity.royalty) {
    let royaltyEntity = Royalty.load(tldEntity.royalty as string);
    if (royaltyEntity) {
      // Create a new RoyaltyHistory entity
      let historyId = event.transaction.hash.concatI32(event.logIndex.toI32()).toHex();
      let historyEntity = new RoyaltyHistory(historyId);
      historyEntity.tld = tldEntity.id;
      historyEntity.percentage = royaltyEntity.percentage;
      historyEntity.payoutAddress = event.params._payoutAddress.toHex();
      historyEntity.blockNumber = event.block.number;
      historyEntity.blockTimestamp = event.block.timestamp;
      historyEntity.transactionHash = event.transaction.hash;
      historyEntity.save();

      // Update the current Royalty entity
      royaltyEntity.payoutAddress = event.params._payoutAddress.toHex();

      royaltyEntity.save();
    }
  }
}

export function handleRoyaltyPayoutAmountSet(event: RoyaltyPayoutAmountSetEvent): void {
  let tldId = event.params._nftNamehash.toHexString();
  let tldEntity = Tld.load(tldId);
  if (tldEntity && tldEntity.royalty) {
    let royaltyEntity = Royalty.load(tldEntity.royalty as string);
    if (royaltyEntity) {
      // Create a new RoyaltyHistory entity
      let historyId = event.transaction.hash.concatI32(event.logIndex.toI32()).toHex();
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
  }
}

//TODO: update resolver delegate
export function handleTransfer(event: TransferEvent): void {
  // Convert the tokenId to its hex string representation
  let sldId = event.params.tokenId.toHexString();

  let tokenId = event.params.tokenId.toHexString();

  // Load the existing Sld entity from the store
  let sld = Sld.load(sldId);

  // Check if the Sld entity exists
  if (sld !== null) {
    // Create or load the Account entity for the new owner
    let newOwnerId = event.params.to.toHex();
    let newOwnerAccount = Account.load(newOwnerId);
    if (newOwnerAccount == null) {
      newOwnerAccount = new Account(newOwnerId);
      newOwnerAccount.save();
    }

    // Create or load the Account entity for the old owner
    let oldOwnerId = event.params.from.toHex();
    let oldOwnerAccount = Account.load(oldOwnerId);
    if (oldOwnerAccount == null) {
      oldOwnerAccount = new Account(oldOwnerId);
      oldOwnerAccount.save();
    }

    let delegateId = tokenId.concat("-").concat(newOwnerId);

    // Try loading the Delegate entity, or create a new one if it doesn't exist
    let delegateEntity = Delegate.load(delegateId);
    if (delegateEntity == null) {
      delegateEntity = new Delegate(delegateId);
    }

    sld.delegate = delegateEntity.id;

    // Update the owner field on the Sld entity
    sld.owner = newOwnerAccount.id;
    
    // Update other fields on the Sld entity
    sld.lastUpdateBlockNumber = event.block.number;
    sld.lastUpdateTimestamp = event.block.timestamp;
    sld.lastUpdateTransactionHash = event.transaction.hash;

    // Increment the transferCount
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

    // Save SldTransfer entity
    transferEvent.save();

    // Save the updated Sld entity back to the store
    sld.save();
  }
}

