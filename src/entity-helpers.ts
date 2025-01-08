import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import { SLDEvent, TLDEvent, PremiumNameEvent, ReservedNameEvent, TextRecordEvent, AddressRecordEvent, DNSRecordEvent } from "../generated/schema";


export function createSLDEvent(tokenId: BigInt, txHash: Bytes, eventTimestamp: BigInt): void {
  let uniqueEventId = tokenId.toString() + "-" + eventTimestamp.toString();
  let sldEvent = new SLDEvent(uniqueEventId);
  
  sldEvent.tokenId = tokenId;
  sldEvent.txHash = txHash;
  sldEvent.eventTimestamp = eventTimestamp;
  
  sldEvent.save();
}

export function createTLDEvent(tokenId: BigInt, txHash: Bytes, eventTimestamp: BigInt): void {
  let uniqueEventId = tokenId.toString() + "-" + eventTimestamp.toString();
  let tldEvent = new TLDEvent(uniqueEventId);
  
  tldEvent.tokenId = tokenId;
  tldEvent.txHash = txHash;
  tldEvent.eventTimestamp = eventTimestamp;
  
  tldEvent.save();
}


export function createPremiumNameEvent(tokenId: BigInt, txHash: Bytes, eventTimestamp: BigInt): void {
  let uniqueEventId = tokenId.toString() + "-" + eventTimestamp.toString();
  let premiumNameEvent = new PremiumNameEvent(uniqueEventId);
  
  premiumNameEvent.tokenId = tokenId;
  premiumNameEvent.txHash = txHash;
  premiumNameEvent.eventTimestamp = eventTimestamp;
  
  premiumNameEvent.save();
}

export function createReservedNameEvent(tokenId: BigInt, txHash: Bytes, eventTimestamp: BigInt): void {
  let uniqueEventId = tokenId.toString() + "-" + eventTimestamp.toString();
  let reservedNameEvent = new ReservedNameEvent(uniqueEventId);
  
  reservedNameEvent.tokenId = tokenId;
  reservedNameEvent.txHash = txHash;
  reservedNameEvent.eventTimestamp = eventTimestamp;
  
  reservedNameEvent.save();
}

export function createTextRecordEvent(tokenId: BigInt, txHash: Bytes, eventTimestamp: BigInt): void {
  let uniqueEventId = tokenId.toString() + "-" + eventTimestamp.toString();
  let textRecordEvent = new TextRecordEvent(uniqueEventId);
  
  textRecordEvent.tokenId = tokenId;
  textRecordEvent.txHash = txHash;
  textRecordEvent.eventTimestamp = eventTimestamp;
  
  textRecordEvent.save();
}

export function createAddressRecordEvent(tokenId: BigInt, txHash: Bytes, eventTimestamp: BigInt): void {
  let uniqueEventId = tokenId.toString() + "-" + eventTimestamp.toString();
  let addressRecordEvent = new AddressRecordEvent(uniqueEventId);
  
  addressRecordEvent.tokenId = tokenId;
  addressRecordEvent.txHash = txHash;
  addressRecordEvent.eventTimestamp = eventTimestamp;
  
  addressRecordEvent.save();
}


export function createDNSRecordEvent(tokenId: BigInt, txHash: Bytes, eventTimestamp: BigInt): void {
  let uniqueEventId = tokenId.toString() + "-" + eventTimestamp.toString();
  let dnsRecordEvent = new DNSRecordEvent(uniqueEventId);
  
  dnsRecordEvent.tokenId = tokenId;
  dnsRecordEvent.txHash = txHash;
  dnsRecordEvent.eventTimestamp = eventTimestamp;
  
  dnsRecordEvent.save();
}
