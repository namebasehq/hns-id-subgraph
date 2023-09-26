import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  RegistrationStrategySet as RegistrationStrategySetEvent,
  ResolverSet as ResolverSetEvent,
  Transfer as TransferEvent
} from "../generated/HandshakeTld/HandshakeTld"
import {
  Approval,
  ApprovalForAll,
  OwnershipTransferred,
  RegistrationStrategySet,
  ResolverSet,
  Transfer,
  Tld,
  Account,
  Delegate,
  Resolver
} from "../generated/schema"

import { log } from '@graphprotocol/graph-ts'



export function handleRegistrationStrategySet(
  event: RegistrationStrategySetEvent
): void {
  // let entity = new RegistrationStrategySet(
  //   event.transaction.hash.concatI32(event.logIndex.toI32())
  // )
  // entity.namehash = event.params.namehash
  // entity.strategy = event.params.strategy

  // entity.blockNumber = event.block.number
  // entity.blockTimestamp = event.block.timestamp
  // entity.transactionHash = event.transaction.hash

  // entity.save()
}

export function handleResolverSet(event: ResolverSetEvent): void {
  // let entity = new ResolverSet(
  //   event.transaction.hash.concatI32(event.logIndex.toI32())
  // )
  // entity._nftNamehash = event.params._nftNamehash
  // entity._resolver = event.params._resolver

  // entity.blockNumber = event.block.number
  // entity.blockTimestamp = event.block.timestamp
  // entity.transactionHash = event.transaction.hash

  // entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let tldId = event.params.tokenId.toHexString();
  let tldEntity = Tld.load(tldId);

  if (tldEntity) {
    // Ensure the recipient account entity exists
    let recipientAccount = Account.load(event.params.to.toHex());
    if (!recipientAccount) {
      recipientAccount = new Account(event.params.to.toHex());
      recipientAccount.save();
    }

    // Update the owner field of the Tld entity
    tldEntity.owner = recipientAccount.id;

    // Save the updated Tld entity
    tldEntity.save();

    // Generate a unique ID for the Delegate entity by combining the _tokenId and _to
    let delegateId = tldId.concat("-").concat(event.params.to.toHex());

    // Try loading the Delegate entity, or create a new one if it doesn't exist
    let delegateEntity = Delegate.load(delegateId);
    if (delegateEntity == null) {
      delegateEntity = new Delegate(delegateId);
    }

    // Update the delegate field on the Delegate entity
    delegateEntity.delegate = event.params.to;

    // Save the updated Delegate entity
    delegateEntity.save();

    // Update the delegate reference on the related Resolver entity
    let resolverEntity = Resolver.load(tldId);
    if (resolverEntity) {
      resolverEntity.delegate = delegateEntity.id;
      resolverEntity.save();
    }

  } else {
    log.warning('No TLD entity found for ID: {}', [tldId]);
  }
}



