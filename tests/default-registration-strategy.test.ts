import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Bytes, BigInt, Address } from "@graphprotocol/graph-ts"
import { EnabledSet } from "../generated/schema"
import { EnabledSet as EnabledSetEvent } from "../generated/DefaultRegistrationStrategy/DefaultRegistrationStrategy"
import { handleEnabledSet } from "../src/default-registration-strategy"
import { createEnabledSetEvent } from "./default-registration-strategy-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let _tokenNamehash = Bytes.fromI32(1234567890)
    let _enabled = false;
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
      "1234567890"
    )
    assert.fieldEquals(
      "EnabledSet",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_enabled",
      "false"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
