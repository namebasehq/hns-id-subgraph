import {
  DiscountSet as DiscountSetEvent,
  Initialized as InitializedEvent,
  NewGracePeriod as NewGracePeriodEvent,
  NewLabelValidator as NewLabelValidatorEvent,
  NewUsdOracle as NewUsdOracleEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  PaymentSent as PaymentSentEvent,
  RegisterSld as RegisterSldEvent,
  RenewSld as RenewSldEvent
} from "../generated/SldRegistrationManager/SldRegistrationManager"
import {
  DiscountSet,
  Initialized,
  NewGracePeriod,
  NewLabelValidator,
  NewUsdOracle,
  OwnershipTransferred,
  PaymentSent,
  RegisterSld,
  RenewSld
} from "../generated/schema"

export function handleDiscountSet(event: DiscountSetEvent): void {
  let entity = new DiscountSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._tokenNamehash = event.params._tokenNamehash
  entity._claimant = event.params._claimant
  entity._discount_startTimestamp = event.params._discount.startTimestamp
  entity._discount_endTimestamp = event.params._discount.endTimestamp
  entity._discount_discountPercentage =
    event.params._discount.discountPercentage
  entity._discount_isRegistration = event.params._discount.isRegistration
  entity._discount_isRenewal = event.params._discount.isRenewal

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.version = event.params.version

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewGracePeriod(event: NewGracePeriodEvent): void {
  let entity = new NewGracePeriod(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._newGracePeriod = event.params._newGracePeriod

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewLabelValidator(event: NewLabelValidatorEvent): void {
  let entity = new NewLabelValidator(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._labelValidator = event.params._labelValidator

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewUsdOracle(event: NewUsdOracleEvent): void {
  let entity = new NewUsdOracle(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._usdEthPriceOracle = event.params._usdEthPriceOracle

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePaymentSent(event: PaymentSentEvent): void {
  let entity = new PaymentSent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._to = event.params._to
  entity._amount = event.params._amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRegisterSld(event: RegisterSldEvent): void {
  let entity = new RegisterSld(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._tldNamehash = event.params._tldNamehash
  entity._secret = event.params._secret
  entity._label = event.params._label
  entity._expiry = event.params._expiry

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRenewSld(event: RenewSldEvent): void {
  let entity = new RenewSld(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._tldNamehash = event.params._tldNamehash
  entity._label = event.params._label
  entity._expiry = event.params._expiry

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
