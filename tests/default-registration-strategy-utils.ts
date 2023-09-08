import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  EnabledSet,
  LengthCostSet,
  MultiYearDiscountSet,
  PremiumNameSet,
  ReservedNameSet
} from "../generated/DefaultRegistrationStrategy/DefaultRegistrationStrategy"

export function createEnabledSetEvent(
  _tokenNamehash: Bytes,
  _enabled: boolean
): EnabledSet {
  let enabledSetEvent = changetype<EnabledSet>(newMockEvent())

  enabledSetEvent.parameters = new Array()

  enabledSetEvent.parameters.push(
    new ethereum.EventParam(
      "_tokenNamehash",
      ethereum.Value.fromFixedBytes(_tokenNamehash)
    )
  )
  enabledSetEvent.parameters.push(
    new ethereum.EventParam("_enabled", ethereum.Value.fromBoolean(_enabled))
  )

  return enabledSetEvent
}

export function createLengthCostSetEvent(
  _tokenNamehash: Bytes,
  _prices: Array<BigInt>
): LengthCostSet {
  let lengthCostSetEvent = changetype<LengthCostSet>(newMockEvent())

  lengthCostSetEvent.parameters = new Array()

  lengthCostSetEvent.parameters.push(
    new ethereum.EventParam(
      "_tokenNamehash",
      ethereum.Value.fromFixedBytes(_tokenNamehash)
    )
  )
  lengthCostSetEvent.parameters.push(
    new ethereum.EventParam(
      "_prices",
      ethereum.Value.fromUnsignedBigIntArray(_prices)
    )
  )

  return lengthCostSetEvent
}

export function createMultiYearDiscountSetEvent(
  _tokenNamehash: Bytes,
  _discounts: Array<BigInt>
): MultiYearDiscountSet {
  let multiYearDiscountSetEvent = changetype<MultiYearDiscountSet>(
    newMockEvent()
  )

  multiYearDiscountSetEvent.parameters = new Array()

  multiYearDiscountSetEvent.parameters.push(
    new ethereum.EventParam(
      "_tokenNamehash",
      ethereum.Value.fromFixedBytes(_tokenNamehash)
    )
  )
  multiYearDiscountSetEvent.parameters.push(
    new ethereum.EventParam(
      "_discounts",
      ethereum.Value.fromUnsignedBigIntArray(_discounts)
    )
  )

  return multiYearDiscountSetEvent
}

export function createPremiumNameSetEvent(
  _tokenNamehash: Bytes,
  _price: BigInt,
  _label: string
): PremiumNameSet {
  let premiumNameSetEvent = changetype<PremiumNameSet>(newMockEvent())

  premiumNameSetEvent.parameters = new Array()

  premiumNameSetEvent.parameters.push(
    new ethereum.EventParam(
      "_tokenNamehash",
      ethereum.Value.fromFixedBytes(_tokenNamehash)
    )
  )
  premiumNameSetEvent.parameters.push(
    new ethereum.EventParam("_price", ethereum.Value.fromUnsignedBigInt(_price))
  )
  premiumNameSetEvent.parameters.push(
    new ethereum.EventParam("_label", ethereum.Value.fromString(_label))
  )

  return premiumNameSetEvent
}

export function createReservedNameSetEvent(
  _tokenNamehash: Bytes,
  _claimant: Address,
  _label: string
): ReservedNameSet {
  let reservedNameSetEvent = changetype<ReservedNameSet>(newMockEvent())

  reservedNameSetEvent.parameters = new Array()

  reservedNameSetEvent.parameters.push(
    new ethereum.EventParam(
      "_tokenNamehash",
      ethereum.Value.fromFixedBytes(_tokenNamehash)
    )
  )
  reservedNameSetEvent.parameters.push(
    new ethereum.EventParam("_claimant", ethereum.Value.fromAddress(_claimant))
  )
  reservedNameSetEvent.parameters.push(
    new ethereum.EventParam("_label", ethereum.Value.fromString(_label))
  )

  return reservedNameSetEvent
}
