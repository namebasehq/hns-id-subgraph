import {
  RegistrationStrategySet as RegistrationStrategySetEvent,
  ResolverSet as ResolverSetEvent,
  Transfer as TransferEvent
} from "../generated/HandshakeTld/HandshakeTld"
import {
  Tld,
  Account,
  TldTransfer,
  Delegate,
  Resolver
} from "../generated/schema"

import { log, BigInt, Address, Bytes } from '@graphprotocol/graph-ts'

import { padHex } from './utils'

// TODO: will need to implement this
export function handleRegistrationStrategySet(
  event: RegistrationStrategySetEvent
): void {

}

function bytesToUint(bytes: Bytes): BigInt {
  // Initialize BigInt from zero
  let result = BigInt.fromI32(0);

  // Iterate through the bytes
  for (let i = 0; i < bytes.length; i++) {
    // Shift result by 8 bits (1 byte) and add the byte value
    result = result.leftShift(8).plus(BigInt.fromI32(bytes[i] as i32));
  }

  return result;
}

export function handleResolverSet(event: ResolverSetEvent): void {
  let tldId = event.params._nftNamehash.toHexString();
  let tldEntity = Tld.load(tldId);

  if (!tldEntity) {
    tldEntity = new Tld(tldId);
    tldEntity.tokenId = bytesToUint(event.params._nftNamehash);
    
    // Default values for mandatory fields
    tldEntity.label = ""; 
    
    // Create a default Account for owner
    let defaultAccount = new Account(Address.zero().toHexString());
    defaultAccount.save();
    tldEntity.owner = defaultAccount.id;
    
    tldEntity.registrationBlockNumber = event.block.number;
    tldEntity.lastUpdateBlockNumber = event.block.number;
    tldEntity.transferCount = BigInt.fromI32(0);
    tldEntity.resolverVersion = BigInt.fromI32(0);
    
    // Optional fields
    tldEntity.registrationBlockTimestamp = event.block.timestamp;
    tldEntity.registrationTransactionHash = event.transaction.hash;
    tldEntity.lastUpdateTimestamp = event.block.timestamp;
    tldEntity.lastUpdateTransactionHash = event.transaction.hash;
    tldEntity.claimant = defaultAccount.id; // Set claimant to the same default account
  }
  
  
  // Create new resolver ID
  let resolverId = tldId + "-" + tldEntity.resolverVersion.toString();
  
  let resolverObj = new Resolver(resolverId);
  resolverObj.tokenId = bytesToUint(event.params._nftNamehash);
  resolverObj.address = event.params._resolver.toHexString();
  resolverObj.version = tldEntity.resolverVersion;
  resolverObj.save();

  // Update TLD entity with new resolver
  tldEntity.resolver = resolverId;
  tldEntity.tokenId = bytesToUint(event.params._nftNamehash);
  tldEntity.lastUpdateBlockNumber = event.block.number;
  tldEntity.lastUpdateTimestamp = event.block.timestamp;
  tldEntity.lastUpdateTransactionHash = event.transaction.hash;
  tldEntity.save();

}


export function handleTransfer(event: TransferEvent): void {
  let tldId = padHex(event.params.tokenId.toHexString(), 32);
  let tldEntity = Tld.load(tldId);

  if (!tldEntity) {
    tldEntity = new Tld(tldId);
    tldEntity.label = "new";
    tldEntity.tokenId = event.params.tokenId;
    tldEntity.lastUpdateBlockNumber = event.block.number;
    tldEntity.lastUpdateTimestamp = event.block.timestamp;
    tldEntity.lastUpdateTransactionHash = event.transaction.hash;
    tldEntity.registrationBlockNumber = event.block.number;
    tldEntity.registrationBlockTimestamp = event.block.timestamp;
    tldEntity.registrationTransactionHash = event.transaction.hash;
    tldEntity.transferCount = BigInt.fromI32(0);
    tldEntity.resolverVersion = BigInt.fromI32(0);
  }

  // Create or load the Account entity for the new owner (Recipient)
  let recipientAccountId = event.params.to.toHex();
  let recipientAccount = Account.load(recipientAccountId);
  if (!recipientAccount) {
    recipientAccount = new Account(recipientAccountId);
    recipientAccount.save();
  }

  // Create or load the Account entity for the old owner (Sender)
  let senderAccountId = event.params.from.toHex();
  let senderAccount = Account.load(senderAccountId);
  if (!senderAccount) {
    senderAccount = new Account(senderAccountId);
    senderAccount.save();
  }

  let delegateId = tldId.concat("-").concat(recipientAccountId);

  // Try loading the Delegate entity, or create a new one if it doesn't exist
  let delegateEntity = Delegate.load(delegateId);
  if (delegateEntity == null) {
    delegateEntity = new Delegate(delegateId);
  }

  // Increment the transferCount of the Tld entity
  tldEntity.transferCount = tldEntity.transferCount.plus(BigInt.fromI32(1));

  // Create a new TldTransfer entity
  let transferEventId = tldEntity.id + "-" + tldEntity.transferCount.toString();
  let transferEvent = new TldTransfer(transferEventId);

  // Populate TldTransfer fields
  transferEvent.tld = tldEntity.id;
  transferEvent.oldOwner = senderAccount.id;
  transferEvent.newOwner = recipientAccount.id;
  transferEvent.blockNumber = event.block.number;
  transferEvent.blockTimestamp = event.block.timestamp;
  transferEvent.transactionHash = event.transaction.hash;

  // Save TldTransfer entity
  transferEvent.save();

  // Update the owner field of the Tld entity
  tldEntity.owner = recipientAccountId;
  tldEntity.lastUpdateBlockNumber = event.block.number;
  tldEntity.lastUpdateTimestamp = event.block.timestamp;
  tldEntity.lastUpdateTransactionHash = event.transaction.hash;
  tldEntity.delegate = delegateEntity.id;

  // Save updated Tld entity
  tldEntity.save();
}






