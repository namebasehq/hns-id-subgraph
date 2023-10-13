import {
  DiscountSet as DiscountSetEvent,
  Initialized as InitializedEvent,
  NewGracePeriod as NewGracePeriodEvent,
  NewLabelValidator as NewLabelValidatorEvent,
  NewUsdOracle as NewUsdOracleEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  PaymentSent as PaymentSentEvent,
  RegisterSld as RegisterSldEvent,
  RenewSld as RenewSldEvent,
} from "../generated/SldRegistrationManager/SldRegistrationManager";
import {
  Account,
  Address,
  Resolver,
  ResolverHistory,
  Sld,
  Tld,
} from "../generated/schema";
import { concat } from "./utils";
import { BigInt, ByteArray, Bytes, crypto } from "@graphprotocol/graph-ts";
import { HandshakeSld } from "../generated/HandshakeSld/HandshakeSld";

export function handleRegisterSld(event: RegisterSldEvent): void {
  // Initialize common variables
  let label = event.params._label;
  let parentHash = event.params._tldNamehash.toHexString();
  let labelHash = crypto.keccak256(ByteArray.fromUTF8(label));
  let nameHash = crypto.keccak256(
    concat(ByteArray.fromHexString(parentHash), labelHash)
  );

  // Account Entity
  let account = new Account(event.transaction.from.toHex());
  account.save();

  // Load parent TLD to get its label
  let parentTld = Tld.load(parentHash);
  if (parentTld) {
    let parentLabel = parentTld.label;

    // Construct the full domain name
    let fullName = label + "." + parentLabel;

    // Create and save the resolver entity
    let resolverId = nameHash.toHexString();
    let resolverEntity = new Resolver(resolverId);

    // All EVM coin types. Can initialise other fields here if required.
    const defaultCoinTypes = [60, 614, 9006, 966, 9001, 9000, 9005];

    for (let i = 0; i < defaultCoinTypes.length; i++) {
      let coinType = defaultCoinTypes[i];
      let addressId = resolverId.concat("-").concat(coinType.toString());
      let addressEntity = new Address(addressId);
      addressEntity.cointype = BigInt.fromI32(coinType); // Using BigInt.fromI32
      addressEntity.address = ""; // TODO: get owner or set using transfer event for the SLD
      addressEntity.resolver = resolverEntity.id;
      addressEntity.save();
    }

    // default version number
    resolverEntity.version = BigInt.fromI32(0);

    resolverEntity.save();

    // Create ResolverHistory Entity
    let resolverHistoryId = resolverId
      .concat("-")
      .concat(event.block.timestamp.toString());
    let resolverHistoryEntity = new ResolverHistory(resolverHistoryId);
    resolverHistoryEntity.resolver = resolverEntity.id;
    resolverHistoryEntity.changeType = "added";
    resolverHistoryEntity.changedAt = event.block.timestamp;
    resolverHistoryEntity.save();

    // Sld Entity
    let domain = new Sld(nameHash.toHex());
    domain.fullName = fullName;
    domain.owner = account.id;
    domain.registrant = account.id;
    domain.parentTld = parentTld.id; // we can set this here but will get overwritten by the transfer event
    domain.blockNumber = event.block.number;
    domain.blockTimestamp = event.block.timestamp;
    domain.transactionHash = event.transaction.hash;
    domain.expiry = event.params._expiry;
    domain.label = event.params._label;
    domain.save();
  }
}

export function handleDiscountSet(event: DiscountSetEvent): void {}

export function handleInitialized(event: InitializedEvent): void {}

export function handleNewGracePeriod(event: NewGracePeriodEvent): void {}

export function handleNewLabelValidator(event: NewLabelValidatorEvent): void {}

export function handleNewUsdOracle(event: NewUsdOracleEvent): void {}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {}

export function handlePaymentSent(event: PaymentSentEvent): void {}

export function handleRenewSld(event: RenewSldEvent): void {
  // Calculate nameHash same as handleRegisterSld
  let label = event.params._label;
  let parentHash = event.params._tldNamehash.toHexString();
  let labelHash = crypto.keccak256(ByteArray.fromUTF8(label));
  let nameHash = crypto.keccak256(
    concat(ByteArray.fromHexString(parentHash), labelHash)
  );

  // Load the existing Sld entity using nameHash
  let sldEntity = Sld.load(nameHash.toHex());

  // If the Sld entity exists, update its expiry
  // it should alwyas exist, but just in case
  if (sldEntity != null) {
    sldEntity.expiry = event.params._expiry;
    sldEntity.save();
  }
}
