import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import { AddrChanged } from "../generated/schema"
import { AddrChanged as AddrChangedEvent } from "../generated/DefaultResolver/DefaultResolver"
import { handleAddrChanged } from "../src/default-resolver"
import { createAddrChangedEvent } from "./default-resolver-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let node = Bytes.fromI32(1234567890)
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
      "1234567890"
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
