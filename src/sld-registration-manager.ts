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
  Renewal,
  ResolverHistory,
  Sld,
  Tld,
} from "../generated/schema";
import { createSLDEvent } from "./entity-helpers";
import {
  concat,
  createOrUpdateResolver,
  toAddress,
  toPaddedHexString,
} from "./utils";
import { BigInt, ByteArray, Bytes, crypto, log } from "@graphprotocol/graph-ts";

export function handleRegisterSld(event: RegisterSldEvent): void {
  // Initialize common variables
  let label = event.params._label;
  let parentHash = toPaddedHexString(event.params._tldNamehash);
  let labelHash = crypto.keccak256(ByteArray.fromUTF8(label));
  let nameHash = crypto.keccak256(concat(event.params._tldNamehash, labelHash));

  // Account Entity
  let account = Account.load(toAddress(event.transaction.from));

  if (!account) {
    account = new Account(toAddress(event.transaction.from));
    account.WhnsBalance = BigInt.fromI32(0);
    account.save();
  }

  // Load parent TLD to get its label
  let parentTld = Tld.load(parentHash);
  if (parentTld) {
    let parentLabel = parentTld.label;

    // Construct the full domain name
    let fullName = label + "." + parentLabel;

    let domain = Sld.load(toPaddedHexString(nameHash));

    if (!domain) {
      domain = new Sld(toPaddedHexString(nameHash));
      domain.resolverVersion = BigInt.fromI32(0);
      domain.tokenId = BigInt.fromUnsignedBytes(nameHash);
    }

    let resolverId = toPaddedHexString(nameHash)
      .concat("-")
      .concat(domain.resolverVersion.toString());

    let resolverHistoryId = resolverId
      .concat("-")
      .concat(event.block.timestamp.toString());

    // Create ResolverHistory Entity
    let resolverHistoryEntity = new ResolverHistory(resolverHistoryId);
    resolverHistoryEntity.resolver = resolverId;
    resolverHistoryEntity.changeType = "added";
    resolverHistoryEntity.changedAt = event.block.timestamp;
    resolverHistoryEntity.save();

    domain.renewalCount = BigInt.fromI32(0);
    domain.fullName = fullName;
    domain.registrant = account.id;
    domain.parentTld = parentTld.id;
    domain.registrationBlockNumber = event.block.number;
    domain.registrationTimestamp = event.block.timestamp;
    domain.registrationTransactionHash = event.transaction.hash;
    domain.lastUpdateBlockNumber = event.block.number;
    domain.lastUpdateTimestamp = event.block.timestamp;
    domain.lastUpdateTransactionHash = event.transaction.hash;
    domain.expirationTimestamp = event.params._expiry;
    domain.label = event.params._label;
    domain.resolver = resolverId;
    domain.transferCount = BigInt.fromI32(0);

    domain.save();

    log.info(
      "TAKE MY BREATH AWAY - NEW REGISTRATION 🎸\n" +
        "--------------------------------\n" +
        "Domain: {}\n" +
        "Token ID: {}\n" +
        "Registrant: {}\n" +
        "Parent TLD: {}\n" +
        "Registration Block: {}\n" +
        "Expiry: {}\n" +
        "Resolver ID: {}\n" +
        "--------------------------------\n" +
        "GONNA TAKE IT RIGHT INTO THE DANGER ZONE! 🚀\n",
      [
        fullName,
        domain.tokenId.toHexString(),
        account.id,
        parentLabel,
        event.block.number.toString(),
        event.params._expiry.toString(),
        resolverId,
      ]
    );

    createSLDEvent(
      domain.tokenId,
      event.transaction.hash,
      event.block.timestamp
    );
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
  let parentHash = toPaddedHexString(event.params._tldNamehash);
  let labelHash = crypto.keccak256(ByteArray.fromUTF8(label));
  let nameHash = crypto.keccak256(concat(event.params._tldNamehash, labelHash));

  // Load the existing Sld entity using nameHash
  let sldEntity = Sld.load(toPaddedHexString(nameHash));

  // If the Sld entity exists, update its expiry
  // it should always exist, but just in case
  if (sldEntity != null) {
    sldEntity.expirationTimestamp = event.params._expiry;
    sldEntity.renewalCount = sldEntity.renewalCount.plus(BigInt.fromI32(1));

    // Create a new RenewalEvent entity
    let renewalEventId = sldEntity.id + "-" + sldEntity.renewalCount.toString();
    let renewalEvent = new Renewal(renewalEventId);

    let renewerAccountId = toAddress(event.transaction.from);
    let renewerAccount = Account.load(renewerAccountId);

    if (!renewerAccount) {
      renewerAccount = new Account(renewerAccountId);
      renewerAccount.WhnsBalance = BigInt.fromI32(0);
      renewerAccount.save();
    }

    if (sldEntity.owner) {
      // Populate RenewalEvent fields
      renewalEvent.expirationTimestamp = event.params._expiry;
      renewalEvent.sld = sldEntity.id;
      renewalEvent.owner = sldEntity.owner!;
      renewalEvent.renewer = renewerAccountId;
      renewalEvent.blockNumber = event.block.number;
      renewalEvent.blockTimestamp = event.block.timestamp;
      renewalEvent.transactionHash = event.transaction.hash;

      // Save RenewalEvent entity
      renewalEvent.save();

      // Save Sld entity (with updated expiry)
      sldEntity.save();

      createSLDEvent(
        sldEntity.tokenId,
        event.transaction.hash,
        event.block.timestamp
      );
    } else {
      throw new Error("Owner is not set for SLD: " + sldEntity.id);
    }
  }
}
