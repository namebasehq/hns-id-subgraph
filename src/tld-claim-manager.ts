import { TldClaimed as TldClaimedEvent } from "../generated/TldClaimManager/TldClaimManager";
import {
  Account,
  Resolver,
  Royalty,
  Tld,
  Address,
  ResolverHistory,
} from "../generated/schema";
import { BigInt } from "@graphprotocol/graph-ts";

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
  royaltyEntity.percentage = BigInt.fromI32(0); // Default is 0
  royaltyEntity.payoutAddress = claimantAccount.id; // Default is the owner wallet
  royaltyEntity.save();

  // Create and save the resolver entity
  let resolverId = event.params._tokenId.toHexString();
  let resolverEntity = new Resolver(resolverId);

  // All EVM coin types. Can initialise other fields here if required.
  const defaultCoinTypes = [60, 614, 9006, 966, 9001, 9000, 9005];

  for (let i = 0; i < defaultCoinTypes.length; i++) {
    let coinType = defaultCoinTypes[i];
    let addressId = resolverId.concat("-").concat(coinType.toString());
    let addressEntity = new Address(addressId);
    addressEntity.cointype = BigInt.fromI32(coinType); // Using BigInt.fromI32
    addressEntity.address = event.params._to.toHex();
    addressEntity.resolver = resolverEntity.id;
    addressEntity.save();
  }

  // default version number
  resolverEntity.version = BigInt.fromI32(0);

  resolverEntity.save();

  // Create ResolverHistory Entity
  let resolverHistoryId = resolverId
    .concat("-")
    .concat(event.block.timestamp.toString());
  let resolverHistoryEntity = new ResolverHistory(resolverHistoryId);
  resolverHistoryEntity.resolver = resolverEntity.id;
  resolverHistoryEntity.changeType = "added";
  resolverHistoryEntity.changedAt = event.block.timestamp;
  resolverHistoryEntity.save();

  // For this scenario, the claimant and owner are the same at the start.
  tldEntity.claimant = claimantAccount.id;
  tldEntity.owner = claimantAccount.id;
  tldEntity.royalty = royaltyEntity.id; // Link the royalty entity

  tldEntity.tokenId = event.params._tokenId;
  tldEntity.label = event.params._label;
  tldEntity.blockNumber = event.block.number;
  tldEntity.transactionID = event.transaction.hash;
  tldEntity.resolver = resolverId;

  tldEntity.save();
}
