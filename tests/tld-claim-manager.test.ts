import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { AllowedTldMintUpdate } from "../generated/schema"
import { AllowedTldMintUpdate as AllowedTldMintUpdateEvent } from "../generated/TldClaimManager/TldClaimManager"
import { handleAllowedTldMintUpdate } from "../src/tld-claim-manager"
import { createAllowedTldMintUpdateEvent } from "./tld-claim-manager-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
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
