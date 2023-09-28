import {
  RegistrationStrategySet as RegistrationStrategySetEvent,
  ResolverSet as ResolverSetEvent,
  Transfer as TransferEvent
} from "../generated/HandshakeTld/HandshakeTld"
import {
  Tld,
  Account,
  Delegate,
  Resolver
} from "../generated/schema"

import { log } from '@graphprotocol/graph-ts'


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

  if (tldEntity) {
    // Ensure the recipient account entity exists
    let recipientAccountId = event.params.to.toHex();
    let recipientAccount = Account.load(recipientAccountId);
    if (!recipientAccount) {
      recipientAccount = new Account(recipientAccountId);
      recipientAccount.save();
    }

    // Update the owner field of the Tld entity
    tldEntity.owner = recipientAccountId;

    // Save the updated Tld entity
    tldEntity.save();

    // Generate a unique ID for the Delegate entity by combining the _tokenId and _to
    let delegateId = tldId.concat("-").concat(recipientAccountId);

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




