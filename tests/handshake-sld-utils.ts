import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  RoyaltyPayoutAddressSet,
  RoyaltyPayoutAmountSet
} from "../generated/HandshakeSld/HandshakeSld"

export function createRoyaltyPayoutAddressSetEvent(
  _nftNamehash: Bytes,
  _payoutAddress: Address
): RoyaltyPayoutAddressSet {
  let royaltyPayoutAddressSetEvent = changetype<RoyaltyPayoutAddressSet>(
    newMockEvent()
  )

  royaltyPayoutAddressSetEvent.parameters = new Array()

  royaltyPayoutAddressSetEvent.parameters.push(
    new ethereum.EventParam(
      "_nftNamehash",
      ethereum.Value.fromFixedBytes(_nftNamehash)
    )
  )
  royaltyPayoutAddressSetEvent.parameters.push(
    new ethereum.EventParam(
      "_payoutAddress",
      ethereum.Value.fromAddress(_payoutAddress)
    )
  )

  return royaltyPayoutAddressSetEvent
}

export function createRoyaltyPayoutAmountSetEvent(
  _nftNamehash: Bytes,
  _amount: BigInt
): RoyaltyPayoutAmountSet {
  let royaltyPayoutAmountSetEvent = changetype<RoyaltyPayoutAmountSet>(
    newMockEvent()
  )

  royaltyPayoutAmountSetEvent.parameters = new Array()

  royaltyPayoutAmountSetEvent.parameters.push(
    new ethereum.EventParam(
      "_nftNamehash",
      ethereum.Value.fromFixedBytes(_nftNamehash)
    )
  )
  royaltyPayoutAmountSetEvent.parameters.push(
    new ethereum.EventParam(
      "_amount",
      ethereum.Value.fromUnsignedBigInt(_amount)
    )
  )

  return royaltyPayoutAmountSetEvent
}
