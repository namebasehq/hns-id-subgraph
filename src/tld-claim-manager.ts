import { TldClaimed as TldClaimedEvent } from "../generated/TldClaimManager/TldClaimManager";
import { Account, Resolver, ResolverHistory, Tld } from "../generated/schema";
import { BigInt, log, Bytes } from "@graphprotocol/graph-ts";
import { createOrUpdateResolver, padHex, toAddress, toPaddedHexStringFromBigint } from "./utils";
import { DefaultResolver } from "../generated/DefaultResolver/DefaultResolver";
import { createTLDEvent } from "./entity-helpers";



export function handleTldClaimed(event: TldClaimedEvent): void {
  let tldId = toPaddedHexStringFromBigint(event.params._tokenId)
  let tldEntity = Tld.load(tldId);

  if (!tldEntity) {

    tldEntity = new Tld(tldId);
    
    tldEntity.tokenId = event.params._tokenId;
    tldEntity.transferCount = BigInt.fromI32(0);
    tldEntity.registrationBlockNumber = event.block.number;
    tldEntity.registrationBlockTimestamp = event.block.timestamp;
    tldEntity.registrationTransactionHash = event.transaction.hash;
    tldEntity.resolverVersion = BigInt.fromI32(0);
  }

  // Ensure the claimant account entity exists
  let claimantAccountId = toAddress(event.params._to);
  let claimantAccount = Account.load(claimantAccountId);
  if (!claimantAccount) {
    claimantAccount = new Account(claimantAccountId);
    claimantAccount.WhnsBalance = BigInt.fromI32(0);
    claimantAccount.save();
  }


  let resolverId = tldId
  .concat("-0");
  
  let resolverHistoryId = resolverId
    .concat("-")
    .concat(event.block.timestamp.toString());
  // createOrUpdateResolver(resolverId, account.id, domain.tokenId, event.block.timestamp, "");

  // Create ResolverHistory Entity
  let resolverHistoryEntity = new ResolverHistory(resolverHistoryId);
  resolverHistoryEntity.resolver = resolverId;
  resolverHistoryEntity.changeType = "added";
  resolverHistoryEntity.changedAt = event.block.timestamp;
  resolverHistoryEntity.save();

  // Set claimant and owner fields
  tldEntity.claimant = claimantAccount.id;
  tldEntity.owner = claimantAccount.id;

  // Set other non-nullable fields
  tldEntity.label = event.params._label;
  tldEntity.lastUpdateBlockNumber = event.block.number;
  tldEntity.lastUpdateTimestamp = event.block.timestamp;
  tldEntity.lastUpdateTransactionHash = event.transaction.hash;

  tldEntity.save();

  createTLDEvent(tldEntity.tokenId, event.transaction.hash, event.block.timestamp);

  log.info("Saved TLD entity: {} - {}", [tldId.toString(), event.params._label]);
}