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

import { BigInt, Bytes, store as GraphStore, log } from "@graphprotocol/graph-ts";
import { createOrUpdateResolver, getResolverId, toAddress, toPaddedHexString, toPaddedHexStringFromBigint } from "./utils";
import { extractTTL, decodeName, parseRecordData, decodeDNSName, decodeDNSData, getResourceType } from './dns-utils';
import { createAddressRecordEvent, createDNSRecordEvent, createSLDEvent, createTextRecordEvent, createTLDEvent } from "./entity-helpers";

export function handleAddrChanged(event: AddrChangedEvent): void {}

export function handleAddressChanged(event: AddressChangedEvent): void {
  let resolverId = getResolverId(toPaddedHexString(event.params.node));

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
    addressEntity.createdAt = event.block.timestamp;
  }

  // Update fields on the Address entity
  addressEntity.address = toAddress(event.params.newAddress);
  addressEntity.cointype = event.params.coinType;
  addressEntity.resolver = resolverEntity.id;
  addressEntity.tokenId = BigInt.fromUnsignedBytes(event.params.node);
  addressEntity.updatedAt = event.block.timestamp;

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

  createAddressRecordEvent(BigInt.fromUnsignedBytes(event.params.node), event.transaction.hash, event.block.timestamp);
}

export function handleContenthashChanged(event: ContenthashChangedEvent): void {
  // Generate a unique ID for the Resolver entity
  let resolverId = getResolverId(toPaddedHexString(event.params.node));

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

  createDNSRecordEvent(BigInt.fromUnsignedBytes(event.params.node), event.transaction.hash, event.block.timestamp);
}

