import { newMockEvent } from "matchstick-as"
import { Address, BigInt, Bytes, ethereum } from "@graphprotocol/graph-ts"
import {
  Approval,
  ApprovalForAll,
  OwnershipTransferred,
  RegistrationStrategySet,
  ResolverSet,
  Transfer
} from "../generated/HandshakeTld/HandshakeTld"
import {
  AllowedTldMintUpdate,
  Initialized,
  NewLabelValidator,
  NewUsdOracle,
  TldClaimed as TldClaimedEvent,
  TldClaimed,
  UpdateAllowedTldManager
} from "../generated/TldClaimManager/TldClaimManager";
import {
  EnabledSet,
  LengthCostSet,
  MultiYearDiscountSet,
  PremiumNameSet,
  ReservedNameSet
} from "../generated/DefaultRegistrationStrategy/DefaultRegistrationStrategy";

export function createApprovalEvent(
  owner: Address,
  approved: Address,
  tokenId: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromAddress(approved))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return approvalEvent
}

export function createApprovalForAllEvent(
  owner: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return approvalForAllEvent
}

export function createRegistrationStrategySetEvent(
  namehash: Bytes,
  strategy: Address
): RegistrationStrategySet {
  let registrationStrategySetEvent = changetype<RegistrationStrategySet>(
    newMockEvent()
  )

  registrationStrategySetEvent.parameters = new Array()

  registrationStrategySetEvent.parameters.push(
    new ethereum.EventParam("namehash", ethereum.Value.fromFixedBytes(namehash))
  )
  registrationStrategySetEvent.parameters.push(
    new ethereum.EventParam("strategy", ethereum.Value.fromAddress(strategy))
  )

  return registrationStrategySetEvent
}

export function createResolverSetEvent(
  _nftNamehash: Bytes,
  _resolver: Address
): ResolverSet {
  let resolverSetEvent = changetype<ResolverSet>(newMockEvent())

  resolverSetEvent.parameters = new Array()

  resolverSetEvent.parameters.push(
    new ethereum.EventParam(
      "_nftNamehash",
      ethereum.Value.fromFixedBytes(_nftNamehash)
    )
  )
  resolverSetEvent.parameters.push(
    new ethereum.EventParam("_resolver", ethereum.Value.fromAddress(_resolver))
  )

  return resolverSetEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return transferEvent
}

export function createAllowedTldMintUpdateEvent(
  _claimant: Address,
  _manager: Address,
  _label: string
): AllowedTldMintUpdate {
  let allowedTldMintUpdateEvent = changetype<AllowedTldMintUpdate>(
    newMockEvent()
  )

  allowedTldMintUpdateEvent.parameters = new Array()

  allowedTldMintUpdateEvent.parameters.push(
    new ethereum.EventParam("_claimant", ethereum.Value.fromAddress(_claimant))
  )
  allowedTldMintUpdateEvent.parameters.push(
    new ethereum.EventParam("_manager", ethereum.Value.fromAddress(_manager))
  )
  allowedTldMintUpdateEvent.parameters.push(
    new ethereum.EventParam("_label", ethereum.Value.fromString(_label))
  )

  return allowedTldMintUpdateEvent
}

export function createInitializedEvent(version: i32): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version))
    )
  )

  return initializedEvent
}

export function createNewLabelValidatorEvent(
  _labelValidator: Address
): NewLabelValidator {
  let newLabelValidatorEvent = changetype<NewLabelValidator>(newMockEvent())

  newLabelValidatorEvent.parameters = new Array()

  newLabelValidatorEvent.parameters.push(
    new ethereum.EventParam(
      "_labelValidator",
      ethereum.Value.fromAddress(_labelValidator)
    )
  )

  return newLabelValidatorEvent
}

export function createNewUsdOracleEvent(
  _usdEthPriceOracle: Address
): NewUsdOracle {
  let newUsdOracleEvent = changetype<NewUsdOracle>(newMockEvent())

  newUsdOracleEvent.parameters = new Array()

  newUsdOracleEvent.parameters.push(
    new ethereum.EventParam(
      "_usdEthPriceOracle",
      ethereum.Value.fromAddress(_usdEthPriceOracle)
    )
  )

  return newUsdOracleEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createTldClaimedEvent(
  _to: Address,
  _tokenId: BigInt,
  _label: string
): TldClaimed {
  // let tldClaimedEvent = changetype<TldClaimed>(newMockEvent())
  let mockEvent = newMockEvent();
  let tldClaimedEvent = new TldClaimedEvent(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  );

  tldClaimedEvent.parameters = new Array()

  tldClaimedEvent.parameters.push(
    new ethereum.EventParam("_to", ethereum.Value.fromAddress(_to))
  )
  tldClaimedEvent.parameters.push(
    new ethereum.EventParam("_tokenId", ethereum.Value.fromUnsignedBigInt(_tokenId))
  )
  tldClaimedEvent.parameters.push(
    new ethereum.EventParam("_label", ethereum.Value.fromString(_label))
  )

  return tldClaimedEvent
}

export function createUpdateAllowedTldManagerEvent(
  _addr: Address,
  _allowed: boolean
): UpdateAllowedTldManager {
  let updateAllowedTldManagerEvent = changetype<UpdateAllowedTldManager>(
    newMockEvent()
  )

  updateAllowedTldManagerEvent.parameters = new Array()

  updateAllowedTldManagerEvent.parameters.push(
    new ethereum.EventParam("_addr", ethereum.Value.fromAddress(_addr))
  )
  updateAllowedTldManagerEvent.parameters.push(
    new ethereum.EventParam("_allowed", ethereum.Value.fromBoolean(_allowed))
  )

  return updateAllowedTldManagerEvent
}

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
