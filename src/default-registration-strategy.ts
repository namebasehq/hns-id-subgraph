import {
  EnabledSet as EnabledSetEvent,
  LengthCostSet as LengthCostSetEvent,
  MultiYearDiscountSet as MultiYearDiscountSetEvent,
  PremiumNameSet as PremiumNameSetEvent,
  ReservedNameSet as ReservedNameSetEvent
} from "../generated/DefaultRegistrationStrategy/DefaultRegistrationStrategy"
import {
  EnabledSet,
  LengthCostSet,
  MultiYearDiscountSet,
  PremiumNameSet,
  ReservedNameSet
} from "../generated/schema"

export function handleEnabledSet(event: EnabledSetEvent): void {
  let entity = new EnabledSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._tokenNamehash = event.params._tokenNamehash
  entity._enabled = event.params._enabled

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLengthCostSet(event: LengthCostSetEvent): void {
  let entity = new LengthCostSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._tokenNamehash = event.params._tokenNamehash
  entity._prices = event.params._prices

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMultiYearDiscountSet(
  event: MultiYearDiscountSetEvent
): void {
  let entity = new MultiYearDiscountSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._tokenNamehash = event.params._tokenNamehash
  entity._discounts = event.params._discounts

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePremiumNameSet(event: PremiumNameSetEvent): void {
  let entity = new PremiumNameSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._tokenNamehash = event.params._tokenNamehash
  entity._price = event.params._price
  entity._label = event.params._label

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleReservedNameSet(event: ReservedNameSetEvent): void {
  let entity = new ReservedNameSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._tokenNamehash = event.params._tokenNamehash
  entity._claimant = event.params._claimant
  entity._label = event.params._label

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