export function handleDNSRecordChanged(event: DNSRecordChangedEvent): void {
  let resolverId = getResolverId(toPaddedHexString(event.params.node));
  // Generate a unique ID for the DnsRecord entity
  let dnsRecordId = resolverId
    .concat("-")
    .concat(event.params.resource.toString());

  // Try loading the DnsRecord entity, or create a new one if it doesn't exist
  let dnsRecordEntity = DnsRecord.load(dnsRecordId);
  if (dnsRecordEntity == null) {
    dnsRecordEntity = new DnsRecord(dnsRecordId);
    dnsRecordEntity.createdAt = event.block.timestamp;
  }

   

    // Update fields on the DnsRecord entity
    dnsRecordEntity.node = event.params.node;
    dnsRecordEntity.name = decodeName(event.params.name); // Decoding the name bytes to a human-readable string
    dnsRecordEntity.nameString = decodeDNSName(event.params.name); // Decoding the name bytes to a human-readable string
    dnsRecordEntity.resource = BigInt.fromI32(event.params.resource);
    dnsRecordEntity.type = getResourceType(dnsRecordEntity.resource); // Mapping resource to type (e.g., A, CNAME)
    dnsRecordEntity.record = event.params.record;
    dnsRecordEntity.data = decodeDNSData(parseRecordData(event.params.record)); // Parse record data into a usable format
    dnsRecordEntity.ttl = extractTTL(event.params.record); // Extract TTL from the record
    dnsRecordEntity.tokenId = BigInt.fromUnsignedBytes(event.params.node);
    dnsRecordEntity.updatedAt = event.block.timestamp;

  // Load or create the parent Resolver entity
  let resolverEntity = Resolver.load(resolverId);
  if (!resolverEntity) {
    resolverEntity = new Resolver(resolverId);
    resolverEntity.tokenId = BigInt.fromUnsignedBytes(event.params.node);
    resolverEntity.version = BigInt.fromI32(0); // Initialize with default version number

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

  createDNSRecordEvent(BigInt.fromUnsignedBytes(event.params.node), event.transaction.hash, event.block.timestamp);
}

export function handleDNSRecordDeleted(event: DNSRecordDeletedEvent): void {
  let resolverId = getResolverId(toPaddedHexString(event.params.node));
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

  createDNSRecordEvent(BigInt.fromUnsignedBytes(event.params.node), event.transaction.hash, event.block.timestamp);
}

export function handleDNSZonehashChanged(event: DNSZonehashChangedEvent): void {
  // Generate a unique ID for the Resolver entity
  let resolverId = getResolverId(toPaddedHexString(event.params.node));

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
  let resolverId = getResolverId(toPaddedHexString(event.params.node));
  // Generate a unique ID for the TextRecord entity
  let textRecordId = resolverId.concat("-").concat(event.params.key.toString());

  // Flag to indicate if the TextRecord is newly created
  let isNewTextRecord = false;

  // Try loading the TextRecord entity, or create a new one if it doesn't exist
  let textRecordEntity = TextRecord.load(textRecordId);
  if (textRecordEntity == null) {
    textRecordEntity = new TextRecord(textRecordId);
    isNewTextRecord = true; // Set the flag
    textRecordEntity.createdAt = event.block.timestamp;
  }

  textRecordEntity.updatedAt = event.block.timestamp;
  // Update fields on the TextRecord entity
  textRecordEntity.textKey = event.params.key.toString();
  textRecordEntity.textValue = event.params.value.toString();

  // Load or create the parent Resolver entity
  let resolverEntity = Resolver.load(resolverId);
  if (resolverEntity == null) {
    resolverEntity = new Resolver(resolverId);
    resolverEntity.tokenId = BigInt.fromUnsignedBytes(event.params.node);
    resolverEntity.save();
  }

  // Set the parent Resolver of this TextRecord
  textRecordEntity.resolver = resolverEntity.id;
  textRecordEntity.tokenId = BigInt.fromUnsignedBytes(event.params.node);

  // Save the updated TextRecord entity
  textRecordEntity.save();

  // Create TextRecordHistory Entity
  let textRecordHistoryId = textRecordEntity.id
    .concat("-")
    .concat(event.block.timestamp.toString());
  let textRecordHistoryEntity = new TextRecordHistory(textRecordHistoryId);
  textRecordHistoryEntity.resolver = resolverEntity.id;
  textRecordHistoryEntity.key = textRecordEntity.textKey;
  textRecordHistoryEntity.value = textRecordEntity.textValue;
  textRecordHistoryEntity.changedAt = event.block.timestamp;

  // Determine changeType based on the isNewTextRecord flag and value
  if (isNewTextRecord) {
    textRecordHistoryEntity.changeType = "Created";
  } else if (textRecordEntity.textValue == "") {
    textRecordHistoryEntity.changeType = "Deleted";
  } else {
    textRecordHistoryEntity.changeType = "Updated";
  }

  textRecordHistoryEntity.save();

  createTextRecordEvent(BigInt.fromUnsignedBytes(event.params.node), event.transaction.hash, event.block.timestamp);
}

export function handleUpdatedDelegate(event: UpdatedDelegateEvent): void {
  let tokenId = toPaddedHexStringFromBigint(event.params._tokenId);
  // Generate a unique ID for the Delegate entity by combining the _tokenId and _owner
  let delegateId = tokenId.concat("-").concat(toAddress(event.params._owner));

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

  addNftEvent(event.params._tokenId, event.transaction.hash, event.block.timestamp);
}

export function handleVersionChanged(event: VersionChangedEvent): void {
  let sld = Sld.load(toPaddedHexString(event.params.node));
  let tld = Tld.load(toPaddedHexString(event.params.node));

  let owner: string|null = null;

  let oldResolverId = getResolverId(toPaddedHexString(event.params.node));

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

  if(!owner){
    throw new Error("Owner not found for tokenId: " + event.params.node.toHexString());
  }

  if(owner){
  // Load or create the parent Resolver entity
  let resolverId = getResolverId(toPaddedHexString(event.params.node));
  createOrUpdateResolver(resolverId, owner, BigInt.fromUnsignedBytes(event.params.node), event.block.timestamp, toAddress(event.address));
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

  addNftEvent(BigInt.fromUnsignedBytes(event.params.node), event.transaction.hash, event.block.timestamp);
}
}


export function addNftEvent(tokenId: BigInt, txHash: Bytes, eventTimestamp: BigInt): void {
  let tokenIdHex = toPaddedHexStringFromBigint(tokenId);

  // Try loading both SLD and TLD entities using the tokenId
  let sld = Sld.load(tokenIdHex);
  let tld = Tld.load(tokenIdHex);

  // If SLD exists, update it
  if (sld) {
    
    createSLDEvent(tokenId, txHash, eventTimestamp);
  } 
  // If TLD exists, update it
  else if (tld) {
    createTLDEvent(tokenId, txHash, eventTimestamp);
  } 
  // If neither SLD nor TLD exists, log a warning
  else {
    log.warning("No SLD or TLD found for tokenId: {}", [tokenIdHex]);
  }
}



