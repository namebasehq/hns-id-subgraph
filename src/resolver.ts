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
  AddrChanged,
  Address,
  AddressChanged,
  ContenthashChanged,
  DNSRecordChanged,
  DNSRecordDeleted,
  DNSZonehashChanged,
  DnsRecord,
  NameChanged,
  Resolver,
  ReverseClaimed,
  TextChanged,
  TextRecord,
  Tld,
  UpdatedDelegate,
  VersionChanged,
  Delegate
} from "../generated/schema";

import { BigInt, Bytes, store as GraphStore } from "@graphprotocol/graph-ts";


export function handleAddrChanged(event: AddrChangedEvent): void {
  /*
    // Generate a unique ID for the Address entity
    let addressId = event.params.node.toHex().concat("-614");

  // Try loading the Address entity, or create a new one if it doesn't exist
  let addressEntity = Address.load(addressId);
  if (addressEntity == null) {
    addressEntity = new Address(addressId);
  }
  // Load or create the parent Resolver entity
  let resolverEntity = Resolver.load(event.params.node.toHex());
  if (!resolverEntity) {
    resolverEntity = new Resolver(event.params.node.toHex());
    resolverEntity.save();
  }

  // Update fields on the Address entity
  addressEntity.address = event.params.a.toHex();
  addressEntity.cointype = BigInt.fromI32(10);  // Assuming Optimism mainnet
  addressEntity.resolver = resolverEntity.id;

  // Save the updated Address entity
  addressEntity.save();

  */
}

export function handleAddressChanged(event: AddressChangedEvent): void {
  // Generate a unique ID for the Address entity
  let addressId = event.params.node
    .toHex()
    .concat("-")
    .concat(event.params.coinType.toString());

  // Try loading the Address entity, or create a new one if it doesn't exist
  let addressEntity = Address.load(addressId);
  if (addressEntity == null) {
    addressEntity = new Address(addressId);
  }

  // Load or create the parent Resolver entity
  let resolverEntity = Resolver.load(event.params.node.toHex());
  if (!resolverEntity) {
    resolverEntity = new Resolver(event.params.node.toHex());
    resolverEntity.save();
  }

  // Update fields on the Address entity
  addressEntity.address = event.params.newAddress.toHex();
  addressEntity.cointype = event.params.coinType;
  addressEntity.resolver = resolverEntity.id;

  // Save the updated Address entity
  addressEntity.save();
}


export function handleContenthashChanged(event: ContenthashChangedEvent): void {
  // Generate a unique ID for the Resolver entity
  let resolverId = event.params.node.toHex();

  // Try loading the Resolver entity, or create a new one if it doesn't exist
  // (it should always exist though)
  let resolverEntity = Resolver.load(resolverId);
  if (!resolverEntity) {
    resolverEntity = new Resolver(resolverId);
    resolverEntity.save();
  }

  // Update the content hash on the Resolver entity
  resolverEntity.contenthash = event.params.hash;
  resolverEntity.save();
}

export function handleDNSRecordChanged(event: DNSRecordChangedEvent): void {
  // Generate a unique ID for the DnsRecord entity
  let dnsRecordId = event.params.node
    .toHex()
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
  let resolverEntity = Resolver.load(event.params.node.toHex());
  if (!resolverEntity) {
    resolverEntity = new Resolver(event.params.node.toHex());
    resolverEntity.save();
  }

  // Set the parent Resolver of this DnsRecord
  dnsRecordEntity.resolver = resolverEntity.id;

  // Save the updated DnsRecord entity
  dnsRecordEntity.save();
}

export function handleDNSRecordDeleted(event: DNSRecordDeletedEvent): void {
  // Generate the ID based on the node and resource
  let dnsRecordId = event.params.node
    .toHex()
    .concat("-")
    .concat(event.params.resource.toString());

  // Load the DnsRecord entity
  let dnsRecordEntity = DnsRecord.load(dnsRecordId);
  if (dnsRecordEntity != null) {
    // Remove the DnsRecord entity
    GraphStore.remove("DnsRecord", dnsRecordId);
  }
}

export function handleDNSZonehashChanged(event: DNSZonehashChangedEvent): void {
  // Generate a unique ID for the Resolver entity
  let resolverId = event.params.node.toHex();

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
}

export function handleNameChanged(event: NameChangedEvent): void {
  let entity = new NameChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.node = event.params.node;
  entity.name = event.params.name;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleReverseClaimed(event: ReverseClaimedEvent): void {
  let entity = new ReverseClaimed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity._addr = event.params._addr;
  entity._domain = event.params._domain;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTextChanged(event: TextChangedEvent): void {
  // Generate a unique ID for the TextRecord entity
  let textRecordId = event.params.node
    .toHex()
    .concat("-")
    .concat(event.params.key.toString());

  // Try loading the TextRecord entity, or create a new one if it doesn't exist
  let textRecordEntity = TextRecord.load(textRecordId);
  if (textRecordEntity == null) {
    textRecordEntity = new TextRecord(textRecordId);
  }

  // Update fields on the TextRecord entity
  textRecordEntity.key = event.params.key.toString();
  textRecordEntity.value = event.params.value.toString();

  // Load or create the parent Resolver entity
  let resolverId = event.params.node.toHex();
  let resolverEntity = Resolver.load(resolverId);
  if (resolverEntity == null) {
    resolverEntity = new Resolver(resolverId);
    resolverEntity.save();
  }

  // Set the parent Resolver of this TextRecord
  textRecordEntity.resolver = resolverEntity.id;

  // Save the updated TextRecord entity
  textRecordEntity.save();
}


export function handleUpdatedDelegate(event: UpdatedDelegateEvent): void {
  // Generate a unique ID for the Delegate entity by combining the _tokenId and _owner
  let delegateId = event.params._tokenId.toHexString().concat("-").concat(event.params._owner.toHex());

  // Try loading the Delegate entity, or create a new one if it doesn't exist
  let delegateEntity = Delegate.load(delegateId);
  if (delegateEntity == null) {
    delegateEntity = new Delegate(delegateId);
  }

  // Update the delegate field on the Delegate entity
  delegateEntity.delegate = event.params._delegate;

  // Save the updated Delegate entity
  delegateEntity.save();

  // Optionally, you can also update the delegate reference on the related Resolver entity
  // This assumes that the Resolver entity uses the token ID as its unique ID
  let resolverEntity = Resolver.load(event.params._tokenId.toHexString());
  if (resolverEntity) {
    resolverEntity.delegate = delegateEntity.id;
    resolverEntity.save();
  }
}


// TODO: need to remove the child entities and reset the resolver
export function handleVersionChanged(event: VersionChangedEvent): void {
  
}
