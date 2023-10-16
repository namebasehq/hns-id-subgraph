import { TldClaimed as TldClaimedEvent } from "../generated/TldClaimManager/TldClaimManager";
import {
  Account,
  Resolver,
  Royalty,
  Tld,
  Address,
  ResolverHistory,
} from "../generated/schema";
import { BigInt, log } from "@graphprotocol/graph-ts";

export function handleTldClaimed(event: TldClaimedEvent): void {
  let tldId = event.params._tokenId.toHexString();
  let tldEntity = Tld.load(tldId);
  
  if (!tldEntity) {
    log.info('Creating new TLD entity for ID: {}', [tldId]);
    tldEntity = new Tld(tldId);
    // Initialize other properties of tldEntity
    tldEntity.label = "";  // Example initialization
    tldEntity.tokenId = event.params._tokenId;
    tldEntity.blockNumber = event.block.number;
    tldEntity.blockTimestamp = event.block.timestamp;
    tldEntity.transactionHash = event.transaction.hash;
    // Add other initializations here
  } else {
    log.info('TLD entity found for ID: {}', [tldId]);
  }

  // Ensure the claimant account entity exists
  let claimantAccountId = event.params._to.toHex();
  let claimantAccount = Account.load(claimantAccountId);
  if (!claimantAccount) {
    log.info('Creating new claimant account: {}', [claimantAccountId]);
    claimantAccount = new Account(claimantAccountId);
    claimantAccount.save();
  } else {
    log.info('Claimant account already exists: {}', [claimantAccountId]);
  }

  // Create and save the resolver entity
  let resolverId = event.params._tokenId.toHexString();
  let resolverEntity = new Resolver(resolverId);
  resolverEntity.version = BigInt.fromI32(0);  // Initialize with default version number
  resolverEntity.save();

  // Initialize addresses for all EVM coin types
  const defaultCoinTypes = [60, 614, 9006, 966, 9001, 9000, 9005];
  for (let i = 0; i < defaultCoinTypes.length; i++) {
    let coinType = defaultCoinTypes[i];
    let addressId = resolverId.concat("-").concat(coinType.toString());
    let addressEntity = new Address(addressId);
    addressEntity.cointype = BigInt.fromI32(coinType);
    addressEntity.address = event.params._to.toHex();
    addressEntity.resolver = resolverEntity.id;
    addressEntity.save();
  }

  // Create ResolverHistory Entity
  let resolverHistoryId = resolverId.concat("-").concat(event.block.timestamp.toString());
  let resolverHistoryEntity = new ResolverHistory(resolverHistoryId);
  resolverHistoryEntity.resolver = resolverEntity.id;
  resolverHistoryEntity.changeType = "added";
  resolverHistoryEntity.changedAt = event.block.timestamp;
  resolverHistoryEntity.save();

  // Set claimant and owner fields
  tldEntity.claimant = claimantAccount.id;
  tldEntity.owner = claimantAccount.id;

  // Set other non-nullable fields
  tldEntity.tokenId = event.params._tokenId;
  tldEntity.label = event.params._label;
  tldEntity.blockNumber = event.block.number;
  tldEntity.blockTimestamp = event.block.timestamp;
  tldEntity.transactionHash = event.transaction.hash;
  tldEntity.resolver = resolverId;

  tldEntity.save();

  log.info('Saved TLD entity: {}', [tldId]);
}

