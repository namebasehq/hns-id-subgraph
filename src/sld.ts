import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  HandshakeSld,
  ResolverSet as ResolverSetEvent,
  Transfer as TransferEvent,
} from "../generated/HandshakeSld/HandshakeSld"
import {
  Account, ApprovalForAllSld, ApprovalSld,
  DiscountSet,
  NameRegistered,
  NameRenewed,
  NameTransferred,
  PaymentSent,
  Registration, ResolverSetSld,
  Sld
} from "../generated/schema"
import {
  DiscountSet as DiscountSetEvent,
  PaymentSent as PaymentSentEvent,
  RegisterSld as RegisterSldEvent,
  RenewSld as RenewSldEvent
} from "../generated/SldRegistrationManager/SldRegistrationManager";
import { Address, BigInt, ByteArray, Bytes, crypto, log } from "@graphprotocol/graph-ts";
import {
  byteArrayFromHex,
  concat,
  createEventID,
  createOrLoadSld,
  ETH_NODE,
  ROOT_NODE,
  uint256ToByteArray
} from "./utils";

export function handleRegisterSld(event: RegisterSldEvent): void {
  let label = event.params._label;
  let labelHash = crypto.keccak256(ByteArray.fromUTF8(label));
  let parentHash= event.params._tldNamehash;
  let nameHash = crypto.keccak256(concat(parentHash, labelHash));

  // TODO: call owner() on the contract
  let account = new Account(event.transaction.from.toHex());
  account.save();

  let sld = createOrLoadSld(nameHash.toHex());
  sld.labelName = label;
  sld.labelhash = Bytes.fromByteArray(labelHash);
  sld.parent = parentHash.toHex();
  // bind the contract by the address that emitted the event
  // get the full domain name from contract function
  let handshakeSld = HandshakeSld.bind(Address.fromString("0x7963bfa8f8f914b9776ac6259a8c39965d26f42f"));
  sld.name = handshakeSld.name1(Bytes.fromByteArray(nameHash));
  sld.owner = account.id;
  sld.registrant = account.id;
  sld.createdAt = event.block.timestamp;
  sld.expiryDate = event.params._expiry;
  sld.save();

  let registration = new Registration(nameHash.toHex());
  registration.domain = sld.id;
  registration.registrationDate = event.block.timestamp;
  registration.expiryDate = event.params._expiry;
  registration.registrant = account.id;
  registration.labelName = label;
  registration.save();

  let registrationEvent = new NameRegistered(createEventID(event));
  registrationEvent.registration = registration.id;
  registrationEvent.blockNumber = event.block.number.toI32();
  registrationEvent.transactionID = event.transaction.hash;
  registrationEvent.registrant = account.id;
  registrationEvent.expiryDate = event.params._expiry;
  registrationEvent.save();
}

export function handleRenewSld(event: RenewSldEvent): void {
  let label = event.params._label;
  let labelHash = crypto.keccak256(ByteArray.fromUTF8(label));
  let parentHash= event.params._tldNamehash;
  let nameHash = crypto.keccak256(concat(parentHash, labelHash));

  let sld = Sld.load(nameHash.toHex())!;
  sld.expiryDate = event.params._expiry;
  sld.save();

  let registration = Registration.load(nameHash.toHex())!;
  registration.expiryDate = event.params._expiry;
  registration.save();

  let registrationEvent = new NameRenewed(createEventID(event));
  registrationEvent.registration = registration.id;
  registrationEvent.blockNumber = event.block.number.toI32();
  registrationEvent.transactionID = event.transaction.hash;
  registrationEvent.expiryDate = event.params._expiry;
  registrationEvent.save();
}

export function handleTransferSld(event: TransferEvent): void {
  let account = new Account(event.params.to.toHex());
  account.save();

  // TODO: GET TOKEN ID RIGHT
  let labelHash = uint256ToByteArray(event.params.tokenId);
  // let nameHash = labelHash.toHex();
  let nameHash = event.params.tokenId.toHex();

  let registration = Registration.load(nameHash)!;
  if (registration == null) return;
  registration.registrant = account.id;
  registration.save();

  let sld = Sld.load(nameHash)!;
  sld.registrant = account.id;
  sld.save();

  let registrationEvent = new NameTransferred(createEventID(event));
  registrationEvent.registration = nameHash;
  registrationEvent.blockNumber = event.block.number.toI32();
  registrationEvent.transactionID = event.transaction.hash;
  registrationEvent.newOwner = account.id;
  registrationEvent.save();
}

export function handleResolverSetSld(event: ResolverSetEvent): void {
  let entity = new ResolverSetSld(createEventID(event))
  entity._nftNamehash = event.params._nftNamehash
  entity._resolver = event.params._resolver

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePaymentSent(event: PaymentSentEvent): void {
  let entity = new PaymentSent(createEventID(event))
  entity._to = event.params._to
  entity._amount = event.params._amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDiscountSet(event: DiscountSetEvent): void {
  let entity = new DiscountSet(createEventID(event))
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

export function handleApprovalSld(event: ApprovalEvent): void {
  let entity = new ApprovalSld(createEventID(event))
  entity.owner = event.params.owner
  entity.approved = event.params.approved
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleApprovalForAllSld(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAllSld(createEventID(event))
  entity.owner = event.params.owner
  entity.operator = event.params.operator
  entity.approved = event.params.approved

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

