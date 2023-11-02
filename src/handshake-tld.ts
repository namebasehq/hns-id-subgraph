import {
  RegistrationStrategySet as RegistrationStrategySetEvent,
  ResolverSet as ResolverSetEvent,
  Transfer as TransferEvent
} from "../generated/HandshakeTld/HandshakeTld"
import {
  Tld,
  Account,
  TldTransfer,
  Delegate
} from "../generated/schema"

import { log, BigInt } from '@graphprotocol/graph-ts'


// TODO: will need to implement this
export function handleRegistrationStrategySet(
  event: RegistrationStrategySetEvent
): void {

}

// TODO: will need to implement this
export function handleResolverSet(event: ResolverSetEvent): void {

}

export function handleTransfer(event: TransferEvent): void {
  let tldId = event.params.tokenId.toHexString();
  let tldEntity = Tld.load(tldId);

  if (!tldEntity) {
    tldEntity = new Tld(tldId);
    tldEntity.label = "";
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






