import { afterAll, assert, beforeAll, clearStore, describe, test } from "matchstick-as/assembly/index"
import { Address, Bytes } from "@graphprotocol/graph-ts"
import { handleAddrChanged } from "../src/resolver"
import { createAddrChangedEvent } from "./resolver-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let node = Bytes.fromHexString("0x4f5b812789fc606be1b3b16908db13fc7a9adf7ca72641f84d75b47069d3d7f0")
    let a = Address.fromString("0x0000000000000000000000000000000000000001")
    let newAddrChangedEvent = createAddrChangedEvent(node, a)
    handleAddrChanged(newAddrChangedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AddrChanged created and stored", () => {
    assert.entityCount("AddrChanged", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AddrChanged",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "node",
      "0x4f5b812789fc606be1b3b16908db13fc7a9adf7ca72641f84d75b47069d3d7f0"
    )
    assert.fieldEquals(
      "AddrChanged",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "a",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
