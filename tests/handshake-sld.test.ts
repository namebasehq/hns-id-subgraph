import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import { RoyaltyPayoutAddressSet } from "../generated/schema"
import { RoyaltyPayoutAddressSet as RoyaltyPayoutAddressSetEvent } from "../generated/HandshakeSld/HandshakeSld"
import { handleRoyaltyPayoutAddressSet } from "../src/handshake-sld"
import { createRoyaltyPayoutAddressSetEvent } from "./handshake-sld-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let _nftNamehash = Bytes.fromI32(1234567890)
    let _payoutAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newRoyaltyPayoutAddressSetEvent = createRoyaltyPayoutAddressSetEvent(
      _nftNamehash,
      _payoutAddress
    )
    handleRoyaltyPayoutAddressSet(newRoyaltyPayoutAddressSetEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("RoyaltyPayoutAddressSet created and stored", () => {
    assert.entityCount("RoyaltyPayoutAddressSet", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "RoyaltyPayoutAddressSet",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_nftNamehash",
      "1234567890"
    )
    assert.fieldEquals(
      "RoyaltyPayoutAddressSet",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_payoutAddress",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
