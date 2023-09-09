import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  AllowedTldMintUpdate,
  Initialized,
  NewLabelValidator,
  NewUsdOracle,
  OwnershipTransferred,
  TldClaimed,
  UpdateAllowedTldManager
} from "../generated/TldClaimManager/TldClaimManager"

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
  let tldClaimedEvent = changetype<TldClaimed>(newMockEvent())

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
