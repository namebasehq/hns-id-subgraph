import { afterAll, assert, beforeAll, clearStore, describe, test, createMockedFunction, logStore } from "matchstick-as/assembly/index"
import { Address, BigInt, ByteArray, Bytes, ethereum } from "@graphprotocol/graph-ts"
import { handleRegisterSld, handleSldApproval } from "../src/sld"
import { createApprovalEvent, createRegisterSldEvent } from "./sld-utils"
import { HandshakeSld } from "../generated/HandshakeSld/HandshakeSld";

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Test SldApproval", () => {
  beforeAll(() => {
    let owner = Address.fromString("0x0000000000000000000000000000000000000001")
    let approved = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let tokenId = BigInt.fromI32(234)
    let newApprovalEvent = createApprovalEvent(owner, approved, tokenId)
    handleSldApproval(newApprovalEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Approval created and stored", () => {
    assert.entityCount("SldApproval", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "SldApproval",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "owner",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "SldApproval",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "approved",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "SldApproval",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tokenId",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})

describe("Test RegisterSld", () => {
  beforeAll(() => {
    let _tldNamehash = Bytes.fromHexString("0x93cdeb708b7545dc668eb9280176169d1c33cfd8ed6f04690a0bcc88a93fc4ae");
    let _secret = Bytes.fromUTF8("shhhh");
    let _label = "test";
    let _expiry = BigInt.fromI32(1234567890);

    // mock the call to SLD.name()
    let contractAddress = Address.fromString("0x7963bfa8f8f914b9776ac6259a8c39965d26f42f")
    let expectedResult = 'test.eth'
    let nameHash = ByteArray.fromHexString("0xeb4f647bea6caa36333c816d7b46fdcb05f9466ecacc140ea8c66faf15b3d9f1");
    let bytesParam = Bytes.fromByteArray(nameHash);
    createMockedFunction(contractAddress, 'name', 'name(bytes32):(string)')
      .withArgs([ethereum.Value.fromFixedBytes(bytesParam)])
      .returns([ethereum.Value.fromString(expectedResult)])

    let registerSldEvent = createRegisterSldEvent(
      _tldNamehash,
      _secret,
      _label,
      _expiry,
    )
    handleRegisterSld(registerSldEvent)
  })

  afterAll(() => {
    clearStore()
  })

  test("RegisterSld creates Domain/Account/Registration", () => {
    let contractAddress = Address.fromString("0x7963bfa8f8f914b9776ac6259a8c39965d26f42f")
    let expectedResult = 'test.eth'
    let nameHash = ByteArray.fromHexString("0xeb4f647bea6caa36333c816d7b46fdcb05f9466ecacc140ea8c66faf15b3d9f1");
    let bytesParam = Bytes.fromByteArray(nameHash);
    let handshakeSld = HandshakeSld.bind(contractAddress);
    let result = handshakeSld.name1(bytesParam)
    assert.equals(ethereum.Value.fromString(expectedResult), ethereum.Value.fromString(result))

    assert.entityCount("Domain", 1)
    assert.entityCount("Account", 1)
    assert.entityCount("Registration", 1)
    assert.fieldEquals(
      "Domain",
      "0xeb4f647bea6caa36333c816d7b46fdcb05f9466ecacc140ea8c66faf15b3d9f1",
      "name",
      "test.eth"
    )
    assert.fieldEquals(
      "Domain",
      "0xeb4f647bea6caa36333c816d7b46fdcb05f9466ecacc140ea8c66faf15b3d9f1",
      "labelName",
      "test"
    )
    assert.fieldEquals(
      "Domain",
      "0xeb4f647bea6caa36333c816d7b46fdcb05f9466ecacc140ea8c66faf15b3d9f1",
      "labelhash",
      "0x9c22ff5f21f0b81b113e63f7db6da94fedef11b2119b4088b89664fb9a3cb658"
    )
    assert.fieldEquals(
      "Domain",
      "0xeb4f647bea6caa36333c816d7b46fdcb05f9466ecacc140ea8c66faf15b3d9f1",
      "parent",
      "0x93cdeb708b7545dc668eb9280176169d1c33cfd8ed6f04690a0bcc88a93fc4ae"
    )
    assert.fieldEquals(
      "Domain",
      "0xeb4f647bea6caa36333c816d7b46fdcb05f9466ecacc140ea8c66faf15b3d9f1",
      "createdAt",
      "1"
    )
    // TODO: owner and registrant are not set correctly
    // assert.fieldEquals(
    //   "Domain",
    //   "0xeb4f647bea6caa36333c816d7b46fdcb05f9466ecacc140ea8c66faf15b3d9f1",
    //   "owner",
    //   "0x0000000000000000000000000000000000000001",
    // )
    // assert.fieldEquals(
    //   "Domain",
    //   "0xeb4f647bea6caa36333c816d7b46fdcb05f9466ecacc140ea8c66faf15b3d9f1",
    //   "registrant",
    //   "0x0000000000000000000000000000000000000001",
    // )
    assert.fieldEquals(
      "Domain",
      "0xeb4f647bea6caa36333c816d7b46fdcb05f9466ecacc140ea8c66faf15b3d9f1",
      "expiryDate",
      "1234567890"
    )
  })
})
