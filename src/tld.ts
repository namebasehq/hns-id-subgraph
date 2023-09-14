import { ResolverSet as ResolverSetEvent, Transfer as TransferEvent } from "../generated/HandshakeTld/HandshakeTld"
import {
  Account,
  AllowedTldMintUpdate,
  EnabledSet,
  LengthCostSet,
  MultiYearDiscountSet,
  PremiumNameSet,
  ReservedNameSet,
  ResolverSetTld,
  TldClaimed,
  TransferTld,
  UpdateAllowedTldManager
} from "../generated/schema"
import {
  AllowedTldMintUpdate as AllowedTldMintUpdateEvent,
  TldClaimed as TldClaimedEvent,
  UpdateAllowedTldManager as UpdateAllowedTldManagerEvent
} from "../generated/TldClaimManager/TldClaimManager";
import {
  EnabledSet as EnabledSetEvent,
  LengthCostSet as LengthCostSetEvent,
  MultiYearDiscountSet as MultiYearDiscountSetEvent,
  PremiumNameSet as PremiumNameSetEvent,
  ReservedNameSet as ReservedNameSetEvent
} from "../generated/DefaultRegistrationStrategy/DefaultRegistrationStrategy";
import { createEventID, createOrLoadTld } from "./utils";
import { ByteArray, Bytes, crypto } from "@graphprotocol/graph-ts";

export function handleTldClaimed(event: TldClaimedEvent): void {
  let tld = createOrLoadTld(event.params._tokenId.toHex())
  let labelHash = crypto.keccak256(ByteArray.fromUTF8(event.params._label));

  let account = new Account(event.params._to.toHex());
  account.save();

  tld.name = event.params._label
  tld.labelName = event.params._label
  tld.labelhash = Bytes.fromByteArray(labelHash);
  tld.createdAt = event.block.timestamp
  tld.owner = account.id
  tld.save();

  let claim = new TldClaimed(createEventID(event))
  claim.tld = tld.id
  claim.claimDate = event.block.timestamp
  claim.claimant = account.id
  claim.labelName = event.params._label
  claim.labelhash = tld.labelhash
  claim.blockNumber = event.block.number.toI32()
  claim.transactionID = event.transaction.hash
  claim.save()
}

export function handleAllowedTldMintUpdate(
  event: AllowedTldMintUpdateEvent
): void {
  let entity = new AllowedTldMintUpdate(createEventID(event))
  entity._claimant = event.params._claimant
  entity._manager = event.params._manager
  entity._label = event.params._label

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUpdateAllowedTldManager(
  event: UpdateAllowedTldManagerEvent
): void {
  let entity = new UpdateAllowedTldManager(createEventID(event))
  entity._addr = event.params._addr
  entity._allowed = event.params._allowed

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleResolverSetTld(event: ResolverSetEvent): void {
  let entity = new ResolverSetTld(createEventID(event))
  entity._nftNamehash = event.params._nftNamehash
  entity._resolver = event.params._resolver

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransferTld(event: TransferEvent): void {
  let entity = new TransferTld(createEventID(event))
  entity.from = event.params.from
  entity.to = event.params.to
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleEnabledSet(event: EnabledSetEvent): void {
  let entity = new EnabledSet(createEventID(event))
  entity._tokenNamehash = event.params._tokenNamehash
  entity._enabled = event.params._enabled

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLengthCostSet(event: LengthCostSetEvent): void {
  let entity = new LengthCostSet(createEventID(event))
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
  let entity = new MultiYearDiscountSet(createEventID(event))
  entity._tokenNamehash = event.params._tokenNamehash
  entity._discounts = event.params._discounts

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePremiumNameSet(event: PremiumNameSetEvent): void {
  let entity = new PremiumNameSet(createEventID(event))
  entity._tokenNamehash = event.params._tokenNamehash
  entity._price = event.params._price
  entity._label = event.params._label

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleReservedNameSet(event: ReservedNameSetEvent): void {
  let entity = new ReservedNameSet(createEventID(event))
  entity._tokenNamehash = event.params._tokenNamehash
  entity._claimant = event.params._claimant
  entity._label = event.params._label

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
