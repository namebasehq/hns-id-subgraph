import { afterAll, assert, beforeAll, clearStore, describe, test } from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes, log } from "@graphprotocol/graph-ts"
import { handleTransfer } from "../src/handshake-tld"
import {
  createTldClaimedEvent
} from "./tld-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Test TldClaimed", () => {
  beforeAll(() => {

  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

})

