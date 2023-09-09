import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  ResolverSet as ResolverSetEvent,
  RoyaltyPayoutAddressSet as RoyaltyPayoutAddressSetEvent,
  RoyaltyPayoutAmountSet as RoyaltyPayoutAmountSetEvent,
  Transfer as TransferEvent
} from "../generated/HandshakeSld/HandshakeSld"
import {
  Approval,
  ApprovalForAll,
  OwnershipTransferred,
  ResolverSet,
  RoyaltyPayoutAddressSet,
  RoyaltyPayoutAmountSet,
  Transfer
} from "../generated/schema"

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.approved = event.params.approved
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.operator = event.params.operator
  entity.approved = event.params.approved

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

export function handleResolverSet(event: ResolverSetEvent): void {
  let entity = new ResolverSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._nftNamehash = event.params._nftNamehash
  entity._resolver = event.params._resolver

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoyaltyPayoutAddressSet(
  event: RoyaltyPayoutAddressSetEvent
): void {
  let entity = new RoyaltyPayoutAddressSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._nftNamehash = event.params._nftNamehash
  entity._payoutAddress = event.params._payoutAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoyaltyPayoutAmountSet(
  event: RoyaltyPayoutAmountSetEvent
): void {
  let entity = new RoyaltyPayoutAmountSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._nftNamehash = event.params._nftNamehash
  entity._amount = event.params._amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
