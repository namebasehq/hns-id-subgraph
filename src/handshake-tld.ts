import {
  RegistrationStrategySet as RegistrationStrategySetEvent,
  ResolverSet as ResolverSetEvent,
  Transfer as TransferEvent
} from "../generated/HandshakeTld/HandshakeTld"
import {
  Tld,
  Account,
  Delegate,
  Resolver,
  Royalty
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
  log.info('Processing TLD ID: {}', [tldId]);
  let tldEntity = Tld.load(tldId);

  if (!tldEntity) {
    log.info('Creating new TLD entity for ID: {}', [tldId]);
    tldEntity = new Tld(tldId);
    tldEntity.label = "";
    tldEntity.tokenId = event.params.tokenId;
    tldEntity.blockNumber = event.block.number;
    tldEntity.blockTimestamp = event.block.timestamp;
    // Initialize other fields here if needed
  } else {
    log.info('TLD entity found for ID: {}', [tldId]);
  }

    log.info('TLD entity found for ID: {}', [tldId]);

    // Ensure the recipient account entity exists
    let recipientAccountId = event.params.to.toHex();
    let recipientAccount = Account.load(recipientAccountId);
    if (!recipientAccount) {
      recipientAccount = new Account(recipientAccountId);
      recipientAccount.save();
      log.info('Created new recipient account: {}', [recipientAccountId]);
    } else {
      log.info('Recipient account already exists: {}', [recipientAccountId]);
    }

    // Update the owner field of the Tld entity
    tldEntity.owner = recipientAccountId;
    tldEntity.save();
    log.info('Updated TLD entity owner to: {}', [recipientAccountId]);

    // Generate unique IDs for the existing and new royalty entities
    let previousOwner = event.params.from.toHex();
    let existingRoyaltyId = tldId.concat("-").concat(previousOwner);
    let newRoyaltyId = tldId.concat("-").concat(recipientAccountId);

    log.info('Generated new and existing royalty IDs: {}, {}', [newRoyaltyId, existingRoyaltyId]);

    // Load the existing royalty entity
    let existingRoyaltyEntity = Royalty.load(existingRoyaltyId);
    if (existingRoyaltyEntity) {
      log.info('Existing royalty entity found: {}', [existingRoyaltyId]);

      // Create a new Royalty entity for the new owner
      let newRoyaltyEntity = new Royalty(newRoyaltyId);
      newRoyaltyEntity.payoutAddress = recipientAccountId;

      // Transfer the payout address and percentage to the new owner
      newRoyaltyEntity.payoutAddress = existingRoyaltyEntity.payoutAddress;
      newRoyaltyEntity.percentage = existingRoyaltyEntity.percentage;

      newRoyaltyEntity.save();
      log.info('Created new royalty entity with transferred data: {}', [newRoyaltyId]);
    } else {
      log.warning('No existing royalty entity found: {}', [existingRoyaltyId]);
      // Create a new Royalty entity with the payoutAddress same as the new owner
      let newRoyaltyEntity = new Royalty(newRoyaltyId);

      newRoyaltyEntity.payoutAddress = recipientAccountId;
      newRoyaltyEntity.percentage = BigInt.fromI32(0);
      newRoyaltyEntity.save();
      log.info('Created new royalty entity with default data: {}', [newRoyaltyId]);
    }

    tldEntity.royalty = newRoyaltyId;
    tldEntity.save();
    log.info('Updated TLD entity royalty ID to: {}', [newRoyaltyId]);
}






