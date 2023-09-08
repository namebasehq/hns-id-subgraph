import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
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
} from "../generated/DefaultResolver/DefaultResolver"

export function createAddrChangedEvent(node: Bytes, a: Address): AddrChanged {
  let addrChangedEvent = changetype<AddrChanged>(newMockEvent())

  addrChangedEvent.parameters = new Array()

  addrChangedEvent.parameters.push(
    new ethereum.EventParam("node", ethereum.Value.fromFixedBytes(node))
  )
  addrChangedEvent.parameters.push(
    new ethereum.EventParam("a", ethereum.Value.fromAddress(a))
  )

  return addrChangedEvent
}

export function createAddressChangedEvent(
  node: Bytes,
  coinType: BigInt,
  newAddress: Bytes
): AddressChanged {
  let addressChangedEvent = changetype<AddressChanged>(newMockEvent())

  addressChangedEvent.parameters = new Array()

  addressChangedEvent.parameters.push(
    new ethereum.EventParam("node", ethereum.Value.fromFixedBytes(node))
  )
  addressChangedEvent.parameters.push(
    new ethereum.EventParam(
      "coinType",
      ethereum.Value.fromUnsignedBigInt(coinType)
    )
  )
  addressChangedEvent.parameters.push(
    new ethereum.EventParam("newAddress", ethereum.Value.fromBytes(newAddress))
  )

  return addressChangedEvent
}

export function createContenthashChangedEvent(
  node: Bytes,
  hash: Bytes
): ContenthashChanged {
  let contenthashChangedEvent = changetype<ContenthashChanged>(newMockEvent())

  contenthashChangedEvent.parameters = new Array()

  contenthashChangedEvent.parameters.push(
    new ethereum.EventParam("node", ethereum.Value.fromFixedBytes(node))
  )
  contenthashChangedEvent.parameters.push(
    new ethereum.EventParam("hash", ethereum.Value.fromBytes(hash))
  )

  return contenthashChangedEvent
}

export function createDNSRecordChangedEvent(
  node: Bytes,
  name: Bytes,
  resource: i32,
  record: Bytes
): DNSRecordChanged {
  let dnsRecordChangedEvent = changetype<DNSRecordChanged>(newMockEvent())

  dnsRecordChangedEvent.parameters = new Array()

  dnsRecordChangedEvent.parameters.push(
    new ethereum.EventParam("node", ethereum.Value.fromFixedBytes(node))
  )
  dnsRecordChangedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromBytes(name))
  )
  dnsRecordChangedEvent.parameters.push(
    new ethereum.EventParam(
      "resource",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(resource))
    )
  )
  dnsRecordChangedEvent.parameters.push(
    new ethereum.EventParam("record", ethereum.Value.fromBytes(record))
  )

  return dnsRecordChangedEvent
}

export function createDNSRecordDeletedEvent(
  node: Bytes,
  name: Bytes,
  resource: i32
): DNSRecordDeleted {
  let dnsRecordDeletedEvent = changetype<DNSRecordDeleted>(newMockEvent())

  dnsRecordDeletedEvent.parameters = new Array()

  dnsRecordDeletedEvent.parameters.push(
    new ethereum.EventParam("node", ethereum.Value.fromFixedBytes(node))
  )
  dnsRecordDeletedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromBytes(name))
  )
  dnsRecordDeletedEvent.parameters.push(
    new ethereum.EventParam(
      "resource",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(resource))
    )
  )

  return dnsRecordDeletedEvent
}

export function createDNSZonehashChangedEvent(
  node: Bytes,
  lastzonehash: Bytes,
  zonehash: Bytes
): DNSZonehashChanged {
  let dnsZonehashChangedEvent = changetype<DNSZonehashChanged>(newMockEvent())

  dnsZonehashChangedEvent.parameters = new Array()

  dnsZonehashChangedEvent.parameters.push(
    new ethereum.EventParam("node", ethereum.Value.fromFixedBytes(node))
  )
  dnsZonehashChangedEvent.parameters.push(
    new ethereum.EventParam(
      "lastzonehash",
      ethereum.Value.fromBytes(lastzonehash)
    )
  )
  dnsZonehashChangedEvent.parameters.push(
    new ethereum.EventParam("zonehash", ethereum.Value.fromBytes(zonehash))
  )

  return dnsZonehashChangedEvent
}

export function createNameChangedEvent(node: Bytes, name: string): NameChanged {
  let nameChangedEvent = changetype<NameChanged>(newMockEvent())

  nameChangedEvent.parameters = new Array()

  nameChangedEvent.parameters.push(
    new ethereum.EventParam("node", ethereum.Value.fromFixedBytes(node))
  )
  nameChangedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )

  return nameChangedEvent
}

export function createReverseClaimedEvent(
  _addr: Address,
  _domain: string
): ReverseClaimed {
  let reverseClaimedEvent = changetype<ReverseClaimed>(newMockEvent())

  reverseClaimedEvent.parameters = new Array()

  reverseClaimedEvent.parameters.push(
    new ethereum.EventParam("_addr", ethereum.Value.fromAddress(_addr))
  )
  reverseClaimedEvent.parameters.push(
    new ethereum.EventParam("_domain", ethereum.Value.fromString(_domain))
  )

  return reverseClaimedEvent
}

export function createTextChangedEvent(
  node: Bytes,
  indexedKey: Bytes,
  key: string,
  value: string
): TextChanged {
  let textChangedEvent = changetype<TextChanged>(newMockEvent())

  textChangedEvent.parameters = new Array()

  textChangedEvent.parameters.push(
    new ethereum.EventParam("node", ethereum.Value.fromFixedBytes(node))
  )
  textChangedEvent.parameters.push(
      new ethereum.EventParam("key", ethereum.Value.fromString(key))
  )
  textChangedEvent.parameters.push(
    new ethereum.EventParam("indexedKey", ethereum.Value.fromFixedBytes(indexedKey))
  )
  textChangedEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromString(value))
  )

  return textChangedEvent
}

export function createUpdatedDelegateEvent(
  _owner: Address,
  _tokenId: BigInt,
  _delegate: Address
): UpdatedDelegate {
  let updatedDelegateEvent = changetype<UpdatedDelegate>(newMockEvent())

  updatedDelegateEvent.parameters = new Array()

  updatedDelegateEvent.parameters.push(
    new ethereum.EventParam("_owner", ethereum.Value.fromAddress(_owner))
  )
  updatedDelegateEvent.parameters.push(
    new ethereum.EventParam(
      "_tokenId",
      ethereum.Value.fromUnsignedBigInt(_tokenId)
    )
  )
  updatedDelegateEvent.parameters.push(
    new ethereum.EventParam("_delegate", ethereum.Value.fromAddress(_delegate))
  )

  return updatedDelegateEvent
}

export function createVersionChangedEvent(
  node: Bytes,
  newVersion: BigInt
): VersionChanged {
  let versionChangedEvent = changetype<VersionChanged>(newMockEvent())

  versionChangedEvent.parameters = new Array()

  versionChangedEvent.parameters.push(
    new ethereum.EventParam("node", ethereum.Value.fromFixedBytes(node))
  )
  versionChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newVersion",
      ethereum.Value.fromUnsignedBigInt(newVersion)
    )
  )

  return versionChangedEvent
}
