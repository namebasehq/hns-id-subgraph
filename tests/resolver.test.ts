import { assert, describe, test, beforeAll, afterAll, clearStore } from "matchstick-as/assembly/index";
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts";
import { 
  handleAddressChanged,
  handleContenthashChanged,
  handleDNSRecordChanged,
  handleDNSRecordDeleted,
  handleDNSZonehashChanged,
  handleTextChanged,
  handleUpdatedDelegate
} from "../src/default-resolver";
import { createAddressChangedEvent, createContenthashChangedEvent, createDNSRecordChangedEvent, createDNSRecordDeletedEvent, createDNSZonehashChangedEvent, createTextChangedEvent, createUpdatedDelegateEvent } from "./resolver-utils";

describe("Resolver entity assertions", () => {
  
  beforeAll(() => {
    // Initialize with default values or mock events
  });

  afterAll(() => {
    clearStore();
  });

  test("AddressChanged handler works correctly", () => {
    // Mock event with three arguments
    let mockEvent = createAddressChangedEvent(Bytes.fromHexString("0x123") as Bytes, BigInt.fromI32(60), Bytes.fromHexString("0x456") as Bytes);
    
    // Handle the mock event
    handleAddressChanged(mockEvent);
    
    // Assertions
    // Replace 'yourEntityID' with the actual entity ID, and 'expectedValue' with the value you expect to be set in the "Address" entity
    assert.fieldEquals("Address", "yourEntityID", "yourAddressField", "expectedValue");
    assert.entityCount("Address", 1);
    assert.entityCount("ResolverHistory", 1);
  });
  
  
});
