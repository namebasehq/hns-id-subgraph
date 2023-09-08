import {
  RoyaltyPayoutAddressSet as RoyaltyPayoutAddressSetEvent,
  RoyaltyPayoutAmountSet as RoyaltyPayoutAmountSetEvent
} from "../generated/HandshakeSld/HandshakeSld"
import {
  RoyaltyPayoutAddressSet,
  RoyaltyPayoutAmountSet
} from "../generated/schema"

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
