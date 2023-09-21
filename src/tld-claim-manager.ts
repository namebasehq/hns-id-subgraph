import {
  TldClaimed as TldClaimedEvent
} from "../generated/TldClaimManager/TldClaimManager";
import {
  Account,
  Royalty,
  Tld
} from "../generated/schema";
import { log, BigInt } from '@graphprotocol/graph-ts';


export function handleTldClaimed(event: TldClaimedEvent): void {
  let tldEntity = new Tld(event.params._tokenId.toHexString());

  // Ensure the claimant account entity exists
  let claimantAccount = Account.load(event.params._to.toHex());
  if (!claimantAccount) {
    claimantAccount = new Account(event.params._to.toHex());
    claimantAccount.save();
  }

  // Create and save the royalty entity
  let royaltyId = event.params._tokenId.toHexString();
  let royaltyEntity = new Royalty(royaltyId);
  royaltyEntity.id = royaltyId; // Set the ID for the royalty entity
  royaltyEntity.percentage = BigInt.fromI32(10); // Default is 0
  royaltyEntity.payoutAddress = claimantAccount.id; // Default is the owner wallet
  royaltyEntity.save();

  // For this scenario, the claimant and owner are the same at the start.
  tldEntity.claimant = claimantAccount.id;
  tldEntity.owner = claimantAccount.id;
  tldEntity.royalty = royaltyEntity.id; // Link the royalty entity

  tldEntity.tokenId = event.params._tokenId;
  tldEntity.label = event.params._label;
  tldEntity.blockNumber = event.block.number;
  tldEntity.transactionID = event.transaction.hash;
  
  tldEntity.save();
}

