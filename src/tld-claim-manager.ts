import { TldClaimed as TldClaimedEvent } from "../generated/TldClaimManager/TldClaimManager";
import { Account, Resolver, ResolverHistory, Tld } from "../generated/schema";
import { BigInt, log } from "@graphprotocol/graph-ts";
import { createOrUpdateResolver } from "./utils";
import { DefaultResolver } from "../generated/DefaultResolver/DefaultResolver";

export function handleTldClaimed(event: TldClaimedEvent): void {
  let tldId = event.params._tokenId.toHexString();
  let tldEntity = Tld.load(tldId);

  if (!tldEntity) {
    log.info("Creating new TLD entity for ID: {}", [tldId]);
    tldEntity = new Tld(tldId);
    // Initialize other properties of tldEntity
    tldEntity.label = "";
    tldEntity.tokenId = event.params._tokenId;
    tldEntity.transferCount = BigInt.fromI32(0);
    tldEntity.registrationBlockNumber = event.block.number;
    tldEntity.registrationBlockTimestamp = event.block.timestamp;
    tldEntity.registrationTransactionHash = event.transaction.hash;
  }

  // Ensure the claimant account entity exists
  let claimantAccountId = event.params._to.toHex();
  let claimantAccount = Account.load(claimantAccountId);
  if (!claimantAccount) {
    log.info("Creating new claimant account: {}", [claimantAccountId]);
    claimantAccount = new Account(claimantAccountId);
    claimantAccount.save();
  }

  // Create and save the resolver entity
  let resolverId = event.params._tokenId
    .toHexString()
    .concat("-")
    .concat(tldEntity.resolverVersion.toString());
    
  createOrUpdateResolver(resolverId, claimantAccount.id);
  tldEntity.resolver = resolverId;

  let resolver = Resolver.load(resolverId);
  let resolverVersion = BigInt.fromI32(0);

  if (resolver && resolver.version) {
    resolverVersion = resolver.version;
  }

  let resolverHistoryId = resolverId
    .concat("-")
    .concat(event.block.timestamp.toString());

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
  tldEntity.tokenId = event.params._tokenId;
  tldEntity.label = event.params._label;
  tldEntity.registrationBlockNumber = event.block.number;
  tldEntity.registrationBlockTimestamp = event.block.timestamp;
  tldEntity.registrationTransactionHash = event.transaction.hash;
  tldEntity.resolver = resolverId;
  tldEntity.resolverVersion = resolverVersion;

  tldEntity.save();

  log.info("Saved TLD entity: {}", [tldId]);
}
