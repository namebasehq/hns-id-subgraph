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
  VersionChanged as VersionChangedEvent
} from "../generated/DefaultResolver/DefaultResolver"
import {
  AddrChanged,
  Address,
  AddressChanged,
  ContenthashChanged,
  DNSRecordChanged,
  DNSRecordDeleted,
  DNSZonehashChanged,
  NameChanged,
  Resolver,
  ReverseClaimed,
  TextChanged,
  TextRecord,
  UpdatedDelegate,
  VersionChanged
} from "../generated/schema"

import { BigInt } from "@graphprotocol/graph-ts";

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
  let addressId = event.params.node.toHex().concat("-").concat(event.params.coinType.toString());

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
  resolverEntity.contenthash = event.params.hash.toHex();
  resolverEntity.save();
}

export function handleDNSRecordChanged(event: DNSRecordChangedEvent): void {
  let entity = new DNSRecordChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.node = event.params.node
  entity.name = event.params.name
  entity.resource = event.params.resource
  entity.record = event.params.record

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDNSRecordDeleted(event: DNSRecordDeletedEvent): void {
  let entity = new DNSRecordDeleted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.node = event.params.node
  entity.name = event.params.name
  entity.resource = event.params.resource

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDNSZonehashChanged(event: DNSZonehashChangedEvent): void {
  let entity = new DNSZonehashChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.node = event.params.node
  entity.lastzonehash = event.params.lastzonehash
  entity.zonehash = event.params.zonehash

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNameChanged(event: NameChangedEvent): void {
  let entity = new NameChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.node = event.params.node
  entity.name = event.params.name

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleReverseClaimed(event: ReverseClaimedEvent): void {
  let entity = new ReverseClaimed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._addr = event.params._addr
  entity._domain = event.params._domain

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTextChanged(event: TextChangedEvent): void {
  // Generate a unique ID for the TextRecord entity
  let textRecordId = event.params.node.toHex().concat("-").concat(event.params.key.toString());

  // Try loading the TextRecord entity, or create a new one if it doesn't exist
  let textRecordEntity = TextRecord.load(textRecordId);
  if (textRecordEntity == null) {
    textRecordEntity = new TextRecord(textRecordId);
    textRecordEntity.resolver = event.params.node.toHex();
  }

  // Update fields on the TextRecord entity
  textRecordEntity.key = event.params.key.toString();
  textRecordEntity.value = event.params.value.toString();
  
  // Save the updated TextRecord entity
  textRecordEntity.save();
}


export function handleUpdatedDelegate(event: UpdatedDelegateEvent): void {
  let entity = new UpdatedDelegate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._owner = event.params._owner
  entity._tokenId = event.params._tokenId
  entity._delegate = event.params._delegate

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVersionChanged(event: VersionChangedEvent): void {
  let entity = new VersionChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.node = event.params.node
  entity.newVersion = event.params.newVersion

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
