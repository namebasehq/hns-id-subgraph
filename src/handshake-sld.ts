import {
  ResolverSet as ResolverSetEvent,
  RoyaltyPayoutAddressSet as RoyaltyPayoutAddressSetEvent,
  RoyaltyPayoutAmountSet as RoyaltyPayoutAmountSetEvent,
  Transfer as TransferEvent
} from "../generated/HandshakeSld/HandshakeSld"
import {
  Account,
  Delegate,
  Resolver,
  Royalty,
  RoyaltyHistory,
  Sld,
  SldTransfer,
  Tld
} from "../generated/schema"

import { BigInt, log, Address } from "@graphprotocol/graph-ts";

export function handleResolverSet(event: ResolverSetEvent): void {
  let namehash = event.params._nftNamehash.toHexString();
  let sldEntity = Sld.load(namehash);

  if (!sldEntity) {
    sldEntity = new Sld(namehash);
    sldEntity.tokenId = BigInt.fromUnsignedBytes(event.params._nftNamehash);
    
    // Default values for mandatory fields
    sldEntity.label = ""; 
    sldEntity.fullName = "";
    
    // Create a default Account for owner and registrant
    let defaultAccount = new Account(Address.zero().toHexString());
    defaultAccount.save();
    sldEntity.owner = defaultAccount.id;
    sldEntity.registrant = defaultAccount.id;
    
    sldEntity.registrationBlockNumber = event.block.number;
    sldEntity.lastUpdateBlockNumber = event.block.number;
    sldEntity.expirationTimestamp = event.block.timestamp.plus(BigInt.fromI32(31536000));
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
  resolverObj.address = event.params._resolver.toHexString();
  resolverObj.version = sldEntity.resolverVersion;
  resolverObj.save();

  // Update SLD entity with new resolver
  sldEntity.resolver = resolverId;
  sldEntity.lastUpdateBlockNumber = event.block.number;
  sldEntity.lastUpdateTimestamp = event.block.timestamp;
  sldEntity.lastUpdateTransactionHash = event.transaction.hash;
  sldEntity.save();
}

export function handleRoyaltyPayoutAddressSet(event: RoyaltyPayoutAddressSetEvent): void {
  let tldId = event.params._nftNamehash.toHexString();
  let tldEntity = Tld.load(tldId);
  if (tldEntity && tldEntity.royalty) {
    let royaltyEntity = Royalty.load(tldEntity.id);
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
  else {

    if(tldEntity && tldEntity.royalty == null){
      let royaltyEntity = new Royalty(tldEntity.id);
      royaltyEntity.payoutAddress = event.params._payoutAddress.toHex();
      royaltyEntity.percentage = BigInt.fromI32(0);
      royaltyEntity.tld = tldEntity.id;
      royaltyEntity.save();


      tldEntity.royalty = royaltyEntity.id;
      tldEntity.save();

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
  else{


    if(tldEntity && tldEntity.royalty == null){

        
        let royaltyEntity = new Royalty(tldEntity.id);

        royaltyEntity.percentage = event.params._amount;
        royaltyEntity.payoutAddress = tldEntity.owner;
        royaltyEntity.tld = tldEntity.id;
        royaltyEntity.save();
        
        tldEntity.royalty = royaltyEntity.id;
        tldEntity.save();

    }
  }
}

//TODO: update resolver delegate
export function handleTransfer(event: TransferEvent): void {
  // Convert the tokenId to its hex string representation
  let sldId = event.params.tokenId.toHexString();
  let tokenId = event.params.tokenId;


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

    let delegateId = sldId.concat("-").concat(newOwnerId);

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

