import { log, store, BigInt } from "@graphprotocol/graph-ts";
import {
  EnabledSet as EnabledSetEvent,
  LengthCostSet as LengthCostSetEvent,
  MultiYearDiscountSet as MultiYearDiscountSetEvent,
  PremiumNameSet as PremiumNameSetEvent,
  ReservedNameSet as ReservedNameSetEvent
} from "../generated/DefaultRegistrationStrategy/DefaultRegistrationStrategy"
import {
  EnabledSet,
  LengthCostSet,
  MultiYearDiscountSet,
  PremiumNameSet,
  PremiumPrice,
  ReservedName,
  ReservedNameSet,
  SaleSettings,
  Tld
} from "../generated/schema"


export function handleEnabledSet(event: EnabledSetEvent): void {
  let tldId = event.params._tokenNamehash.toHexString();
  let tld = Tld.load(tldId);

  if (tld) {
    let saleSetting = SaleSettings.load(tldId);
    if (!saleSetting) {
      saleSetting = new SaleSettings(tldId); // Initialize if doesn't exist
      saleSetting.tld = tldId; // Assign the tld field to the SaleSettings entity
    }

    saleSetting.enabled = event.params._enabled;
    saleSetting.save();
  }
}

export function handleLengthCostSet(event: LengthCostSetEvent): void {
  let tldId = event.params._tokenNamehash.toHexString();
  let tld = Tld.load(tldId);

  if (tld) {
    let saleSetting = SaleSettings.load(tldId);
    if (!saleSetting) {
      saleSetting = new SaleSettings(tldId); // Initialize if doesn't exist
      saleSetting.tld = tldId; // Assign the tld field to the SaleSettings entity
    }

    saleSetting.prices = event.params._prices;
    saleSetting.save();
  }
}



export function handleMultiYearDiscountSet(
  event: MultiYearDiscountSetEvent
): void {
  let entity = new MultiYearDiscountSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._tokenNamehash = event.params._tokenNamehash
  entity._discounts = event.params._discounts

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePremiumNameSet(event: PremiumNameSetEvent): void {
  let tldId = event.params._tokenNamehash.toHexString();
  let saleSetting = SaleSettings.load(tldId);

  if (!saleSetting) {
    saleSetting = new SaleSettings(tldId);
    saleSetting.tld = tldId;  // Set the relation to the TLD entity
    // Initialize other fields if necessary
    saleSetting.save();
  }

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
    premiumPrice.save();
  }
}

export function handleReservedNameSet(event: ReservedNameSetEvent): void {
  let tldId = event.params._tokenNamehash.toHexString();
  let saleSetting = SaleSettings.load(tldId);

  if (!saleSetting) {
    saleSetting = new SaleSettings(tldId);
    saleSetting.tld = tldId;  // Set the relation to the TLD entity
    // Initialize other fields if necessary
    saleSetting.save();
  }

  // Process the reserved name
  let reservedNameId = tldId.concat('-').concat(event.params._label);

  let reservedName = ReservedName.load(reservedNameId);

  // If the address is the zero address, remove the entity, otherwise create or update it.
  if (event.params._claimant.toHexString() == '0x0000000000000000000000000000000000000000') {
    if (reservedName) {
      store.remove('ReservedName', reservedNameId);
    }
  } else {
    if (!reservedName) {
      reservedName = new ReservedName(reservedNameId);
    }
    reservedName.saleSettings = saleSetting.id;
    reservedName.label = event.params._label;
    reservedName.claimant = event.params._claimant;
    reservedName.save();
  }
}
