import {
  AddrChanged as AddrChangedEvent,
  AddressChanged as AddressChangedEvent,
  ContenthashChanged as ContenthashChangedEvent,
  DNSRecordChanged as DNSRecordChangedEvent,
  DNSRecordDeleted as DNSRecordDeletedEvent,
  DNSZonehashChanged as DNSZonehashChangedEvent,
  NameChanged as NameChangedEvent,
  ReverseClaimed as ReverseClaimedEvent,
  TextChanged as TextChangedEvent,
  UpdatedDelegate as UpdatedDelegateEvent,
  VersionChanged as VersionChangedEvent,
} from "../generated/DefaultResolver/DefaultResolver";
import {
  Address,
  DnsRecord,
  Resolver,
  TextRecord,
  Delegate,
  ResolverHistory,
  DnsRecordHistory,
  TextRecordHistory,
  Sld,
  Tld,
} from "../generated/schema";

import { BigInt, Bytes, store as GraphStore } from "@graphprotocol/graph-ts";
import { createOrUpdateResolver, getResolverId } from "./utils";

export function handleAddrChanged(event: AddrChangedEvent): void {}

export function handleAddressChanged(event: AddressChangedEvent): void {
  let resolverId = getResolverId(event.params.node.toHex());

  // Load or create the parent Resolver entity
  let resolverEntity = Resolver.load(resolverId);
  if (!resolverEntity) {
    resolverEntity = new Resolver(resolverId);
    resolverEntity.version = BigInt.fromI32(0); // Initialize with default version number
    resolverEntity.save();
  }

  // Generate a unique ID for the Address entity
  let addressId = resolverId
    .concat("-")
    .concat(event.params.coinType.toString());

  // Try loading the Address entity, or create a new one if it doesn't exist
  let addressEntity = Address.load(addressId);
  if (addressEntity == null) {
    addressEntity = new Address(addressId);
  }

  // Update fields on the Address entity
  addressEntity.address = event.params.newAddress.toHex();
  addressEntity.cointype = event.params.coinType;
  addressEntity.resolver = resolverEntity.id;

  // Save the updated Address entity
  addressEntity.save();

  // Create ResolverHistory Entity
  let resolverHistoryId = resolverEntity.id
    .concat("-")
    .concat(event.block.timestamp.toString());
  let resolverHistoryEntity = new ResolverHistory(resolverHistoryId);
  resolverHistoryEntity.resolver = resolverEntity.id;
  resolverHistoryEntity.changeType = "addressChanged";
  resolverHistoryEntity.changedAt = event.block.timestamp;
  resolverHistoryEntity.save();
}

export function handleContenthashChanged(event: ContenthashChangedEvent): void {
  // Generate a unique ID for the Resolver entity
  let resolverId = getResolverId(event.params.node.toHex());

  // Try loading the Resolver entity, or create a new one if it doesn't exist
  // (it should always exist though)
  let resolverEntity = Resolver.load(resolverId);
  if (!resolverEntity) {
    resolverEntity = new Resolver(resolverId);
    resolverEntity.version = BigInt.fromI32(0); // Initialize with default version number
    resolverEntity.save();
  }

  // Update the content hash on the Resolver entity
  resolverEntity.contenthash = event.params.hash;
  resolverEntity.save();

  // Create ResolverHistory Entity
  let resolverHistoryId = resolverEntity.id
    .concat("-")
    .concat(event.block.timestamp.toString());
  let resolverHistoryEntity = new ResolverHistory(resolverHistoryId);
  resolverHistoryEntity.resolver = resolverEntity.id;
  resolverHistoryEntity.changeType = "contenthashChanged";
  resolverHistoryEntity.changedAt = event.block.timestamp;
  resolverHistoryEntity.save();
}

