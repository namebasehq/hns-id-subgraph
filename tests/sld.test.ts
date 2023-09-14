import { afterAll, assert, beforeAll, clearStore, describe, test, createMockedFunction, logStore } from "matchstick-as/assembly/index"
import { Address, BigInt, ByteArray, Bytes, ethereum, log } from "@graphprotocol/graph-ts"
import { handleApprovalSld, handleRegisterSld, handleRenewSld, handleTransferSld } from "../src/sld"
import { createApprovalEvent, createRegisterSldEvent, createRenewSldEvent, createTransferSldEvent } from "./sld-utils"
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
    handleApprovalSld(newApprovalEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Approval created and stored", () => {
    assert.entityCount("ApprovalSld", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ApprovalSld",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "owner",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ApprovalSld",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "approved",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ApprovalSld",
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
    // clearStore()
  })

  test("RegisterSld creates Sld/Account/Registration/NameRegistered", () => {
    let contractAddress = Address.fromString("0x7963bfa8f8f914b9776ac6259a8c39965d26f42f")
    let expectedResult = 'test.eth'
    let nameHash = ByteArray.fromHexString("0xeb4f647bea6caa36333c816d7b46fdcb05f9466ecacc140ea8c66faf15b3d9f1");
    let bytesParam = Bytes.fromByteArray(nameHash);
    let handshakeSld = HandshakeSld.bind(contractAddress);
    let result = handshakeSld.name1(bytesParam)
    assert.equals(ethereum.Value.fromString(expectedResult), ethereum.Value.fromString(result))

    assert.entityCount("Sld", 1)
    assert.entityCount("Account", 1)
    assert.entityCount("Registration", 1)
    assert.entityCount("NameRegistered", 1)

    // Sld
    assert.fieldEquals(
      "Sld",
      "0xeb4f647bea6caa36333c816d7b46fdcb05f9466ecacc140ea8c66faf15b3d9f1",
      "name",
      "test.eth"
    )
    assert.fieldEquals(
      "Sld",
      "0xeb4f647bea6caa36333c816d7b46fdcb05f9466ecacc140ea8c66faf15b3d9f1",
      "labelName",
      "test"
    )
    assert.fieldEquals(
      "Sld",
      "0xeb4f647bea6caa36333c816d7b46fdcb05f9466ecacc140ea8c66faf15b3d9f1",
      "labelhash",
      "0x9c22ff5f21f0b81b113e63f7db6da94fedef11b2119b4088b89664fb9a3cb658"
    )
    assert.fieldEquals(
      "Sld",
      "0xeb4f647bea6caa36333c816d7b46fdcb05f9466ecacc140ea8c66faf15b3d9f1",
      "parent",
      "0x93cdeb708b7545dc668eb9280176169d1c33cfd8ed6f04690a0bcc88a93fc4ae"
    )
    assert.fieldEquals(
      "Sld",
      "0xeb4f647bea6caa36333c816d7b46fdcb05f9466ecacc140ea8c66faf15b3d9f1",
      "createdAt",
      "1"
    )
    assert.fieldEquals(
      "Sld",
      "0xeb4f647bea6caa36333c816d7b46fdcb05f9466ecacc140ea8c66faf15b3d9f1",
      "owner",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
    )
    assert.fieldEquals(
      "Sld",
      "0xeb4f647bea6caa36333c816d7b46fdcb05f9466ecacc140ea8c66faf15b3d9f1",
      "registrant",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
    )
    assert.fieldEquals(
      "Sld",
      "0xeb4f647bea6caa36333c816d7b46fdcb05f9466ecacc140ea8c66faf15b3d9f1",
      "expiryDate",
      "1234567890"
    )

    // Account
    assert.fieldEquals(
      "Account",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
      "id",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
    )

    // Registration
    assert.fieldEquals(
      "Registration",
      "0xeb4f647bea6caa36333c816d7b46fdcb05f9466ecacc140ea8c66faf15b3d9f1",
      "domain",
      "0xeb4f647bea6caa36333c816d7b46fdcb05f9466ecacc140ea8c66faf15b3d9f1"
    )
    assert.fieldEquals(
      "Registration",
      "0xeb4f647bea6caa36333c816d7b46fdcb05f9466ecacc140ea8c66faf15b3d9f1",
      "registrationDate",
      "1"
    )
    assert.fieldEquals(
      "Registration",
      "0xeb4f647bea6caa36333c816d7b46fdcb05f9466ecacc140ea8c66faf15b3d9f1",
      "expiryDate",
      "1234567890"
    )
    assert.fieldEquals(
      "Registration",
      "0xeb4f647bea6caa36333c816d7b46fdcb05f9466ecacc140ea8c66faf15b3d9f1",
      "registrant",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a"
    )
    assert.fieldEquals(
      "Registration",
      "0xeb4f647bea6caa36333c816d7b46fdcb05f9466ecacc140ea8c66faf15b3d9f1",
      "labelName",
      "test"
    )

    // NameRegistered
    assert.fieldEquals(
      "NameRegistered",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "registration",
      "0xeb4f647bea6caa36333c816d7b46fdcb05f9466ecacc140ea8c66faf15b3d9f1"
    )
    assert.fieldEquals(
      "NameRegistered",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "blockNumber",
      "1"
    )
    assert.fieldEquals(
      "NameRegistered",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "transactionID",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a"
    )
    assert.fieldEquals(
      "NameRegistered",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "registrant",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a"
    )
    assert.fieldEquals(
      "NameRegistered",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "expiryDate",
      "1234567890"
    )
  })
})

