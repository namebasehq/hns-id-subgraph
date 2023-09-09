// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class Approval extends ethereum.Event {
  get params(): Approval__Params {
    return new Approval__Params(this);
  }
}

export class Approval__Params {
  _event: Approval;

  constructor(event: Approval) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get approved(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class ApprovalForAll extends ethereum.Event {
  get params(): ApprovalForAll__Params {
    return new ApprovalForAll__Params(this);
  }
}

export class ApprovalForAll__Params {
  _event: ApprovalForAll;

  constructor(event: ApprovalForAll) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get operator(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get approved(): boolean {
    return this._event.parameters[2].value.toBoolean();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class RegistrationStrategySet extends ethereum.Event {
  get params(): RegistrationStrategySet__Params {
    return new RegistrationStrategySet__Params(this);
  }
}

export class RegistrationStrategySet__Params {
  _event: RegistrationStrategySet;

  constructor(event: RegistrationStrategySet) {
    this._event = event;
  }

  get namehash(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get strategy(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class ResolverSet extends ethereum.Event {
  get params(): ResolverSet__Params {
    return new ResolverSet__Params(this);
  }
}

export class ResolverSet__Params {
  _event: ResolverSet;

  constructor(event: ResolverSet) {
    this._event = event;
  }

  get _nftNamehash(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get _resolver(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Transfer extends ethereum.Event {
  get params(): Transfer__Params {
    return new Transfer__Params(this);
  }
}

export class Transfer__Params {
  _event: Transfer;

  constructor(event: Transfer) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class HandshakeTld__royaltyInfoResult {
  value0: Address;
  value1: BigInt;

  constructor(value0: Address, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromAddress(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    return map;
  }

  getReceiver(): Address {
    return this.value0;
  }

  getRoyaltyAmount(): BigInt {
    return this.value1;
  }
}

export class HandshakeTld extends ethereum.SmartContract {
  static bind(address: Address): HandshakeTld {
    return new HandshakeTld("HandshakeTld", address);
  }

  balanceOf(owner: Address): BigInt {
    let result = super.call("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(owner)
    ]);

    return result[0].toBigInt();
  }

  try_balanceOf(owner: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(owner)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  claimManager(): Address {
    let result = super.call("claimManager", "claimManager():(address)", []);

    return result[0].toAddress();
  }

  try_claimManager(): ethereum.CallResult<Address> {
    let result = super.tryCall("claimManager", "claimManager():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  defaultResolver(): Address {
    let result = super.call(
      "defaultResolver",
      "defaultResolver():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_defaultResolver(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "defaultResolver",
      "defaultResolver():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  exists(tokenId: BigInt): boolean {
    let result = super.call("exists", "exists(uint256):(bool)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toBoolean();
  }

  try_exists(tokenId: BigInt): ethereum.CallResult<boolean> {
    let result = super.tryCall("exists", "exists(uint256):(bool)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  expiry(_namehash: Bytes): BigInt {
    let result = super.call("expiry", "expiry(bytes32):(uint256)", [
      ethereum.Value.fromFixedBytes(_namehash)
    ]);

    return result[0].toBigInt();
  }

  try_expiry(_namehash: Bytes): ethereum.CallResult<BigInt> {
    let result = super.tryCall("expiry", "expiry(bytes32):(uint256)", [
      ethereum.Value.fromFixedBytes(_namehash)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getApproved(tokenId: BigInt): Address {
    let result = super.call("getApproved", "getApproved(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toAddress();
  }

  try_getApproved(tokenId: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getApproved",
      "getApproved(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(tokenId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  isApprovedForAll(owner: Address, operator: Address): boolean {
    let result = super.call(
      "isApprovedForAll",
      "isApprovedForAll(address,address):(bool)",
      [ethereum.Value.fromAddress(owner), ethereum.Value.fromAddress(operator)]
    );

    return result[0].toBoolean();
  }

  try_isApprovedForAll(
    owner: Address,
    operator: Address
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isApprovedForAll",
      "isApprovedForAll(address,address):(bool)",
      [ethereum.Value.fromAddress(owner), ethereum.Value.fromAddress(operator)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  isApprovedOrOwner(_operator: Address, _id: BigInt): boolean {
    let result = super.call(
      "isApprovedOrOwner",
      "isApprovedOrOwner(address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(_operator),
        ethereum.Value.fromUnsignedBigInt(_id)
      ]
    );

    return result[0].toBoolean();
  }

  try_isApprovedOrOwner(
    _operator: Address,
    _id: BigInt
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isApprovedOrOwner",
      "isApprovedOrOwner(address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(_operator),
        ethereum.Value.fromUnsignedBigInt(_id)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  metadata(): Address {
    let result = super.call("metadata", "metadata():(address)", []);

    return result[0].toAddress();
  }

  try_metadata(): ethereum.CallResult<Address> {
    let result = super.tryCall("metadata", "metadata():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  name(): string {
    let result = super.call("name", "name():(string)", []);

    return result[0].toString();
  }

  try_name(): ethereum.CallResult<string> {
    let result = super.tryCall("name", "name():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  name1(_namehash: Bytes): string {
    let result = super.call("name", "name(bytes32):(string)", [
      ethereum.Value.fromFixedBytes(_namehash)
    ]);

    return result[0].toString();
  }

  try_name1(_namehash: Bytes): ethereum.CallResult<string> {
    let result = super.tryCall("name", "name(bytes32):(string)", [
      ethereum.Value.fromFixedBytes(_namehash)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  namehashToLabelMap(param0: Bytes): string {
    let result = super.call(
      "namehashToLabelMap",
      "namehashToLabelMap(bytes32):(string)",
      [ethereum.Value.fromFixedBytes(param0)]
    );

    return result[0].toString();
  }

  try_namehashToLabelMap(param0: Bytes): ethereum.CallResult<string> {
    let result = super.tryCall(
      "namehashToLabelMap",
      "namehashToLabelMap(bytes32):(string)",
      [ethereum.Value.fromFixedBytes(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  ownerOf(_tokenId: BigInt): Address {
    let result = super.call("ownerOf", "ownerOf(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(_tokenId)
    ]);

    return result[0].toAddress();
  }

  try_ownerOf(_tokenId: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall("ownerOf", "ownerOf(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(_tokenId)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  parent(_namehash: Bytes): string {
    let result = super.call("parent", "parent(bytes32):(string)", [
      ethereum.Value.fromFixedBytes(_namehash)
    ]);

    return result[0].toString();
  }

  try_parent(_namehash: Bytes): ethereum.CallResult<string> {
    let result = super.tryCall("parent", "parent(bytes32):(string)", [
      ethereum.Value.fromFixedBytes(_namehash)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  registrationStrategy(param0: Bytes): Address {
    let result = super.call(
      "registrationStrategy",
      "registrationStrategy(bytes32):(address)",
      [ethereum.Value.fromFixedBytes(param0)]
    );

    return result[0].toAddress();
  }

  try_registrationStrategy(param0: Bytes): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "registrationStrategy",
      "registrationStrategy(bytes32):(address)",
      [ethereum.Value.fromFixedBytes(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  royaltyInfo(
    param0: BigInt,
    salePrice: BigInt
  ): HandshakeTld__royaltyInfoResult {
    let result = super.call(
      "royaltyInfo",
      "royaltyInfo(uint256,uint256):(address,uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(param0),
        ethereum.Value.fromUnsignedBigInt(salePrice)
      ]
    );

    return new HandshakeTld__royaltyInfoResult(
      result[0].toAddress(),
      result[1].toBigInt()
    );
  }

  try_royaltyInfo(
    param0: BigInt,
    salePrice: BigInt
  ): ethereum.CallResult<HandshakeTld__royaltyInfoResult> {
    let result = super.tryCall(
      "royaltyInfo",
      "royaltyInfo(uint256,uint256):(address,uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(param0),
        ethereum.Value.fromUnsignedBigInt(salePrice)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new HandshakeTld__royaltyInfoResult(
        value[0].toAddress(),
        value[1].toBigInt()
      )
    );
  }

  royaltyPayoutAddress(): Address {
    let result = super.call(
      "royaltyPayoutAddress",
      "royaltyPayoutAddress():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_royaltyPayoutAddress(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "royaltyPayoutAddress",
      "royaltyPayoutAddress():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  royaltyPayoutAmount(): BigInt {
    let result = super.call(
      "royaltyPayoutAmount",
      "royaltyPayoutAmount():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_royaltyPayoutAmount(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "royaltyPayoutAmount",
      "royaltyPayoutAmount():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  supportsInterface(interfaceId: Bytes): boolean {
    let result = super.call(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );

    return result[0].toBoolean();
  }

  try_supportsInterface(interfaceId: Bytes): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  symbol(): string {
    let result = super.call("symbol", "symbol():(string)", []);

    return result[0].toString();
  }

  try_symbol(): ethereum.CallResult<string> {
    let result = super.tryCall("symbol", "symbol():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  tokenResolverMap(param0: Bytes): Address {
    let result = super.call(
      "tokenResolverMap",
      "tokenResolverMap(bytes32):(address)",
      [ethereum.Value.fromFixedBytes(param0)]
    );

    return result[0].toAddress();
  }

  try_tokenResolverMap(param0: Bytes): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "tokenResolverMap",
      "tokenResolverMap(bytes32):(address)",
      [ethereum.Value.fromFixedBytes(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  tokenURI(_id: BigInt): string {
    let result = super.call("tokenURI", "tokenURI(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(_id)
    ]);

    return result[0].toString();
  }

  try_tokenURI(_id: BigInt): ethereum.CallResult<string> {
    let result = super.tryCall("tokenURI", "tokenURI(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(_id)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ApproveCall extends ethereum.Call {
  get inputs(): ApproveCall__Inputs {
    return new ApproveCall__Inputs(this);
  }

  get outputs(): ApproveCall__Outputs {
    return new ApproveCall__Outputs(this);
  }
}

export class ApproveCall__Inputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }

  get to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class ApproveCall__Outputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }
}

export class BurnTldCall extends ethereum.Call {
  get inputs(): BurnTldCall__Inputs {
    return new BurnTldCall__Inputs(this);
  }

  get outputs(): BurnTldCall__Outputs {
    return new BurnTldCall__Outputs(this);
  }
}

export class BurnTldCall__Inputs {
  _call: BurnTldCall;

  constructor(call: BurnTldCall) {
    this._call = call;
  }

  get _tokenId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class BurnTldCall__Outputs {
  _call: BurnTldCall;

  constructor(call: BurnTldCall) {
    this._call = call;
  }
}

export class RegisterWithResolverCall extends ethereum.Call {
  get inputs(): RegisterWithResolverCall__Inputs {
    return new RegisterWithResolverCall__Inputs(this);
  }

  get outputs(): RegisterWithResolverCall__Outputs {
    return new RegisterWithResolverCall__Outputs(this);
  }
}

export class RegisterWithResolverCall__Inputs {
  _call: RegisterWithResolverCall;

  constructor(call: RegisterWithResolverCall) {
    this._call = call;
  }

  get _addr(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _domain(): string {
    return this._call.inputValues[1].value.toString();
  }

  get _strategy(): Address {
    return this._call.inputValues[2].value.toAddress();
  }
}

export class RegisterWithResolverCall__Outputs {
  _call: RegisterWithResolverCall;

  constructor(call: RegisterWithResolverCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class SafeTransferFromCall extends ethereum.Call {
  get inputs(): SafeTransferFromCall__Inputs {
    return new SafeTransferFromCall__Inputs(this);
  }

  get outputs(): SafeTransferFromCall__Outputs {
    return new SafeTransferFromCall__Outputs(this);
  }
}

export class SafeTransferFromCall__Inputs {
  _call: SafeTransferFromCall;

  constructor(call: SafeTransferFromCall) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class SafeTransferFromCall__Outputs {
  _call: SafeTransferFromCall;

  constructor(call: SafeTransferFromCall) {
    this._call = call;
  }
}

export class SafeTransferFrom1Call extends ethereum.Call {
  get inputs(): SafeTransferFrom1Call__Inputs {
    return new SafeTransferFrom1Call__Inputs(this);
  }

  get outputs(): SafeTransferFrom1Call__Outputs {
    return new SafeTransferFrom1Call__Outputs(this);
  }
}

export class SafeTransferFrom1Call__Inputs {
  _call: SafeTransferFrom1Call;

  constructor(call: SafeTransferFrom1Call) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get data(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }
}

export class SafeTransferFrom1Call__Outputs {
  _call: SafeTransferFrom1Call;

  constructor(call: SafeTransferFrom1Call) {
    this._call = call;
  }
}

export class SetApprovalForAllCall extends ethereum.Call {
  get inputs(): SetApprovalForAllCall__Inputs {
    return new SetApprovalForAllCall__Inputs(this);
  }

  get outputs(): SetApprovalForAllCall__Outputs {
    return new SetApprovalForAllCall__Outputs(this);
  }
}

export class SetApprovalForAllCall__Inputs {
  _call: SetApprovalForAllCall;

  constructor(call: SetApprovalForAllCall) {
    this._call = call;
  }

  get operator(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get approved(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }
}

export class SetApprovalForAllCall__Outputs {
  _call: SetApprovalForAllCall;

  constructor(call: SetApprovalForAllCall) {
    this._call = call;
  }
}

export class SetDefaultResolverCall extends ethereum.Call {
  get inputs(): SetDefaultResolverCall__Inputs {
    return new SetDefaultResolverCall__Inputs(this);
  }

  get outputs(): SetDefaultResolverCall__Outputs {
    return new SetDefaultResolverCall__Outputs(this);
  }
}

export class SetDefaultResolverCall__Inputs {
  _call: SetDefaultResolverCall;

  constructor(call: SetDefaultResolverCall) {
    this._call = call;
  }

  get _resolver(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetDefaultResolverCall__Outputs {
  _call: SetDefaultResolverCall;

  constructor(call: SetDefaultResolverCall) {
    this._call = call;
  }
}

export class SetMetadataContractCall extends ethereum.Call {
  get inputs(): SetMetadataContractCall__Inputs {
    return new SetMetadataContractCall__Inputs(this);
  }

  get outputs(): SetMetadataContractCall__Outputs {
    return new SetMetadataContractCall__Outputs(this);
  }
}

export class SetMetadataContractCall__Inputs {
  _call: SetMetadataContractCall;

  constructor(call: SetMetadataContractCall) {
    this._call = call;
  }

  get _metadata(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetMetadataContractCall__Outputs {
  _call: SetMetadataContractCall;

  constructor(call: SetMetadataContractCall) {
    this._call = call;
  }
}

export class SetRegistrationStrategyCall extends ethereum.Call {
  get inputs(): SetRegistrationStrategyCall__Inputs {
    return new SetRegistrationStrategyCall__Inputs(this);
  }

  get outputs(): SetRegistrationStrategyCall__Outputs {
    return new SetRegistrationStrategyCall__Outputs(this);
  }
}

export class SetRegistrationStrategyCall__Inputs {
  _call: SetRegistrationStrategyCall;

  constructor(call: SetRegistrationStrategyCall) {
    this._call = call;
  }

  get _namehash(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get _strategy(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class SetRegistrationStrategyCall__Outputs {
  _call: SetRegistrationStrategyCall;

  constructor(call: SetRegistrationStrategyCall) {
    this._call = call;
  }
}

export class SetResolverCall extends ethereum.Call {
  get inputs(): SetResolverCall__Inputs {
    return new SetResolverCall__Inputs(this);
  }

  get outputs(): SetResolverCall__Outputs {
    return new SetResolverCall__Outputs(this);
  }
}

export class SetResolverCall__Inputs {
  _call: SetResolverCall;

  constructor(call: SetResolverCall) {
    this._call = call;
  }

  get _namehash(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get _resolver(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class SetResolverCall__Outputs {
  _call: SetResolverCall;

  constructor(call: SetResolverCall) {
    this._call = call;
  }
}

export class SetRoyaltyPayoutAddressCall extends ethereum.Call {
  get inputs(): SetRoyaltyPayoutAddressCall__Inputs {
    return new SetRoyaltyPayoutAddressCall__Inputs(this);
  }

  get outputs(): SetRoyaltyPayoutAddressCall__Outputs {
    return new SetRoyaltyPayoutAddressCall__Outputs(this);
  }
}

export class SetRoyaltyPayoutAddressCall__Inputs {
  _call: SetRoyaltyPayoutAddressCall;

  constructor(call: SetRoyaltyPayoutAddressCall) {
    this._call = call;
  }

  get _addr(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetRoyaltyPayoutAddressCall__Outputs {
  _call: SetRoyaltyPayoutAddressCall;

  constructor(call: SetRoyaltyPayoutAddressCall) {
    this._call = call;
  }
}

export class SetRoyaltyPayoutAmountCall extends ethereum.Call {
  get inputs(): SetRoyaltyPayoutAmountCall__Inputs {
    return new SetRoyaltyPayoutAmountCall__Inputs(this);
  }

  get outputs(): SetRoyaltyPayoutAmountCall__Outputs {
    return new SetRoyaltyPayoutAmountCall__Outputs(this);
  }
}

export class SetRoyaltyPayoutAmountCall__Inputs {
  _call: SetRoyaltyPayoutAmountCall;

  constructor(call: SetRoyaltyPayoutAmountCall) {
    this._call = call;
  }

  get _amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetRoyaltyPayoutAmountCall__Outputs {
  _call: SetRoyaltyPayoutAmountCall;

  constructor(call: SetRoyaltyPayoutAmountCall) {
    this._call = call;
  }
}

export class SetRoyaltyPayoutAmountAndAddressCall extends ethereum.Call {
  get inputs(): SetRoyaltyPayoutAmountAndAddressCall__Inputs {
    return new SetRoyaltyPayoutAmountAndAddressCall__Inputs(this);
  }

  get outputs(): SetRoyaltyPayoutAmountAndAddressCall__Outputs {
    return new SetRoyaltyPayoutAmountAndAddressCall__Outputs(this);
  }
}

export class SetRoyaltyPayoutAmountAndAddressCall__Inputs {
  _call: SetRoyaltyPayoutAmountAndAddressCall;

  constructor(call: SetRoyaltyPayoutAmountAndAddressCall) {
    this._call = call;
  }

  get _addr(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class SetRoyaltyPayoutAmountAndAddressCall__Outputs {
  _call: SetRoyaltyPayoutAmountAndAddressCall;

  constructor(call: SetRoyaltyPayoutAmountAndAddressCall) {
    this._call = call;
  }
}

export class SetTldClaimManagerCall extends ethereum.Call {
  get inputs(): SetTldClaimManagerCall__Inputs {
    return new SetTldClaimManagerCall__Inputs(this);
  }

  get outputs(): SetTldClaimManagerCall__Outputs {
    return new SetTldClaimManagerCall__Outputs(this);
  }
}

export class SetTldClaimManagerCall__Inputs {
  _call: SetTldClaimManagerCall;

  constructor(call: SetTldClaimManagerCall) {
    this._call = call;
  }

  get _manager(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetTldClaimManagerCall__Outputs {
  _call: SetTldClaimManagerCall;

  constructor(call: SetTldClaimManagerCall) {
    this._call = call;
  }
}

export class TransferFromCall extends ethereum.Call {
  get inputs(): TransferFromCall__Inputs {
    return new TransferFromCall__Inputs(this);
  }

  get outputs(): TransferFromCall__Outputs {
    return new TransferFromCall__Outputs(this);
  }
}

export class TransferFromCall__Inputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class TransferFromCall__Outputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}