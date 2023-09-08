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
  AddressChanged,
  ContenthashChanged,
  DNSRecordChanged,
  DNSRecordDeleted,
  DNSZonehashChanged,
  NameChanged,
  ReverseClaimed,
  TextChanged,
  UpdatedDelegate,
  VersionChanged
} from "../generated/schema"

export function handleAddrChanged(event: AddrChangedEvent): void {
  let entity = new AddrChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.node = event.params.node
  entity.a = event.params.a

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAddressChanged(event: AddressChangedEvent): void {
  let entity = new AddressChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.node = event.params.node
  entity.coinType = event.params.coinType
  entity.newAddress = event.params.newAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleContenthashChanged(event: ContenthashChangedEvent): void {
  let entity = new ContenthashChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.node = event.params.node
  entity.hash = event.params.hash

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
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
  let entity = new TextChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.node = event.params.node
  entity.indexedKey = event.params.indexedKey
  entity.key = event.params.key
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
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