describe("Test RenewSld", () => {
  beforeAll(() => {
    let _tldNamehash = Bytes.fromHexString("0x93cdeb708b7545dc668eb9280176169d1c33cfd8ed6f04690a0bcc88a93fc4ae");
    let _label = "test";
    let _expiry = BigInt.fromI32(1334567890);

    let renewSldEvent = createRenewSldEvent(
      _tldNamehash,
      _label,
      _expiry,
    )
    handleRenewSld(renewSldEvent)
  })

  afterAll(() => {
    // clearStore()
  })

  test("RenewSld updates Sld, creates NameRenewed", () => {

    assert.entityCount("Sld", 1)
    assert.entityCount("Registration", 1)
    assert.entityCount("NameRenewed", 1)

    // Sld
    assert.fieldEquals(
      "Sld",
      "0xeb4f647bea6caa36333c816d7b46fdcb05f9466ecacc140ea8c66faf15b3d9f1",
      "name",
      "test.eth"
    )
    assert.fieldEquals(
      "Sld",
      "0xeb4f647bea6caa36333c816d7b46fdcb05f9466ecacc140ea8c66faf15b3d9f1",
      "registrant",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
    )
    assert.fieldEquals(
      "Sld",
      "0xeb4f647bea6caa36333c816d7b46fdcb05f9466ecacc140ea8c66faf15b3d9f1",
      "expiryDate",
      "1334567890"
    )

    // Registration
    assert.fieldEquals(
      "Registration",
      "0xeb4f647bea6caa36333c816d7b46fdcb05f9466ecacc140ea8c66faf15b3d9f1",
      "domain",
      "0xeb4f647bea6caa36333c816d7b46fdcb05f9466ecacc140ea8c66faf15b3d9f1"
    )
    assert.fieldEquals(
      "Registration",
      "0xeb4f647bea6caa36333c816d7b46fdcb05f9466ecacc140ea8c66faf15b3d9f1",
      "registrationDate",
      "1"
    )
    assert.fieldEquals(
      "Registration",
      "0xeb4f647bea6caa36333c816d7b46fdcb05f9466ecacc140ea8c66faf15b3d9f1",
      "expiryDate",
      "1334567890"
    )
    assert.fieldEquals(
      "Registration",
      "0xeb4f647bea6caa36333c816d7b46fdcb05f9466ecacc140ea8c66faf15b3d9f1",
      "registrant",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a"
    )
    assert.fieldEquals(
      "Registration",
      "0xeb4f647bea6caa36333c816d7b46fdcb05f9466ecacc140ea8c66faf15b3d9f1",
      "labelName",
      "test"
    )

    // NameRenewed
    assert.fieldEquals(
      "NameRenewed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "registration",
      "0xeb4f647bea6caa36333c816d7b46fdcb05f9466ecacc140ea8c66faf15b3d9f1"
    )
    assert.fieldEquals(
      "NameRenewed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "blockNumber",
      "1"
    )
    assert.fieldEquals(
      "NameRenewed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "transactionID",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a"
    )
    assert.fieldEquals(
      "NameRegistered",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "expiryDate",
      "1234567890"
    )
  })
})

