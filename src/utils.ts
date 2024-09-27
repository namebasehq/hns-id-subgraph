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

export function padHex(hexString: string, padding: i32): string {
  let cleanHex = hexString.startsWith('0x') ? hexString.slice(2) : hexString;

  // Convert to f64 explicitly
  let paddingLength: i32 = (padding) * i32(2.0);
  
  let paddedHex = cleanHex.padStart(paddingLength, '0');
  
  return '0x' + paddedHex;
}


export function createOrUpdateResolver(
  resolverId: string, 
  addr: string, 
  tokenId: BigInt, 
  now: BigInt, 
  resolverAddress: string
): void {
  // Try to load the existing Resolver entity
  let resolverEntity = Resolver.load(resolverId);

  // If it doesn't exist, create a new one
  if (resolverEntity == null) {
    resolverEntity = new Resolver(resolverId);
    resolverEntity.version = BigInt.fromI32(0);  // Initialize with default version number
  }

  // Assign resolverAddress only if it's not an empty string
  if (resolverAddress != "") {
    resolverEntity.address = resolverAddress;
  }

  // Update other fields
  resolverEntity.tokenId = tokenId;
  resolverEntity.save();

  // Initialize or update addresses for all EVM coin types
  const defaultCoinTypes = [60, 614, 9006, 966, 9001, 9000, 9005];
  for (let i = 0; i < defaultCoinTypes.length; i++) {
    let coinType = defaultCoinTypes[i];
    let addressId = resolverId.concat("-").concat(coinType.toString());

    // Try to load existing address entity
    let addressEntity = Address.load(addressId);

    // If it doesn't exist, create a new one
    if (addressEntity == null) {
      addressEntity = new Address(addressId);
      addressEntity.cointype = BigInt.fromI32(coinType);
      addressEntity.resolver = resolverEntity.id;
      addressEntity.tokenId = tokenId;
      addressEntity.createdAt = now;
    }

    // Update fields (whether new or existing entity)
    addressEntity.address = addr;
    addressEntity.updatedAt = now;
    addressEntity.save();
  }
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

export function getResolverId(node: string): string {

  let tld = Tld.load(node);
  let sld = Sld.load(node);

  if (tld) return node.concat("-").concat(tld.resolverVersion.toString());
  if (sld) return node.concat("-").concat(sld.resolverVersion.toString());


  log.warning("getResolverId: No TLD or SLD found for node: {}", [node]);

  return "";

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

