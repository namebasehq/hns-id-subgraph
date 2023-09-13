import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  Approval,
  ApprovalForAll,
  OwnershipTransferred,
  ResolverSet,
  RoyaltyPayoutAddressSet,
  RoyaltyPayoutAmountSet,
  Transfer
} from "../generated/HandshakeSld/HandshakeSld"
import { RegisterSld } from "../generated/SldRegistrationManager/SldRegistrationManager";

export function createRegisterSldEvent(
  _tldNamehash: Bytes,
  _secret: Bytes,
  _label: string,
  _expiry: BigInt,
): RegisterSld {
  let mockEvent = newMockEvent();
  let registerSldEvent = new RegisterSld(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  );

  registerSldEvent.parameters = new Array()
  registerSldEvent.parameters.push(
    new ethereum.EventParam("_tldNamehash", ethereum.Value.fromBytes(_tldNamehash))
  );
  registerSldEvent.parameters.push(
    new ethereum.EventParam("_secret", ethereum.Value.fromBytes(_secret))
  );
  registerSldEvent.parameters.push(
    new ethereum.EventParam("_label", ethereum.Value.fromString(_label))
  );
  registerSldEvent.parameters.push(
    new ethereum.EventParam("_expiry", ethereum.Value.fromUnsignedBigInt(_expiry))
  );
  return registerSldEvent;
}

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