export function handleDNSRecordChanged(event: DNSRecordChangedEvent): void {
  let resolverId = getResolverId(event.params.node.toHex());
  // Generate a unique ID for the DnsRecord entity
  let dnsRecordId = resolverId
    .concat("-")
    .concat(event.params.resource.toString());

  // Try loading the DnsRecord entity, or create a new one if it doesn't exist
  let dnsRecordEntity = DnsRecord.load(dnsRecordId);
  if (dnsRecordEntity == null) {
    dnsRecordEntity = new DnsRecord(dnsRecordId);
  }

  // Update fields on the DnsRecord entity
  dnsRecordEntity.node = event.params.node;
  dnsRecordEntity.name = event.params.name;
  dnsRecordEntity.resource = BigInt.fromI32(event.params.resource);
  dnsRecordEntity.record = event.params.record;

  // Load or create the parent Resolver entity
  let resolverEntity = Resolver.load(resolverId);
  if (!resolverEntity) {
    resolverEntity = new Resolver(resolverId);
    resolverEntity.save();
  }

  // Set the parent Resolver of this DnsRecord
  dnsRecordEntity.resolver = resolverEntity.id;

  // Save the updated DnsRecord entity
  dnsRecordEntity.save();

  // Create ResolverHistory Entity
  let resolverHistoryId = resolverEntity.id
    .concat("-")
    .concat(event.block.timestamp.toString());
  let resolverHistoryEntity = new ResolverHistory(resolverHistoryId);
  resolverHistoryEntity.resolver = resolverEntity.id;
  resolverHistoryEntity.changeType = "dnsRecordChanged";
  resolverHistoryEntity.changedAt = event.block.timestamp;
  resolverHistoryEntity.save();

  // Create DnsRecordHistory Entity
  let dnsRecordHistoryId = dnsRecordEntity.id
    .concat("-")
    .concat(event.block.timestamp.toString());
  let dnsRecordHistoryEntity = new DnsRecordHistory(dnsRecordHistoryId);
  dnsRecordHistoryEntity.resolver = resolverEntity.id;
  dnsRecordHistoryEntity.node = dnsRecordEntity.node;
  dnsRecordHistoryEntity.name = dnsRecordEntity.name;
  dnsRecordHistoryEntity.resource = dnsRecordEntity.resource;
  dnsRecordHistoryEntity.record = dnsRecordEntity.record;
  dnsRecordHistoryEntity.changedAt = event.block.timestamp;
  dnsRecordHistoryEntity.changeType = "Updated"; // Or 'Created' if it's a new entity
  dnsRecordHistoryEntity.save();
}

export function handleDNSRecordDeleted(event: DNSRecordDeletedEvent): void {
  let resolverId = getResolverId(event.params.node.toHex());
  // Generate the ID based on the node and resource
  let dnsRecordId = resolverId
    .concat("-")
    .concat(event.params.resource.toString());

  // Load the DnsRecord entity
  let dnsRecordEntity = DnsRecord.load(dnsRecordId);

  // Load or create the parent Resolver entity
  let resolverEntity = Resolver.load(resolverId);
  if (!resolverEntity) {
    resolverEntity = new Resolver(resolverId);
    resolverEntity.save();
  }

  if (dnsRecordEntity != null) {
    // Create DnsRecordHistory Entity
    let dnsRecordHistoryId = dnsRecordEntity.id
      .concat("-")
      .concat(event.block.timestamp.toString());
    let dnsRecordHistoryEntity = new DnsRecordHistory(dnsRecordHistoryId);
    dnsRecordHistoryEntity.resolver = resolverEntity.id;
    dnsRecordHistoryEntity.node = dnsRecordEntity.node;
    dnsRecordHistoryEntity.name = dnsRecordEntity.name;
    dnsRecordHistoryEntity.resource = dnsRecordEntity.resource;
    dnsRecordHistoryEntity.record = dnsRecordEntity.record;
    dnsRecordHistoryEntity.changedAt = event.block.timestamp;
    dnsRecordHistoryEntity.changeType = "Deleted";

    dnsRecordHistoryEntity.save();

    // Remove the DnsRecord entity
    GraphStore.remove("DnsRecord", dnsRecordId);
  }

  // Create ResolverHistory Entity
  let resolverHistoryId = resolverEntity.id
    .concat("-")
    .concat(event.block.timestamp.toString());
  let resolverHistoryEntity = new ResolverHistory(resolverHistoryId);
  resolverHistoryEntity.resolver = resolverEntity.id;
  resolverHistoryEntity.changeType = "dnsRecordDeleted";
  resolverHistoryEntity.changedAt = event.block.timestamp;
  resolverHistoryEntity.save();
}

export function handleDNSZonehashChanged(event: DNSZonehashChangedEvent): void {
  // Generate a unique ID for the Resolver entity
  let resolverId = getResolverId(event.params.node.toHex());

  // Try loading the Resolver entity, or create a new one if it doesn't exist
  // (it should always exist though)
  let resolverEntity = Resolver.load(resolverId);
  if (!resolverEntity) {
    resolverEntity = new Resolver(resolverId);
    resolverEntity.save();
  }

  // Update the content hash on the Resolver entity
  resolverEntity.dnsZonehash = event.params.zonehash;
  resolverEntity.save();

  // Create ResolverHistory Entity
  let resolverHistoryId = resolverEntity.id
    .concat("-")
    .concat(event.block.timestamp.toString());
  let resolverHistoryEntity = new ResolverHistory(resolverHistoryId);
  resolverHistoryEntity.resolver = resolverEntity.id;
  resolverHistoryEntity.changeType = "dnsZonehashChanged";
  resolverHistoryEntity.changedAt = event.block.timestamp;
  resolverHistoryEntity.save();
}

