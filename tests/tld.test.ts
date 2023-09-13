import { afterAll, assert, beforeAll, clearStore, describe, test } from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes, log } from "@graphprotocol/graph-ts"
import { handleAllowedTldMintUpdate, handleEnabledSet, handleTldClaimed } from "../src/tld"
import {
  createAllowedTldMintUpdateEvent,
  createEnabledSetEvent,
  createTldClaimedEvent
} from "./tld-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Test TldClaimed", () => {
  beforeAll(() => {
    let claimant = Address.fromString("0x0000000000000000000000000000000000000001")
    let tokenId = BigInt.fromString("66853817334611902194238164484889819180315942402426128563245745834960013477038");
    let label = "eth";
    let newTldClaimedEvent = createTldClaimedEvent(claimant, tokenId, label)
    handleTldClaimed(newTldClaimedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("TldClaimed", () => {
    assert.entityCount("Tld", 1)
    assert.entityCount("TldClaimed", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Tld",
      "0x93cdeb708b7545dc668eb9280176169d1c33cfd8ed6f04690a0bcc88a93fc4ae",
      "name",
      "eth"
    )
    assert.fieldEquals(
      "Tld",
      "0x93cdeb708b7545dc668eb9280176169d1c33cfd8ed6f04690a0bcc88a93fc4ae",
      "labelName",
      "eth"
    )
    assert.fieldEquals(
      "Tld",
      "0x93cdeb708b7545dc668eb9280176169d1c33cfd8ed6f04690a0bcc88a93fc4ae",
      "labelhash",
      "0x4f5b812789fc606be1b3b16908db13fc7a9adf7ca72641f84d75b47069d3d7f0"
    )

    // assertions for TldClaimed event
    assert.fieldEquals(
      "TldClaimed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "labelName",
      "eth"
    )
    assert.fieldEquals(
      "TldClaimed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "labelhash",
      "0x4f5b812789fc606be1b3b16908db13fc7a9adf7ca72641f84d75b47069d3d7f0"
    )
    assert.fieldEquals(
      "TldClaimed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "claimDate",
      "1"
    )
    assert.fieldEquals(
      "TldClaimed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tld",
      "0x93cdeb708b7545dc668eb9280176169d1c33cfd8ed6f04690a0bcc88a93fc4ae"
    )
    assert.fieldEquals(
      "TldClaimed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "claimant",
      "0x0000000000000000000000000000000000000001",
    )
  })
})

describe("Test AllowedTldMintUpdate", () => {
  beforeAll(() => {
    let _claimant = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let _manager = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let _label = "Example string value"
    let newAllowedTldMintUpdateEvent = createAllowedTldMintUpdateEvent(
      _claimant,
      _manager,
      _label
    )
    handleAllowedTldMintUpdate(newAllowedTldMintUpdateEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AllowedTldMintUpdate created and stored", () => {
    assert.entityCount("AllowedTldMintUpdate", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AllowedTldMintUpdate",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_claimant",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AllowedTldMintUpdate",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_manager",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AllowedTldMintUpdate",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_label",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})

describe("Test EnabledSet", () => {
  beforeAll(() => {
    let _tokenNamehash = Bytes.fromHexString("0x4f5b812789fc606be1b3b16908db13fc7a9adf7ca72641f84d75b47069d3d7f0");
    let _enabled = true;
    let newEnabledSetEvent = createEnabledSetEvent(_tokenNamehash, _enabled)
    handleEnabledSet(newEnabledSetEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("EnabledSet created and stored", () => {
    assert.entityCount("EnabledSet", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "EnabledSet",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_tokenNamehash",
      "0x4f5b812789fc606be1b3b16908db13fc7a9adf7ca72641f84d75b47069d3d7f0"
    )
    assert.fieldEquals(
      "EnabledSet",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_enabled",
      "true"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})

