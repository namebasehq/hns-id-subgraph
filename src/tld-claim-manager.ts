import {
  TldClaimed as TldClaimedEvent
} from "../generated/TldClaimManager/TldClaimManager";
import {
  Account,
  Tld
} from "../generated/schema";
import { log } from '@graphprotocol/graph-ts';


export function handleTldClaimed(event: TldClaimedEvent): void {
  let tldEntity = new Tld(event.params._tokenId.toHexString());

  // Ensure the claimant account entity exists
  let claimantAccount = Account.load(event.params._to.toHex());
  if (!claimantAccount) {
    claimantAccount = new Account(event.params._to.toHex());
    claimantAccount.save();
  }

  // For this scenario, the claimant and owner are the same at the start.
  tldEntity.claimant = claimantAccount.id;
  tldEntity.owner = claimantAccount.id;

  tldEntity.tokenId = event.params._tokenId;
  tldEntity.label = event.params._label;
  tldEntity.blockNumber = event.block.number;
  tldEntity.transactionID = event.transaction.hash;
  
  tldEntity.save();
}
