import { afterAll, assert, beforeAll, clearStore, describe, test, createMockedFunction, logStore } from "matchstick-as/assembly/index"
import { Address, BigInt, ByteArray, Bytes, ethereum, log } from "@graphprotocol/graph-ts"
import { handleTransfer } from "../src/handshake-sld"
import { createApprovalEvent, createRegisterSldEvent, createRenewSldEvent, createTransferSldEvent } from "./sld-utils"
import { HandshakeSld } from "../generated/HandshakeSld/HandshakeSld";

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Test SldApproval", () => {
  beforeAll(() => {

  })

  afterAll(() => {
    clearStore()
  })

  })