describe("Test SldTransfer", () => {
  beforeAll(() => {
    let from = Address.fromString("0x0000000000000000000000000000000000000001");
    let to = Address.fromString("0x0000000000000000000000000000000000000010");
    let nameHash = "0xeb4f647bea6caa36333c816d7b46fdcb05f9466ecacc140ea8c66faf15b3d9f1";
    let tokenId = BigInt.fromString("106433793850580991138853080000822709009402351803301547654805599884517980756465");

    // TODO: it's not actually transferring?
    // logStore();
    let transferSldEvent = createTransferSldEvent(
      from,
      to,
      tokenId,
    )
    handleTransferSld(transferSldEvent)
  })

  afterAll(() => {
    // clearStore()
  })

  test("TransferSld updates Sld Owner, creates NameTransferred", () => {
    // logStore();

    assert.entityCount("Account", 2)
    assert.entityCount("Sld", 1)
    assert.entityCount("Registration", 1)
    assert.entityCount("NameTransferred", 1)

    // Sld
    assert.fieldEquals(
      "Sld",
      "0xeb4f647bea6caa36333c816d7b46fdcb05f9466ecacc140ea8c66faf15b3d9f1",
      "name",
      "test.eth"
    )
    assert.fieldEquals(
      "Sld",
      "0xeb4f647bea6caa36333c816d7b46fdcb05f9466ecacc140ea8c66faf15b3d9f1",
      "registrant",
      "0x0000000000000000000000000000000000000010",
    )
    assert.fieldEquals(
      "Sld",
      "0xeb4f647bea6caa36333c816d7b46fdcb05f9466ecacc140ea8c66faf15b3d9f1",
      "owner",
      "0x0000000000000000000000000000000000000010"
    )

    // Registration
    assert.fieldEquals(
      "Registration",
      "0xeb4f647bea6caa36333c816d7b46fdcb05f9466ecacc140ea8c66faf15b3d9f1",
      "domain",
      "0xeb4f647bea6caa36333c816d7b46fdcb05f9466ecacc140ea8c66faf15b3d9f1"
    )
    assert.fieldEquals(
      "Registration",
      "0xeb4f647bea6caa36333c816d7b46fdcb05f9466ecacc140ea8c66faf15b3d9f1",
      "registrant",
      "0x0000000000000000000000000000000000000010"
    )
    assert.fieldEquals(
      "Registration",
      "0xeb4f647bea6caa36333c816d7b46fdcb05f9466ecacc140ea8c66faf15b3d9f1",
      "labelName",
      "test"
    )

    // NameTransferred
    assert.fieldEquals(
      "NameTransferred",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "registration",
      "0xeb4f647bea6caa36333c816d7b46fdcb05f9466ecacc140ea8c66faf15b3d9f1"
    )
    assert.fieldEquals(
      "NameTransferred",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "blockNumber",
      "1"
    )
    assert.fieldEquals(
      "NameTransferred",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "transactionID",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a"
    )
    assert.fieldEquals(
      "NameTransferred",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "newOwner",
      "0x0000000000000000000000000000000000000010"
    )
  })
})
