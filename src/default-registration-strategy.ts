import { log, store, BigInt } from "@graphprotocol/graph-ts";
import {
  EnabledSet as EnabledSetEvent,
  LengthCostSet as LengthCostSetEvent,
  MultiYearDiscountSet as MultiYearDiscountSetEvent,
  PremiumNameSet as PremiumNameSetEvent,
  ReservedNameSet as ReservedNameSetEvent
} from "../generated/DefaultRegistrationStrategy/DefaultRegistrationStrategy"
import {
  PremiumPrice,
  ReservedName,
  SaleSetting,
  Tld,
  Account
} from "../generated/schema"
import { createPremiumNameEvent, createReservedNameEvent, createTLDEvent } from "./entity-helpers";
import { toAddress, toPaddedHexString, toPaddedHexStringFromBigint } from "./utils";


export function handleEnabledSet(event: EnabledSetEvent): void {
  let tldId = toPaddedHexString(event.params._tokenNamehash);
  let tld = Tld.load(tldId);

  if (tld) {
    let saleSetting = SaleSetting.load(tldId);
    if (!saleSetting) {
      saleSetting = new SaleSetting(tldId); // Initialize if doesn't exist
      saleSetting.tld = tldId; // Assign the tld field to the SaleSettings entity
    }

    saleSetting.blockNumber = event.block.number;
    saleSetting.blockTimestamp = event.block.timestamp;
    saleSetting.transactionHash = event.transaction.hash;

    saleSetting.enabled = event.params._enabled;
    saleSetting.save();

    createTLDEvent(tld.tokenId, event.transaction.hash, event.block.timestamp);
  }
}

export function handleLengthCostSet(event: LengthCostSetEvent): void {
  let tldId = toPaddedHexString(event.params._tokenNamehash);
  let tld = Tld.load(tldId);

  if (tld) {
    let saleSetting = SaleSetting.load(tldId);
    if (!saleSetting) {
      saleSetting = new SaleSetting(tldId); // Initialize if doesn't exist
      saleSetting.tld = tldId; // Assign the tld field to the SaleSettings entity
      saleSetting.enabled = false;
    }
    saleSetting.blockNumber = event.block.number;
    saleSetting.blockTimestamp = event.block.timestamp;
    saleSetting.transactionHash = event.transaction.hash;

    saleSetting.prices = event.params._prices;
    saleSetting.save();

    createTLDEvent(tld.tokenId, event.transaction.hash, event.block.timestamp);
  }
}

export function handleMultiYearDiscountSet(
  event: MultiYearDiscountSetEvent
): void {

  let tldId = toPaddedHexString(event.params._tokenNamehash);
  let tld = Tld.load(tldId);

  if (tld) {
    let saleSetting = SaleSetting.load(tldId);
    if (!saleSetting) {
      saleSetting = new SaleSetting(tldId); // Initialize if doesn't exist
      saleSetting.tld = tldId; // Assign the tld field to the SaleSettings entity
      saleSetting.enabled = false;
    }

    saleSetting.blockNumber = event.block.number;
    saleSetting.blockTimestamp = event.block.timestamp;
    saleSetting.transactionHash = event.transaction.hash;

    saleSetting.discounts = event.params._discounts;
    saleSetting.save();

    createTLDEvent(tld.tokenId, event.transaction.hash, event.block.timestamp);
  }
}

export function handlePremiumNameSet(event: PremiumNameSetEvent): void {
  let tldId = toPaddedHexString(event.params._tokenNamehash);

  let tld = Tld.load(tldId);
  let saleSetting = SaleSetting.load(tldId);

  if (!saleSetting) {
    saleSetting = new SaleSetting(tldId);
    saleSetting.tld = tldId;  // Set the relation to the TLD entity
    saleSetting.enabled = false;

  }

  saleSetting.blockNumber = event.block.number;
  saleSetting.blockTimestamp = event.block.timestamp;
  saleSetting.transactionHash = event.transaction.hash;
    saleSetting.save();
  // Process the premium price
  let premiumPriceId = tldId.concat('-').concat(event.params._label);
  
  let premiumPrice = PremiumPrice.load(premiumPriceId);

  // If the price is zero, remove the entity, otherwise create or update it.
  if (event.params._price.equals(BigInt.fromI32(0))) {
    if (premiumPrice) {
      store.remove("PremiumPrice", premiumPriceId);
    }
  } else {
    if (!premiumPrice) {
      premiumPrice = new PremiumPrice(premiumPriceId);
    }
    premiumPrice.saleSettings = saleSetting.id;
    premiumPrice.label = event.params._label;
    premiumPrice.price = event.params._price;

    if(tld) {
      premiumPrice.tld = tld.id;
      createPremiumNameEvent(tld.tokenId, event.transaction.hash, event.block.timestamp);

    }
    premiumPrice.save();
  }
}

export function handleReservedNameSet(event: ReservedNameSetEvent): void {
  let tldId = toPaddedHexString(event.params._tokenNamehash);
  let saleSetting = SaleSetting.load(tldId);



  if (!saleSetting) {
    saleSetting = new SaleSetting(tldId);
    saleSetting.tld = tldId;  // Set the relation to the TLD entity
    saleSetting.enabled = false;
  }
  

  saleSetting.blockNumber = event.block.number;
  saleSetting.blockTimestamp = event.block.timestamp;
  saleSetting.transactionHash = event.transaction.hash;
  saleSetting.save();

  
  // Process the reserved name
  let reservedNameId = tldId.concat('-').concat(event.params._label);

  let reservedName = ReservedName.load(reservedNameId);

  // If the address is the zero address, remove the entity, otherwise create or update it.
  if (toAddress(event.params._claimant) == '0x0000000000000000000000000000000000000000') {
    if (reservedName) {
      store.remove('ReservedName', reservedNameId);
    }
  } else {
    if (!reservedName) {
      reservedName = new ReservedName(reservedNameId);
    }
    reservedName.saleSettings = saleSetting.id;
    reservedName.label = event.params._label;

    let claimantAccount = Account.load(toAddress(event.params._claimant));
    if (claimantAccount == null) {
      claimantAccount = new Account(toAddress(event.params._claimant));
      claimantAccount.WhnsBalance = BigInt.fromI32(0)
      claimantAccount.save();
    }

    reservedName.claimant = claimantAccount.id;

    

    reservedName.tld = tldId;
    reservedName.save();

    createReservedNameEvent(BigInt.fromUnsignedBytes(event.params._tokenNamehash), event.transaction.hash, event.block.timestamp);
  }
}
