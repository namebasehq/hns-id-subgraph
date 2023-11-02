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

export class DiscountSet extends ethereum.Event {
  get params(): DiscountSet__Params {
    return new DiscountSet__Params(this);
  }
}

export class DiscountSet__Params {
  _event: DiscountSet;

  constructor(event: DiscountSet) {
    this._event = event;
  }

  get _tokenNamehash(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get _claimant(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get _discount(): DiscountSet_discountStruct {
    return changetype<DiscountSet_discountStruct>(
      this._event.parameters[2].value.toTuple()
    );
  }
}

export class DiscountSet_discountStruct extends ethereum.Tuple {
  get startTimestamp(): BigInt {
    return this[0].toBigInt();
  }

  get endTimestamp(): BigInt {
    return this[1].toBigInt();
  }

  get discountPercentage(): i32 {
    return this[2].toI32();
  }

  get isRegistration(): boolean {
    return this[3].toBoolean();
  }

  get isRenewal(): boolean {
    return this[4].toBoolean();
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

export class NewGracePeriod extends ethereum.Event {
  get params(): NewGracePeriod__Params {
    return new NewGracePeriod__Params(this);
  }
}

export class NewGracePeriod__Params {
  _event: NewGracePeriod;

  constructor(event: NewGracePeriod) {
    this._event = event;
  }

  get _newGracePeriod(): BigInt {
    return this._event.parameters[0].value.toBigInt();
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

export class PaymentSent extends ethereum.Event {
  get params(): PaymentSent__Params {
    return new PaymentSent__Params(this);
  }
}

export class PaymentSent__Params {
  _event: PaymentSent;

  constructor(event: PaymentSent) {
    this._event = event;
  }

  get _to(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class RegisterSld extends ethereum.Event {
  get params(): RegisterSld__Params {
    return new RegisterSld__Params(this);
  }
}

export class RegisterSld__Params {
  _event: RegisterSld;

  constructor(event: RegisterSld) {
    this._event = event;
  }

  get _tldNamehash(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get _secret(): Bytes {
    return this._event.parameters[1].value.toBytes();
  }

  get _label(): string {
    return this._event.parameters[2].value.toString();
  }

  get _expiry(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class RenewSld extends ethereum.Event {
  get params(): RenewSld__Params {
    return new RenewSld__Params(this);
  }
}

export class RenewSld__Params {
  _event: RenewSld;

  constructor(event: RenewSld) {
    this._event = event;
  }

  get _tldNamehash(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get _label(): string {
    return this._event.parameters[1].value.toString();
  }

  get _expiry(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class SldRegistrationManager__addressDiscountsResult {
  value0: BigInt;
  value1: BigInt;
  value2: i32;
  value3: boolean;
  value4: boolean;

  constructor(
    value0: BigInt,
    value1: BigInt,
    value2: i32,
    value3: boolean,
    value4: boolean
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set(
      "value2",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(this.value2))
    );
    map.set("value3", ethereum.Value.fromBoolean(this.value3));
    map.set("value4", ethereum.Value.fromBoolean(this.value4));
    return map;
  }

  getStartTimestamp(): BigInt {
    return this.value0;
  }

  getEndTimestamp(): BigInt {
    return this.value1;
  }

  getDiscountPercentage(): i32 {
    return this.value2;
  }

  getIsRegistration(): boolean {
    return this.value3;
  }

  getIsRenewal(): boolean {
    return this.value4;
  }
}

export class SldRegistrationManager__sldRegistrationHistoryResult {
  value0: BigInt;
  value1: BigInt;
  value2: BigInt;

  constructor(value0: BigInt, value1: BigInt, value2: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    return map;
  }

  getRegistrationTime(): BigInt {
    return this.value0;
  }

  getRegistrationLength(): BigInt {
    return this.value1;
  }

  getRegistrationPrice(): BigInt {
    return this.value2;
  }
}

export class SldRegistrationManager extends ethereum.SmartContract {
  static bind(address: Address): SldRegistrationManager {
    return new SldRegistrationManager("SldRegistrationManager", address);
  }

  DOMAIN_SEPARATOR(): Bytes {
    let result = super.call(
      "DOMAIN_SEPARATOR",
      "DOMAIN_SEPARATOR():(bytes32)",
      []
    );

    return result[0].toBytes();
  }

  try_DOMAIN_SEPARATOR(): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "DOMAIN_SEPARATOR",
      "DOMAIN_SEPARATOR():(bytes32)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  ValidSigner(param0: Address): boolean {
    let result = super.call("ValidSigner", "ValidSigner(address):(bool)", [
      ethereum.Value.fromAddress(param0)
    ]);

    return result[0].toBoolean();
  }

  try_ValidSigner(param0: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall("ValidSigner", "ValidSigner(address):(bool)", [
      ethereum.Value.fromAddress(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  addressDiscounts(
    param0: Bytes,
    param1: Address
  ): SldRegistrationManager__addressDiscountsResult {
    let result = super.call(
      "addressDiscounts",
      "addressDiscounts(bytes32,address):(uint80,uint80,uint8,bool,bool)",
      [
        ethereum.Value.fromFixedBytes(param0),
        ethereum.Value.fromAddress(param1)
      ]
    );

    return new SldRegistrationManager__addressDiscountsResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toI32(),
      result[3].toBoolean(),
      result[4].toBoolean()
    );
  }

  try_addressDiscounts(
    param0: Bytes,
    param1: Address
  ): ethereum.CallResult<SldRegistrationManager__addressDiscountsResult> {
    let result = super.tryCall(
      "addressDiscounts",
      "addressDiscounts(bytes32,address):(uint80,uint80,uint8,bool,bool)",
      [
        ethereum.Value.fromFixedBytes(param0),
        ethereum.Value.fromAddress(param1)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new SldRegistrationManager__addressDiscountsResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toI32(),
        value[3].toBoolean(),
        value[4].toBoolean()
      )
    );
  }

  checkSignatureValid(
    buyer: Address,
    subdomainHash: Bytes,
    v: i32,
    r: Bytes,
    s: Bytes
  ): Address {
    let result = super.call(
      "checkSignatureValid",
      "checkSignatureValid(address,bytes32,uint8,bytes32,bytes32):(address)",
      [
        ethereum.Value.fromAddress(buyer),
        ethereum.Value.fromFixedBytes(subdomainHash),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(v)),
        ethereum.Value.fromFixedBytes(r),
        ethereum.Value.fromFixedBytes(s)
      ]
    );

    return result[0].toAddress();
  }

  try_checkSignatureValid(
    buyer: Address,
    subdomainHash: Bytes,
    v: i32,
    r: Bytes,
    s: Bytes
  ): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "checkSignatureValid",
      "checkSignatureValid(address,bytes32,uint8,bytes32,bytes32):(address)",
      [
        ethereum.Value.fromAddress(buyer),
        ethereum.Value.fromFixedBytes(subdomainHash),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(v)),
        ethereum.Value.fromFixedBytes(r),
        ethereum.Value.fromFixedBytes(s)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  commitIntent(): Address {
    let result = super.call("commitIntent", "commitIntent():(address)", []);

    return result[0].toAddress();
  }

  try_commitIntent(): ethereum.CallResult<Address> {
    let result = super.tryCall("commitIntent", "commitIntent():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  feeWalletPayoutAddress(): Address {
    let result = super.call(
      "feeWalletPayoutAddress",
      "feeWalletPayoutAddress():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_feeWalletPayoutAddress(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "feeWalletPayoutAddress",
      "feeWalletPayoutAddress():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getRegistrationBasePrice(
    _strategy: Address,
    _addr: Address,
    _parentNamehash: Bytes,
    _label: string,
    _registrationLength: BigInt,
    _isRenewal: boolean
  ): BigInt {
    let result = super.call(
      "getRegistrationBasePrice",
      "getRegistrationBasePrice(address,address,bytes32,string,uint256,bool):(uint256)",
      [
        ethereum.Value.fromAddress(_strategy),
        ethereum.Value.fromAddress(_addr),
        ethereum.Value.fromFixedBytes(_parentNamehash),
        ethereum.Value.fromString(_label),
        ethereum.Value.fromUnsignedBigInt(_registrationLength),
        ethereum.Value.fromBoolean(_isRenewal)
      ]
    );

    return result[0].toBigInt();
  }

  try_getRegistrationBasePrice(
    _strategy: Address,
    _addr: Address,
    _parentNamehash: Bytes,
    _label: string,
    _registrationLength: BigInt,
    _isRenewal: boolean
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getRegistrationBasePrice",
      "getRegistrationBasePrice(address,address,bytes32,string,uint256,bool):(uint256)",
      [
        ethereum.Value.fromAddress(_strategy),
        ethereum.Value.fromAddress(_addr),
        ethereum.Value.fromFixedBytes(_parentNamehash),
        ethereum.Value.fromString(_label),
        ethereum.Value.fromUnsignedBigInt(_registrationLength),
        ethereum.Value.fromBoolean(_isRenewal)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getRegistrationHash(buyer: Address, subdomainHash: Bytes): Bytes {
    let result = super.call(
      "getRegistrationHash",
      "getRegistrationHash(address,bytes32):(bytes32)",
      [
        ethereum.Value.fromAddress(buyer),
        ethereum.Value.fromFixedBytes(subdomainHash)
      ]
    );

    return result[0].toBytes();
  }

  try_getRegistrationHash(
    buyer: Address,
    subdomainHash: Bytes
  ): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "getRegistrationHash",
      "getRegistrationHash(address,bytes32):(bytes32)",
      [
        ethereum.Value.fromAddress(buyer),
        ethereum.Value.fromFixedBytes(subdomainHash)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  getRegistrationPrice(
    _strategy: Address,
    _addr: Address,
    _parentNamehash: Bytes,
    _label: string,
    _registrationLength: BigInt
  ): BigInt {
    let result = super.call(
      "getRegistrationPrice",
      "getRegistrationPrice(address,address,bytes32,string,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(_strategy),
        ethereum.Value.fromAddress(_addr),
        ethereum.Value.fromFixedBytes(_parentNamehash),
        ethereum.Value.fromString(_label),
        ethereum.Value.fromUnsignedBigInt(_registrationLength)
      ]
    );

    return result[0].toBigInt();
  }

  try_getRegistrationPrice(
    _strategy: Address,
    _addr: Address,
    _parentNamehash: Bytes,
    _label: string,
    _registrationLength: BigInt
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getRegistrationPrice",
      "getRegistrationPrice(address,address,bytes32,string,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(_strategy),
        ethereum.Value.fromAddress(_addr),
        ethereum.Value.fromFixedBytes(_parentNamehash),
        ethereum.Value.fromString(_label),
        ethereum.Value.fromUnsignedBigInt(_registrationLength)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getRenewalPrice(
    _addr: Address,
    _parentNamehash: Bytes,
    _label: string,
    _registrationLength: BigInt
  ): BigInt {
    let result = super.call(
      "getRenewalPrice",
      "getRenewalPrice(address,bytes32,string,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(_addr),
        ethereum.Value.fromFixedBytes(_parentNamehash),
        ethereum.Value.fromString(_label),
        ethereum.Value.fromUnsignedBigInt(_registrationLength)
      ]
    );

    return result[0].toBigInt();
  }

  try_getRenewalPrice(
    _addr: Address,
    _parentNamehash: Bytes,
    _label: string,
    _registrationLength: BigInt
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getRenewalPrice",
      "getRenewalPrice(address,bytes32,string,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(_addr),
        ethereum.Value.fromFixedBytes(_parentNamehash),
        ethereum.Value.fromString(_label),
        ethereum.Value.fromUnsignedBigInt(_registrationLength)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getRenewalPricePerDay(
    _addr: Address,
    _parentNamehash: Bytes,
    _label: string,
    _registrationLength: BigInt
  ): BigInt {
    let result = super.call(
      "getRenewalPricePerDay",
      "getRenewalPricePerDay(address,bytes32,string,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(_addr),
        ethereum.Value.fromFixedBytes(_parentNamehash),
        ethereum.Value.fromString(_label),
        ethereum.Value.fromUnsignedBigInt(_registrationLength)
      ]
    );

    return result[0].toBigInt();
  }

  try_getRenewalPricePerDay(
    _addr: Address,
    _parentNamehash: Bytes,
    _label: string,
    _registrationLength: BigInt
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getRenewalPricePerDay",
      "getRenewalPricePerDay(address,bytes32,string,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(_addr),
        ethereum.Value.fromFixedBytes(_parentNamehash),
        ethereum.Value.fromString(_label),
        ethereum.Value.fromUnsignedBigInt(_registrationLength)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getTenYearGuarenteedPricing(_sldNamehash: Bytes): Array<BigInt> {
    let result = super.call(
      "getTenYearGuarenteedPricing",
      "getTenYearGuarenteedPricing(bytes32):(uint80[10])",
      [ethereum.Value.fromFixedBytes(_sldNamehash)]
    );

    return result[0].toBigIntArray();
  }

  try_getTenYearGuarenteedPricing(
    _sldNamehash: Bytes
  ): ethereum.CallResult<Array<BigInt>> {
    let result = super.tryCall(
      "getTenYearGuarenteedPricing",
      "getTenYearGuarenteedPricing(bytes32):(uint80[10])",
      [ethereum.Value.fromFixedBytes(_sldNamehash)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigIntArray());
  }

  getWeiValueOfDollar(): BigInt {
    let result = super.call(
      "getWeiValueOfDollar",
      "getWeiValueOfDollar():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_getWeiValueOfDollar(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getWeiValueOfDollar",
      "getWeiValueOfDollar():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  globalStrategy(): Address {
    let result = super.call("globalStrategy", "globalStrategy():(address)", []);

    return result[0].toAddress();
  }

  try_globalStrategy(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "globalStrategy",
      "globalStrategy():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  gracePeriod(): BigInt {
    let result = super.call("gracePeriod", "gracePeriod():(uint256)", []);

    return result[0].toBigInt();
  }

  try_gracePeriod(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("gracePeriod", "gracePeriod():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
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

  percentCommission(): BigInt {
    let result = super.call(
      "percentCommission",
      "percentCommission():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_percentCommission(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "percentCommission",
      "percentCommission():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  pricesAtRegistration(param0: Bytes, param1: BigInt): BigInt {
    let result = super.call(
      "pricesAtRegistration",
      "pricesAtRegistration(bytes32,uint256):(uint80)",
      [
        ethereum.Value.fromFixedBytes(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );

    return result[0].toBigInt();
  }

  try_pricesAtRegistration(
    param0: Bytes,
    param1: BigInt
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "pricesAtRegistration",
      "pricesAtRegistration(bytes32,uint256):(uint80)",
      [
        ethereum.Value.fromFixedBytes(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  sld(): Address {
    let result = super.call("sld", "sld():(address)", []);

    return result[0].toAddress();
  }

  try_sld(): ethereum.CallResult<Address> {
    let result = super.tryCall("sld", "sld():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  sldRegistrationHistory(
    param0: Bytes
  ): SldRegistrationManager__sldRegistrationHistoryResult {
    let result = super.call(
      "sldRegistrationHistory",
      "sldRegistrationHistory(bytes32):(uint80,uint80,uint96)",
      [ethereum.Value.fromFixedBytes(param0)]
    );

    return new SldRegistrationManager__sldRegistrationHistoryResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toBigInt()
    );
  }

  try_sldRegistrationHistory(
    param0: Bytes
  ): ethereum.CallResult<SldRegistrationManager__sldRegistrationHistoryResult> {
    let result = super.tryCall(
      "sldRegistrationHistory",
      "sldRegistrationHistory(bytes32):(uint80,uint80,uint96)",
      [ethereum.Value.fromFixedBytes(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new SldRegistrationManager__sldRegistrationHistoryResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toBigInt()
      )
    );
  }

  subdomainRegistrationNonce(param0: Bytes): BigInt {
    let result = super.call(
      "subdomainRegistrationNonce",
      "subdomainRegistrationNonce(bytes32):(uint256)",
      [ethereum.Value.fromFixedBytes(param0)]
    );

    return result[0].toBigInt();
  }

  try_subdomainRegistrationNonce(param0: Bytes): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "subdomainRegistrationNonce",
      "subdomainRegistrationNonce(bytes32):(uint256)",
      [ethereum.Value.fromFixedBytes(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  tld(): Address {
    let result = super.call("tld", "tld():(address)", []);

    return result[0].toAddress();
  }

  try_tld(): ethereum.CallResult<Address> {
    let result = super.tryCall("tld", "tld():(address)", []);
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

export class BurnSldCall extends ethereum.Call {
  get inputs(): BurnSldCall__Inputs {
    return new BurnSldCall__Inputs(this);
  }

  get outputs(): BurnSldCall__Outputs {
    return new BurnSldCall__Outputs(this);
  }
}

export class BurnSldCall__Inputs {
  _call: BurnSldCall;

  constructor(call: BurnSldCall) {
    this._call = call;
  }

  get _label(): string {
    return this._call.inputValues[0].value.toString();
  }

  get _parentNamehash(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }
}

export class BurnSldCall__Outputs {
  _call: BurnSldCall;

  constructor(call: BurnSldCall) {
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

  get _tld(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _sld(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _commitIntent(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get _oracle(): Address {
    return this._call.inputValues[3].value.toAddress();
  }

  get _validator(): Address {
    return this._call.inputValues[4].value.toAddress();
  }

  get _globalRules(): Address {
    return this._call.inputValues[5].value.toAddress();
  }

  get _payoutWallet(): Address {
    return this._call.inputValues[6].value.toAddress();
  }

  get _owner(): Address {
    return this._call.inputValues[7].value.toAddress();
  }
}

export class InitCall__Outputs {
  _call: InitCall;

  constructor(call: InitCall) {
    this._call = call;
  }
}

export class RegisterWithCommitCall extends ethereum.Call {
  get inputs(): RegisterWithCommitCall__Inputs {
    return new RegisterWithCommitCall__Inputs(this);
  }

  get outputs(): RegisterWithCommitCall__Outputs {
    return new RegisterWithCommitCall__Outputs(this);
  }
}

export class RegisterWithCommitCall__Inputs {
  _call: RegisterWithCommitCall;

  constructor(call: RegisterWithCommitCall) {
    this._call = call;
  }

  get _label(): string {
    return this._call.inputValues[0].value.toString();
  }

  get _secret(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }

  get _registrationLength(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get _parentNamehash(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }

  get _recipient(): Address {
    return this._call.inputValues[4].value.toAddress();
  }
}

export class RegisterWithCommitCall__Outputs {
  _call: RegisterWithCommitCall;

  constructor(call: RegisterWithCommitCall) {
    this._call = call;
  }
}

export class RegisterWithSignatureCall extends ethereum.Call {
  get inputs(): RegisterWithSignatureCall__Inputs {
    return new RegisterWithSignatureCall__Inputs(this);
  }

  get outputs(): RegisterWithSignatureCall__Outputs {
    return new RegisterWithSignatureCall__Outputs(this);
  }
}

export class RegisterWithSignatureCall__Inputs {
  _call: RegisterWithSignatureCall;

  constructor(call: RegisterWithSignatureCall) {
    this._call = call;
  }

  get _label(): string {
    return this._call.inputValues[0].value.toString();
  }

  get _registrationLength(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get _parentNamehash(): Bytes {
    return this._call.inputValues[2].value.toBytes();
  }

  get _recipient(): Address {
    return this._call.inputValues[3].value.toAddress();
  }

  get v(): i32 {
    return this._call.inputValues[4].value.toI32();
  }

  get r(): Bytes {
    return this._call.inputValues[5].value.toBytes();
  }

  get s(): Bytes {
    return this._call.inputValues[6].value.toBytes();
  }
}

export class RegisterWithSignatureCall__Outputs {
  _call: RegisterWithSignatureCall;

  constructor(call: RegisterWithSignatureCall) {
    this._call = call;
  }
}

export class RenewSldCall extends ethereum.Call {
  get inputs(): RenewSldCall__Inputs {
    return new RenewSldCall__Inputs(this);
  }

  get outputs(): RenewSldCall__Outputs {
    return new RenewSldCall__Outputs(this);
  }
}

export class RenewSldCall__Inputs {
  _call: RenewSldCall;

  constructor(call: RenewSldCall) {
    this._call = call;
  }

  get _label(): string {
    return this._call.inputValues[0].value.toString();
  }

  get _parentNamehash(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }

  get _registrationLength(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class RenewSldCall__Outputs {
  _call: RenewSldCall;

  constructor(call: RenewSldCall) {
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

export class SetAddressDiscountsCall extends ethereum.Call {
  get inputs(): SetAddressDiscountsCall__Inputs {
    return new SetAddressDiscountsCall__Inputs(this);
  }

  get outputs(): SetAddressDiscountsCall__Outputs {
    return new SetAddressDiscountsCall__Outputs(this);
  }
}

export class SetAddressDiscountsCall__Inputs {
  _call: SetAddressDiscountsCall;

  constructor(call: SetAddressDiscountsCall) {
    this._call = call;
  }

  get _parentNamehash(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get _addresses(): Array<Address> {
    return this._call.inputValues[1].value.toAddressArray();
  }

  get _discounts(): Array<SetAddressDiscountsCall_discountsStruct> {
    return this._call.inputValues[2].value.toTupleArray<
      SetAddressDiscountsCall_discountsStruct
    >();
  }
}

export class SetAddressDiscountsCall__Outputs {
  _call: SetAddressDiscountsCall;

  constructor(call: SetAddressDiscountsCall) {
    this._call = call;
  }
}

export class SetAddressDiscountsCall_discountsStruct extends ethereum.Tuple {
  get startTimestamp(): BigInt {
    return this[0].toBigInt();
  }

  get endTimestamp(): BigInt {
    return this[1].toBigInt();
  }

  get discountPercentage(): i32 {
    return this[2].toI32();
  }

  get isRegistration(): boolean {
    return this[3].toBoolean();
  }

  get isRenewal(): boolean {
    return this[4].toBoolean();
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

export class UpdateCommitIntentCall extends ethereum.Call {
  get inputs(): UpdateCommitIntentCall__Inputs {
    return new UpdateCommitIntentCall__Inputs(this);
  }

  get outputs(): UpdateCommitIntentCall__Outputs {
    return new UpdateCommitIntentCall__Outputs(this);
  }
}

export class UpdateCommitIntentCall__Inputs {
  _call: UpdateCommitIntentCall;

  constructor(call: UpdateCommitIntentCall) {
    this._call = call;
  }

  get _commitIntent(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class UpdateCommitIntentCall__Outputs {
  _call: UpdateCommitIntentCall;

  constructor(call: UpdateCommitIntentCall) {
    this._call = call;
  }
}

export class UpdateGlobalRegistrationStrategyCall extends ethereum.Call {
  get inputs(): UpdateGlobalRegistrationStrategyCall__Inputs {
    return new UpdateGlobalRegistrationStrategyCall__Inputs(this);
  }

  get outputs(): UpdateGlobalRegistrationStrategyCall__Outputs {
    return new UpdateGlobalRegistrationStrategyCall__Outputs(this);
  }
}

export class UpdateGlobalRegistrationStrategyCall__Inputs {
  _call: UpdateGlobalRegistrationStrategyCall;

  constructor(call: UpdateGlobalRegistrationStrategyCall) {
    this._call = call;
  }

  get _strategy(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class UpdateGlobalRegistrationStrategyCall__Outputs {
  _call: UpdateGlobalRegistrationStrategyCall;

  constructor(call: UpdateGlobalRegistrationStrategyCall) {
    this._call = call;
  }
}

export class UpdateGracePeriodCall extends ethereum.Call {
  get inputs(): UpdateGracePeriodCall__Inputs {
    return new UpdateGracePeriodCall__Inputs(this);
  }

  get outputs(): UpdateGracePeriodCall__Outputs {
    return new UpdateGracePeriodCall__Outputs(this);
  }
}

export class UpdateGracePeriodCall__Inputs {
  _call: UpdateGracePeriodCall;

  constructor(call: UpdateGracePeriodCall) {
    this._call = call;
  }

  get _gracePeriodInSeconds(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class UpdateGracePeriodCall__Outputs {
  _call: UpdateGracePeriodCall;

  constructor(call: UpdateGracePeriodCall) {
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

export class UpdatePaymentAddressCall extends ethereum.Call {
  get inputs(): UpdatePaymentAddressCall__Inputs {
    return new UpdatePaymentAddressCall__Inputs(this);
  }

  get outputs(): UpdatePaymentAddressCall__Outputs {
    return new UpdatePaymentAddressCall__Outputs(this);
  }
}

export class UpdatePaymentAddressCall__Inputs {
  _call: UpdatePaymentAddressCall;

  constructor(call: UpdatePaymentAddressCall) {
    this._call = call;
  }

  get _addr(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class UpdatePaymentAddressCall__Outputs {
  _call: UpdatePaymentAddressCall;

  constructor(call: UpdatePaymentAddressCall) {
    this._call = call;
  }
}

export class UpdatePaymentPercentCall extends ethereum.Call {
  get inputs(): UpdatePaymentPercentCall__Inputs {
    return new UpdatePaymentPercentCall__Inputs(this);
  }

  get outputs(): UpdatePaymentPercentCall__Outputs {
    return new UpdatePaymentPercentCall__Outputs(this);
  }
}

export class UpdatePaymentPercentCall__Inputs {
  _call: UpdatePaymentPercentCall;

  constructor(call: UpdatePaymentPercentCall) {
    this._call = call;
  }

  get _percent(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class UpdatePaymentPercentCall__Outputs {
  _call: UpdatePaymentPercentCall;

  constructor(call: UpdatePaymentPercentCall) {
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

export class UpdateSignerCall extends ethereum.Call {
  get inputs(): UpdateSignerCall__Inputs {
    return new UpdateSignerCall__Inputs(this);
  }

  get outputs(): UpdateSignerCall__Outputs {
    return new UpdateSignerCall__Outputs(this);
  }
}

export class UpdateSignerCall__Inputs {
  _call: UpdateSignerCall;

  constructor(call: UpdateSignerCall) {
    this._call = call;
  }

  get _signer(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _status(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }
}

export class UpdateSignerCall__Outputs {
  _call: UpdateSignerCall;

  constructor(call: UpdateSignerCall) {
    this._call = call;
  }
}
