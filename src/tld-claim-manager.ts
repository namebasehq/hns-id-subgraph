import {
  AllowedTldMintUpdate as AllowedTldMintUpdateEvent,
  Initialized as InitializedEvent,
  NewLabelValidator as NewLabelValidatorEvent,
  NewUsdOracle as NewUsdOracleEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  TldClaimed as TldClaimedEvent,
  UpdateAllowedTldManager as UpdateAllowedTldManagerEvent
} from "../generated/TldClaimManager/TldClaimManager"
import {
  AllowedTldMintUpdate,
  Initialized,
  NewLabelValidator,
  NewUsdOracle,
  OwnershipTransferred,
  TldClaimed,
  UpdateAllowedTldManager
} from "../generated/schema"

export function handleAllowedTldMintUpdate(
  event: AllowedTldMintUpdateEvent
): void {
  let entity = new AllowedTldMintUpdate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._claimant = event.params._claimant
  entity._manager = event.params._manager
  entity._label = event.params._label

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

export function handleTldClaimed(event: TldClaimedEvent): void {
  let entity = new TldClaimed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._to = event.params._to
  entity._tokenId = event.params._tokenId
  entity._label = event.params._label

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUpdateAllowedTldManager(
  event: UpdateAllowedTldManagerEvent
): void {
  let entity = new UpdateAllowedTldManager(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._addr = event.params._addr
  entity._allowed = event.params._allowed

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
