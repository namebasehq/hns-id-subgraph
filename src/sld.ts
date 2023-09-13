import {
  HandshakeSld,
  ResolverSet as ResolverSetEvent,
  Transfer as TransferEvent,
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
} from "../generated/HandshakeSld/HandshakeSld"
import {
  Account,
  DiscountSet,
  Domain,
  PaymentSent,
  Registration,
  RenewSld, SldApproval, SldApprovalForAll,
  SldResolverSet,
  SldTransfer, Tld
} from "../generated/schema"
import {
  DiscountSet as DiscountSetEvent,
  PaymentSent as PaymentSentEvent,
  RegisterSld as RegisterSldEvent,
  RenewSld as RenewSldEvent
} from "../generated/SldRegistrationManager/SldRegistrationManager";
import { Address, ByteArray, Bytes, crypto } from "@graphprotocol/graph-ts";
import { concat, createEventID, createOrLoadDomain } from "./utils";

export function handleRegisterSld(event: RegisterSldEvent): void {
  let label = event.params._label;
  let labelHash = crypto.keccak256(ByteArray.fromUTF8(label));
  let parentHash= event.params._tldNamehash;
  let nameHash = crypto.keccak256(concat(parentHash, labelHash));

  let account = new Account(event.transaction.from.toHex());
  account.save();

  let domain = createOrLoadDomain(nameHash.toHex());
  domain.labelName = label;
  domain.labelhash = Bytes.fromByteArray(labelHash);
  domain.parent = parentHash.toHex();
  // bind the contract by the address that emitted the event
  // get the full domain name from contract function
  let handshakeSld = HandshakeSld.bind(Address.fromString("0x7963bfa8f8f914b9776ac6259a8c39965d26f42f"));
  domain.name = handshakeSld.name1(Bytes.fromByteArray(nameHash));
  domain.owner = account.id;
  domain.registrant = account.id;
  domain.createdAt = event.block.timestamp;
  domain.expiryDate = event.params._expiry;
  domain.save();

  let registration = new Registration(nameHash.toHex());
  registration.domain = domain.id;
  registration.registrationDate = event.block.timestamp;
  registration.expiryDate = event.params._expiry;
  registration.registrant = account.id;
  registration.labelName = label;
  registration.save();

  // let registrationEvent = new NameRegistered(createEventID(event));
  // registrationEvent.registration = registration.id;
  // registrationEvent.blockNumber = event.block.number.toI32();
  // registrationEvent.transactionID = event.transaction.hash;
  // registrationEvent.registrant = account.id;
  // registrationEvent.expiryDate = event.params.expires;
  // registrationEvent.save();
}

export function handleRenewSld(event: RenewSldEvent): void {
  let entity = new RenewSld(createEventID(event))
  entity._tldNamehash = event.params._tldNamehash
  entity._label = event.params._label
  entity._expiry = event.params._expiry

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

export function handleSldResolverSet(event: ResolverSetEvent): void {
  let entity = new SldResolverSet(createEventID(event))
  entity._nftNamehash = event.params._nftNamehash
  entity._resolver = event.params._resolver

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSldTransfer(event: TransferEvent): void {
  let entity = new SldTransfer(createEventID(event))
  entity.from = event.params.from
  entity.to = event.params.to
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSldApproval(event: ApprovalEvent): void {
  let entity = new SldApproval(createEventID(event))
  entity.owner = event.params.owner
  entity.approved = event.params.approved
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSldApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new SldApprovalForAll(createEventID(event))
  entity.owner = event.params.owner
  entity.operator = event.params.operator
  entity.approved = event.params.approved

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

