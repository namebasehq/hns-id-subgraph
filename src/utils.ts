// Import types and APIs from graph-ts
import { BigInt, ByteArray, ethereum, log } from "@graphprotocol/graph-ts";
import { Account, Address, Resolver, ResolverHistory, Sld, Tld } from "../generated/schema";

// using TX hash + log index
export function createEventID(event: ethereum.Event): string {
  return event.transaction.hash
    .toHex()
    .concat("-")
    .concat(event.logIndex.toString());
}

// using block + log index
export function createEventIDfromBlock(event: ethereum.Event): string {
  return event.block.number
    .toString()
    .concat("-")
    .concat(event.logIndex.toString());
}
export const ETH_NODE =
  "93cdeb708b7545dc668eb9280176169d1c33cfd8ed6f04690a0bcc88a93fc4ae";
export const ROOT_NODE =
  "0x0000000000000000000000000000000000000000000000000000000000000000";
export const EMPTY_ADDRESS = "0x0000000000000000000000000000000000000000";
export const EMPTY_ADDRESS_BYTEARRAY = new ByteArray(20);

// Helper for concatenating two byte arrays
export function concat(a: ByteArray, b: ByteArray): ByteArray {
  let out = new Uint8Array(a.length + b.length);
  for (let i = 0; i < a.length; i++) {
    out[i] = a[i];
  }
  for (let j = 0; j < b.length; j++) {
    out[a.length + j] = b[j];
  }
  // return out as ByteArray
  return changetype<ByteArray>(out);
}

export function createOrUpdateResolver(resolverId: string, blockTimestamp: BigInt, addr: string): void {
  let resolverEntity = new Resolver(resolverId);
  resolverEntity.save();

  // Initialize addresses for all EVM coin types
  const defaultCoinTypes = [60, 614, 9006, 966, 9001, 9000, 9005];
  for (let i = 0; i < defaultCoinTypes.length; i++) {
    let coinType = defaultCoinTypes[i];
    let addressId = resolverId.concat("-").concat(coinType.toString());
    let addressEntity = new Address(addressId);
    addressEntity.cointype = BigInt.fromI32(coinType);
    addressEntity.address = addr;
    addressEntity.resolver = resolverEntity.id;
    addressEntity.save();
  }

  // Create ResolverHistory Entity
  let resolverHistoryId = resolverId.concat("-").concat(blockTimestamp.toString());
  let resolverHistoryEntity = new ResolverHistory(resolverHistoryId);
  resolverHistoryEntity.resolver = resolverEntity.id;
  resolverHistoryEntity.changeType = "added";
  resolverHistoryEntity.changedAt = blockTimestamp;
  resolverHistoryEntity.save();
}


export function byteArrayFromHex(s: string): ByteArray {
  if (s.length % 2 !== 0) {
    throw new TypeError("Hex string must have an even number of characters");
  }
  let out = new Uint8Array(s.length / 2);
  for (var i = 0; i < s.length; i += 2) {
    out[i / 2] = parseInt(s.substring(i, i + 2), 16) as u32;
  }
  return changetype<ByteArray>(out);
}

export function uint256ToByteArray(i: BigInt): ByteArray {
  let hex = i
    .toHex()
    .slice(2)
    .padStart(64, "0");
  return byteArrayFromHex(hex);
}

export function createOrLoadAccount(address: string): Account {
  let account = Account.load(address);
  if (account == null) {
    account = new Account(address);
  }
  return account;
}

export function createOrLoadSld(node: string): Sld {
  let sld = Sld.load(node);
  if (sld == null) {
    sld = new Sld(node);
  }
  return sld;
}

export function createOrLoadTld(node: string): Tld {
  let tld = Tld.load(node);
  if (tld == null) {
    tld = new Tld(node);
  }
  return tld;
}

export function checkValidLabel(name: string): boolean {
  for (let i = 0; i < name.length; i++) {
    let c = name.charCodeAt(i);
    if (c === 0) {
      log.warning("Invalid label '{}' contained null byte. Skipping.", [name]);
      return false;
    } else if (c === 46) {
      log.warning(
        "Invalid label '{}' contained separator char '.'. Skipping.",
        [name]
      );
      return false;
    }
  }

  return true;
}

