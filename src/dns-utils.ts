// src/utils.ts
import { Bytes, BigInt, log } from '@graphprotocol/graph-ts';
import { toPaddedHexString } from './utils';

// Function to decode the length-prefixed name in DNS wire format
function decodeNameLength(recordBytes: Bytes, offset: i32): i32 {
    let position = offset;
    while (true) {
      let labelLength = recordBytes[position];
      if (labelLength == 0) {
        break; // End of name field
      }
      position += 1 + labelLength; // Move past the label length and the label itself
    }
    return position + 1; // Move past the null byte that marks the end of the name
  }
  
  // Function to decode the DNS wire format TTL field
  export function extractTTL(recordBytes: Bytes): BigInt {
    // Start at the beginning of the record
    let nameEnd = decodeNameLength(recordBytes, 0); // Get the end of the variable-length name
    
    // Type is 2 bytes after the name
    let typeStart = nameEnd;
    let classStart = typeStart + 2; // Class field starts 2 bytes after type
    let ttlStart = classStart + 2;  // TTL field starts 2 bytes after class
  
    // Extract the 4 bytes for TTL as Uint8Array
    let ttlBytesArray = recordBytes.subarray(ttlStart, ttlStart + 4);
  
    // Convert Uint8Array to Bytes
    let ttlBytes = Bytes.fromUint8Array(ttlBytesArray);
  
    // Reverse the bytes to handle big-endian format
    let ttlReversed = Bytes.fromUint8Array(ttlBytesArray.reverse());
  
    // Convert the TTL bytes (big-endian) to BigInt
    return BigInt.fromUnsignedBytes(ttlReversed);
  }


  export function decodeName(nameBytes: Bytes): string {
    let decodedName = "";
    let i = 0;
    
    // Loop through the bytes
    while (i < nameBytes.length) {
      // Get the length of the next label
      let labelLength = nameBytes[i];
      
      // If label length is 0, we've reached the end of the domain
      if (labelLength == 0) {
        break;
      }
      
      // Extract the label by converting the byte values to characters
      let label = "";
      for (let j = 1; j <= i32(labelLength); j++) {
        label += String.fromCharCode(nameBytes[i + j]);
      }
      
      // Append a dot if this is not the first label
      if (decodedName.length > 0) {
        decodedName += ".";
      }
      
      decodedName += label;
      
      // Move the index to the next label
      i += labelLength + 1;
    }
    
    return decodedName;
  }
    

// Function to parse the DNS record data
export function parseRecordData(recordBytes: Bytes): string {
  // Example parsing logic, modify based on your actual needs
  return toPaddedHexString(recordBytes); // Replace with your actual decoding logic
}

export function decodeDNSName(nameBytes: Bytes): string {
    let labels: Array<string> = new Array<string>();
    let pos: i32 = 0;
  
    while (pos < nameBytes.length) {
      let length: u8 = nameBytes[pos];
      if (length == 0) {
        break; // End of the name
      }
  
      pos += 1;
  
      // Ensure we don't exceed the byte array
      if (pos + length > nameBytes.length) {
        // Malformed name, return as hex string for debugging
        log.warning("Malformed DNS name: exceeds byte array length.", []);
        return toPaddedHexString(nameBytes);
      }
  
      // Extract the label bytes
      let labelBytes = nameBytes.slice(pos, pos + length);
      let label = String.UTF8.decode(labelBytes.buffer); // Correctly decode to string
  
  
      labels.push(label);
      pos += length;
    }
  
    let decodedName = labels.join(".");
  
    return decodedName;
  }

  export function decodeDNSData(wireFormat: string): string {
    // Remove the '0x' prefix if present
    let hexString = wireFormat.startsWith("0x") ? wireFormat.slice(2) : wireFormat;
  
    // Split the string into byte pairs manually
    let bytes: Array<u8> = [];
    for (let i = 0; i < hexString.length; i += 2) {
      let byte = u8(parseInt(hexString.substr(i, 2), 16));
      bytes.push(byte);
    }
  
    // Skipping the domain name, which is a sequence of length-prefixed labels ending with 0x00
    let index: i32 = 0;
    while (bytes[index] !== 0x00) {
      let labelLength: u8 = bytes[index];
      index += i32(labelLength) + 1; // Move to the next label
    }
    index++; // Skip the 0x00 at the end of the domain name
  
    // Read the type (2 bytes)
    let type: u16 = (bytes[index] << 8) | bytes[index + 1];
    index += 2;
  
    // Read the class (2 bytes) - skipping it
    index += 2;
  
    // Read the TTL (4 bytes) - skipping it
    index += 4;
  
    // Read the RDATA length (2 bytes)
    let rdataLength: u16 = (bytes[index] << 8) | bytes[index + 1];
    index += 2;
  
    // Extract the RDATA based on the length
    let rdata: Array<u8> = bytes.slice(index, index + i32(rdataLength)) as Array<u8>;
  
    // Process based on the DNS record type
    switch (type) {
      case 1: // A record (IPv4 address)
        return rdata.map<string>((byte: u8): string => byte.toString()).join('.');
      
      case 28: // AAAA record (IPv6 address)
        return rdata.map<string>((byte: u8, i: i32): string => (i % 2 === 0 && i > 0 ? ":" : "") + byte.toString(16).padStart(2, "0")).join('');
  
      case 5: // CNAME (Canonical Name)
      case 2: // NS (Name Server)
        return decodeLabels(rdata as Array<u8>);
  
      case 15: // MX (Mail Exchange)
        let preference: u16 = (rdata[0] << 8) | rdata[1];
        let exchange = decodeLabels(rdata.slice(2) as Array<u8>);
        return `{"preference":${preference},"exchange":"${exchange}"}`;
  
      case 43: // DS (Delegation Signer)
        return `{"keyTag":${(rdata[0] << 8) | rdata[1]},"algorithm":${rdata[2]},"digestType":${rdata[3]},"digest":"${rdata.slice(4).map<string>((byte: u8): string => byte.toString(16).padStart(2, "0")).join('')}"}`;
  
      case 52: // TLSA (Transport Layer Security Authentication)
        return `{"usage":${rdata[0]},"selector":${rdata[1]},"matchingType":${rdata[2]},"certificate":"${rdata.slice(3).map<string>((byte: u8): string => byte.toString(16).padStart(2, "0")).join('')}"}`;
  
      case 16: // TXT (Text)
        return `["${rdata.slice(1).map<string>((byte: u8): string => String.fromCharCode(byte)).join('')}"]`;
  
      default:
        return `${type}: Unsupported or unknown record type`;
    }
  }
  
  // Helper function to decode labels (domain names)
  function decodeLabels(bytes: Array<u8>): string {
    let result: string[] = [];
    let index: i32 = 0;
    while (index < bytes.length) {
      let length = bytes[index];
      if (length === 0) break;
      index++;
      result.push(bytes.slice(index, index + length).map<string>((byte: u8): string => String.fromCharCode(byte)).join(''));
      index += length;
    }
    return result.join('.');
  }

  export function getResourceType(resource: BigInt|null): string {

    if (!resource) return "UNKNOWN";
    let resourceNumber = resource.toI32();
    if (resourceNumber == 1) return "A";
    if (resourceNumber == 5) return "CNAME";
    if (resourceNumber == 15) return "MX";
    if (resourceNumber == 2) return "NS";
    if (resourceNumber == 16) return "TXT";
    if (resourceNumber == 28) return "AAAA";
    if (resourceNumber == 43) return "DS";
    if (resourceNumber == 52) return "TLSA";
   
    return "UNKNOWN";
  }
  

  