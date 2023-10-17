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
  RenewalEvent,
  Resolver,
  ResolverHistory,
  Sld,
  Tld,
} from "../generated/schema";
import { concat, createOrUpdateResolver } from "./utils";
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

    let resolverId = nameHash.toHexString();
    createOrUpdateResolver(resolverId, event.block.timestamp);
    // Create ResolverHistory Entity
    let resolverHistoryId = resolverId
      .concat("-")
      .concat(event.block.timestamp.toString());
    let resolverHistoryEntity = new ResolverHistory(resolverHistoryId);
    resolverHistoryEntity.resolver = resolverId;
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
    domain.resolver = resolverId;
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
  // Existing code for calculating nameHash
  let label = event.params._label;
  let parentHash = event.params._tldNamehash.toHexString();
  let labelHash = crypto.keccak256(ByteArray.fromUTF8(label));
  let nameHash = crypto.keccak256(
    concat(ByteArray.fromHexString(parentHash), labelHash)
  );

  // Load the existing Sld entity using nameHash
  let sldEntity = Sld.load(nameHash.toHex());

  // If the Sld entity exists, update its expiry
  // it should always exist, but just in case
  if (sldEntity != null) {
    sldEntity.expiry = event.params._expiry;

    // Create a new RenewalEvent entity
    let renewalEventId =
      event.transaction.hash.toHex() + "-" + event.logIndex.toString();
    let renewalEvent = new RenewalEvent(renewalEventId);

    let renewerAccountId = event.transaction.from.toHex();
    let renewerAccount = Account.load(renewerAccountId);

    if (!renewerAccount) {
      renewerAccount = new Account(renewerAccountId);
      renewerAccount.save();
    }

    // Populate RenewalEvent fields
    renewalEvent.expiry = event.params._expiry;
    renewalEvent.sld = sldEntity.id;
    renewalEvent.owner = sldEntity.owner;
    renewalEvent.renewer = renewerAccountId;
    renewalEvent.blockNumber = event.block.number;
    renewalEvent.blockTimestamp = event.block.timestamp;
    renewalEvent.transactionHash = event.transaction.hash;

    // Save RenewalEvent entity
    renewalEvent.save();

    // Save Sld entity (with updated expiry)
    sldEntity.save();
  }
}