export function handleNameChanged(event: NameChangedEvent): void {}

export function handleReverseClaimed(event: ReverseClaimedEvent): void {}

export function handleTextChanged(event: TextChangedEvent): void {
  let resolverId = getResolverId(event.params.node.toHex());
  // Generate a unique ID for the TextRecord entity
  let textRecordId = resolverId.concat("-").concat(event.params.key.toString());

  // Flag to indicate if the TextRecord is newly created
  let isNewTextRecord = false;

  // Try loading the TextRecord entity, or create a new one if it doesn't exist
  let textRecordEntity = TextRecord.load(textRecordId);
  if (textRecordEntity == null) {
    textRecordEntity = new TextRecord(textRecordId);
    isNewTextRecord = true; // Set the flag
  }

  // Update fields on the TextRecord entity
  textRecordEntity.key = event.params.key.toString();
  textRecordEntity.value = event.params.value.toString();

  // Load or create the parent Resolver entity
  let resolverEntity = Resolver.load(resolverId);
  if (resolverEntity == null) {
    resolverEntity = new Resolver(resolverId);
    resolverEntity.save();
  }

  // Set the parent Resolver of this TextRecord
  textRecordEntity.resolver = resolverEntity.id;

  // Save the updated TextRecord entity
  textRecordEntity.save();

  // Create TextRecordHistory Entity
  let textRecordHistoryId = textRecordEntity.id
    .concat("-")
    .concat(event.block.timestamp.toString());
  let textRecordHistoryEntity = new TextRecordHistory(textRecordHistoryId);
  textRecordHistoryEntity.resolver = resolverEntity.id;
  textRecordHistoryEntity.key = textRecordEntity.key;
  textRecordHistoryEntity.value = textRecordEntity.value;
  textRecordHistoryEntity.changedAt = event.block.timestamp;

  // Determine changeType based on the isNewTextRecord flag and value
  if (isNewTextRecord) {
    textRecordHistoryEntity.changeType = "Created";
  } else if (textRecordEntity.value == "") {
    textRecordHistoryEntity.changeType = "Deleted";
  } else {
    textRecordHistoryEntity.changeType = "Updated";
  }

  textRecordHistoryEntity.save();
}

export function handleUpdatedDelegate(event: UpdatedDelegateEvent): void {
  let tokenId = event.params._tokenId.toHexString();
  // Generate a unique ID for the Delegate entity by combining the _tokenId and _owner
  let delegateId = tokenId.concat("-").concat(event.params._owner.toHex());

  // Try loading the Delegate entity, or create a new one if it doesn't exist
  let delegateEntity = Delegate.load(delegateId);
  if (delegateEntity == null) {
    delegateEntity = new Delegate(delegateId);
  }

  // Update the delegate field on the Delegate entity
  delegateEntity.delegate = event.params._delegate;

  // Save the updated Delegate entity
  delegateEntity.save();

  let sld = Sld.load(tokenId);
  let tld = Tld.load(tokenId); 

  if (sld) {
    sld.delegate = delegateEntity.id;
    sld.save();
  }

  if (tld) {
    tld.delegate = delegateEntity.id;
    tld.save();
  }
}

export function handleVersionChanged(event: VersionChangedEvent): void {
  let sld = Sld.load(event.params.node.toHex());
  let tld = Tld.load(event.params.node.toHex());

  let owner = "";

  let oldResolverId = getResolverId(event.params.node.toHex());

  let oldResolver = Resolver.load(oldResolverId);

  if (sld) {
    sld.resolverVersion = event.params.newVersion;
    owner = sld.owner;
    sld.save();
  }

  if (tld) {
    tld.resolverVersion = event.params.newVersion;
    owner = tld.owner;
    tld.save();
  }

  // Load or create the parent Resolver entity
  let resolverId = getResolverId(event.params.node.toHex());
  createOrUpdateResolver(resolverId, owner);
  let resolverEntity = Resolver.load(resolverId);

  if (resolverEntity) {

    resolverEntity.version = event.params.newVersion;
    resolverEntity.save();
  }

  if (tld) {
    tld.resolver = resolverId;
    tld.save();
  }

  if (sld) {
    sld.resolver = resolverId;
    sld.save();
  }
}
