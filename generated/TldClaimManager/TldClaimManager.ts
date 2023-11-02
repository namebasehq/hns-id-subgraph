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

export class AllowedTldMintUpdate extends ethereum.Event {
  get params(): AllowedTldMintUpdate__Params {
    return new AllowedTldMintUpdate__Params(this);
  }
}

export class AllowedTldMintUpdate__Params {
  _event: AllowedTldMintUpdate;

  constructor(event: AllowedTldMintUpdate) {
    this._event = event;
  }

  get _claimant(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _manager(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get _label(): string {
    return this._event.parameters[2].value.toString();
  }
}

export class Initialized extends ethereum.Event {
  get params(): Initialized__Params {
    return new Initialized__Params(this);
  }
}

export class Initialized__Params {
  _event: Initialized;

  constructor(event: Initialized) {
    this._event = event;
  }

  get version(): i32 {
    return this._event.parameters[0].value.toI32();
  }
}

export class NewLabelValidator extends ethereum.Event {
  get params(): NewLabelValidator__Params {
    return new NewLabelValidator__Params(this);
  }
}

export class NewLabelValidator__Params {
  _event: NewLabelValidator;

  constructor(event: NewLabelValidator) {
    this._event = event;
  }

  get _labelValidator(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class NewUsdOracle extends ethereum.Event {
  get params(): NewUsdOracle__Params {
    return new NewUsdOracle__Params(this);
  }
}

export class NewUsdOracle__Params {
  _event: NewUsdOracle;

  constructor(event: NewUsdOracle) {
    this._event = event;
  }

  get _usdEthPriceOracle(): Address {
    return this._event.parameters[0].value.toAddress();
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

export class TldClaimed extends ethereum.Event {
  get params(): TldClaimed__Params {
    return new TldClaimed__Params(this);
  }
}

export class TldClaimed__Params {
  _event: TldClaimed;

  constructor(event: TldClaimed) {
    this._event = event;
  }

  get _to(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _tokenId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get _label(): string {
    return this._event.parameters[2].value.toString();
  }
}

export class UpdateAllowedTldManager extends ethereum.Event {
  get params(): UpdateAllowedTldManager__Params {
    return new UpdateAllowedTldManager__Params(this);
  }
}

export class UpdateAllowedTldManager__Params {
  _event: UpdateAllowedTldManager;

  constructor(event: UpdateAllowedTldManager) {
    this._event = event;
  }

  get _addr(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _allowed(): boolean {
    return this._event.parameters[1].value.toBoolean();
  }
}

export class TldClaimManager extends ethereum.SmartContract {
  static bind(address: Address): TldClaimManager {
    return new TldClaimManager("TldClaimManager", address);
  }

  allowedTldManager(param0: Address): boolean {
    let result = super.call(
      "allowedTldManager",
      "allowedTldManager(address):(bool)",
      [ethereum.Value.fromAddress(param0)]
    );

    return result[0].toBoolean();
  }

  try_allowedTldManager(param0: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "allowedTldManager",
      "allowedTldManager(address):(bool)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  canClaim(_addr: Address, _namehash: Bytes): boolean {
    let result = super.call("canClaim", "canClaim(address,bytes32):(bool)", [
      ethereum.Value.fromAddress(_addr),
      ethereum.Value.fromFixedBytes(_namehash)
    ]);

    return result[0].toBoolean();
  }

  try_canClaim(_addr: Address, _namehash: Bytes): ethereum.CallResult<boolean> {
    let result = super.tryCall("canClaim", "canClaim(address,bytes32):(bool)", [
      ethereum.Value.fromAddress(_addr),
      ethereum.Value.fromFixedBytes(_namehash)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  defaultRegistrationStrategy(): Address {
    let result = super.call(
      "defaultRegistrationStrategy",
      "defaultRegistrationStrategy():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_defaultRegistrationStrategy(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "defaultRegistrationStrategy",
      "defaultRegistrationStrategy():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getMintPriceInWei(): BigInt {
    let result = super.call(
      "getMintPriceInWei",
      "getMintPriceInWei():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_getMintPriceInWei(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getMintPriceInWei",
      "getMintPriceInWei():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  handshakeTldContract(): Address {
    let result = super.call(
      "handshakeTldContract",
      "handshakeTldContract():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_handshakeTldContract(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "handshakeTldContract",
      "handshakeTldContract():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  handshakeWalletPayoutAddress(): Address {
    let result = super.call(
      "handshakeWalletPayoutAddress",
      "handshakeWalletPayoutAddress():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_handshakeWalletPayoutAddress(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "handshakeWalletPayoutAddress",
      "handshakeWalletPayoutAddress():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  labelValidator(): Address {
    let result = super.call("labelValidator", "labelValidator():(address)", []);

    return result[0].toAddress();
  }

  try_labelValidator(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "labelValidator",
      "labelValidator():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  mintPriceInDollars(): BigInt {
    let result = super.call(
      "mintPriceInDollars",
      "mintPriceInDollars():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_mintPriceInDollars(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "mintPriceInDollars",
      "mintPriceInDollars():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
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

  tldClaimantMap(param0: Bytes): Address {
    let result = super.call(
      "tldClaimantMap",
      "tldClaimantMap(bytes32):(address)",
      [ethereum.Value.fromFixedBytes(param0)]
    );

    return result[0].toAddress();
  }

  try_tldClaimantMap(param0: Bytes): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "tldClaimantMap",
      "tldClaimantMap(bytes32):(address)",
      [ethereum.Value.fromFixedBytes(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  tldExpiry(param0: Bytes): BigInt {
    let result = super.call("tldExpiry", "tldExpiry(bytes32):(uint256)", [
      ethereum.Value.fromFixedBytes(param0)
    ]);

    return result[0].toBigInt();
  }

  try_tldExpiry(param0: Bytes): ethereum.CallResult<BigInt> {
    let result = super.tryCall("tldExpiry", "tldExpiry(bytes32):(uint256)", [
      ethereum.Value.fromFixedBytes(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  tldProviderMap(param0: Bytes): Address {
    let result = super.call(
      "tldProviderMap",
      "tldProviderMap(bytes32):(address)",
      [ethereum.Value.fromFixedBytes(param0)]
    );

    return result[0].toAddress();
  }

  try_tldProviderMap(param0: Bytes): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "tldProviderMap",
      "tldProviderMap(bytes32):(address)",
      [ethereum.Value.fromFixedBytes(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  usdOracle(): Address {
    let result = super.call("usdOracle", "usdOracle():(address)", []);

    return result[0].toAddress();
  }

  try_usdOracle(): ethereum.CallResult<Address> {
    let result = super.tryCall("usdOracle", "usdOracle():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
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

export class AddTldAndClaimantCall extends ethereum.Call {
  get inputs(): AddTldAndClaimantCall__Inputs {
    return new AddTldAndClaimantCall__Inputs(this);
  }

  get outputs(): AddTldAndClaimantCall__Outputs {
    return new AddTldAndClaimantCall__Outputs(this);
  }
}

export class AddTldAndClaimantCall__Inputs {
  _call: AddTldAndClaimantCall;

  constructor(call: AddTldAndClaimantCall) {
    this._call = call;
  }

  get _addr(): Array<Address> {
    return this._call.inputValues[0].value.toAddressArray();
  }

  get _domain(): Array<string> {
    return this._call.inputValues[1].value.toStringArray();
  }
}

export class AddTldAndClaimantCall__Outputs {
  _call: AddTldAndClaimantCall;

  constructor(call: AddTldAndClaimantCall) {
    this._call = call;
  }
}

export class ClaimTldCall extends ethereum.Call {
  get inputs(): ClaimTldCall__Inputs {
    return new ClaimTldCall__Inputs(this);
  }

  get outputs(): ClaimTldCall__Outputs {
    return new ClaimTldCall__Outputs(this);
  }
}

export class ClaimTldCall__Inputs {
  _call: ClaimTldCall;

  constructor(call: ClaimTldCall) {
    this._call = call;
  }

  get _domain(): string {
    return this._call.inputValues[0].value.toString();
  }

  get _addr(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class ClaimTldCall__Outputs {
  _call: ClaimTldCall;

  constructor(call: ClaimTldCall) {
    this._call = call;
  }
}

export class InitCall extends ethereum.Call {
  get inputs(): InitCall__Inputs {
    return new InitCall__Inputs(this);
  }

  get outputs(): InitCall__Outputs {
    return new InitCall__Outputs(this);
  }
}

export class InitCall__Inputs {
  _call: InitCall;

  constructor(call: InitCall) {
    this._call = call;
  }

  get _validator(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _owner(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _tld(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get _strategy(): Address {
    return this._call.inputValues[3].value.toAddress();
  }

  get _oracle(): Address {
    return this._call.inputValues[4].value.toAddress();
  }

  get _mintPriceInDollars(): BigInt {
    return this._call.inputValues[5].value.toBigInt();
  }

  get _handshakeWalletPayoutAddress(): Address {
    return this._call.inputValues[6].value.toAddress();
  }
}

export class InitCall__Outputs {
  _call: InitCall;

  constructor(call: InitCall) {
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

export class SetHandshakeTldContractCall extends ethereum.Call {
  get inputs(): SetHandshakeTldContractCall__Inputs {
    return new SetHandshakeTldContractCall__Inputs(this);
  }

  get outputs(): SetHandshakeTldContractCall__Outputs {
    return new SetHandshakeTldContractCall__Outputs(this);
  }
}

export class SetHandshakeTldContractCall__Inputs {
  _call: SetHandshakeTldContractCall;

  constructor(call: SetHandshakeTldContractCall) {
    this._call = call;
  }

  get _tld(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetHandshakeTldContractCall__Outputs {
  _call: SetHandshakeTldContractCall;

  constructor(call: SetHandshakeTldContractCall) {
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

export class UpdateAllowedTldManagerCall extends ethereum.Call {
  get inputs(): UpdateAllowedTldManagerCall__Inputs {
    return new UpdateAllowedTldManagerCall__Inputs(this);
  }

  get outputs(): UpdateAllowedTldManagerCall__Outputs {
    return new UpdateAllowedTldManagerCall__Outputs(this);
  }
}

export class UpdateAllowedTldManagerCall__Inputs {
  _call: UpdateAllowedTldManagerCall;

  constructor(call: UpdateAllowedTldManagerCall) {
    this._call = call;
  }

  get _addr(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _allowed(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }
}

export class UpdateAllowedTldManagerCall__Outputs {
  _call: UpdateAllowedTldManagerCall;

  constructor(call: UpdateAllowedTldManagerCall) {
    this._call = call;
  }
}

export class UpdateLabelValidatorCall extends ethereum.Call {
  get inputs(): UpdateLabelValidatorCall__Inputs {
    return new UpdateLabelValidatorCall__Inputs(this);
  }

  get outputs(): UpdateLabelValidatorCall__Outputs {
    return new UpdateLabelValidatorCall__Outputs(this);
  }
}

export class UpdateLabelValidatorCall__Inputs {
  _call: UpdateLabelValidatorCall;

  constructor(call: UpdateLabelValidatorCall) {
    this._call = call;
  }

  get _validator(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class UpdateLabelValidatorCall__Outputs {
  _call: UpdateLabelValidatorCall;

  constructor(call: UpdateLabelValidatorCall) {
    this._call = call;
  }
}

export class UpdateMintPriceCall extends ethereum.Call {
  get inputs(): UpdateMintPriceCall__Inputs {
    return new UpdateMintPriceCall__Inputs(this);
  }

  get outputs(): UpdateMintPriceCall__Outputs {
    return new UpdateMintPriceCall__Outputs(this);
  }
}

export class UpdateMintPriceCall__Inputs {
  _call: UpdateMintPriceCall;

  constructor(call: UpdateMintPriceCall) {
    this._call = call;
  }

  get _priceInDollarDecimals(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class UpdateMintPriceCall__Outputs {
  _call: UpdateMintPriceCall;

  constructor(call: UpdateMintPriceCall) {
    this._call = call;
  }
}

export class UpdatePriceOracleCall extends ethereum.Call {
  get inputs(): UpdatePriceOracleCall__Inputs {
    return new UpdatePriceOracleCall__Inputs(this);
  }

  get outputs(): UpdatePriceOracleCall__Outputs {
    return new UpdatePriceOracleCall__Outputs(this);
  }
}

export class UpdatePriceOracleCall__Inputs {
  _call: UpdatePriceOracleCall;

  constructor(call: UpdatePriceOracleCall) {
    this._call = call;
  }

  get _oracle(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class UpdatePriceOracleCall__Outputs {
  _call: UpdatePriceOracleCall;

  constructor(call: UpdatePriceOracleCall) {
    this._call = call;
  }
}
