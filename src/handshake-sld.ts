import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  ResolverSet as ResolverSetEvent,
  RoyaltyPayoutAddressSet as RoyaltyPayoutAddressSetEvent,
  RoyaltyPayoutAmountSet as RoyaltyPayoutAmountSetEvent,
  Transfer as TransferEvent
} from "../generated/HandshakeSld/HandshakeSld"
import {
  Account,
  Approval,
  ApprovalForAll,
  OwnershipTransferred,
  ResolverSet,
  Royalty,
  RoyaltyHistory,
  RoyaltyPayoutAddressSet,
  RoyaltyPayoutAmountSet,
  Sld,
  Tld,
  Transfer
} from "../generated/schema"

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.approved = event.params.approved
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.operator = event.params.operator
  entity.approved = event.params.approved

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleResolverSet(event: ResolverSetEvent): void {
  let entity = new ResolverSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._nftNamehash = event.params._nftNamehash
  entity._resolver = event.params._resolver

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoyaltyPayoutAddressSet(event: RoyaltyPayoutAddressSetEvent): void {
  let tldId = event.params._nftNamehash.toHexString();
  let tldEntity = Tld.load(tldId);
  if (tldEntity) {
    let royaltyEntity = Royalty.load(tldEntity.royalty);
    if (royaltyEntity) {
      // Create a new RoyaltyHistory entity
      let historyId = event.transaction.hash.concatI32(event.logIndex.toI32()).toHex();
      let historyEntity = new RoyaltyHistory(historyId);
      historyEntity.tld = tldEntity.id;
      historyEntity.percentage = royaltyEntity.percentage;
      historyEntity.payoutAddress = event.params._payoutAddress.toHex();
      historyEntity.blockNumber = event.block.number;
      historyEntity.transactionID = event.transaction.hash;
      historyEntity.transactionDateTime = event.block.timestamp;
      historyEntity.save();

      // Update the current Royalty entity
      royaltyEntity.payoutAddress = event.params._payoutAddress.toHex();
      royaltyEntity.save();
    }
  }
}

export function handleRoyaltyPayoutAmountSet(event: RoyaltyPayoutAmountSetEvent): void {
  let tldId = event.params._nftNamehash.toHexString();
  let tldEntity = Tld.load(tldId);
  if (tldEntity) {
    let royaltyEntity = Royalty.load(tldEntity.royalty);
    if (royaltyEntity) {
      // Create a new RoyaltyHistory entity
      let historyId = event.transaction.hash.concatI32(event.logIndex.toI32()).toHex();
      let historyEntity = new RoyaltyHistory(historyId);
      historyEntity.tld = tldEntity.id;
      historyEntity.percentage = event.params._amount;
      historyEntity.payoutAddress = royaltyEntity.payoutAddress;
      historyEntity.blockNumber = event.block.number;
      historyEntity.transactionID = event.transaction.hash;
      historyEntity.transactionDateTime = event.block.timestamp;
      historyEntity.save();

      // Update the current Royalty entity
      royaltyEntity.percentage = event.params._amount;
      royaltyEntity.save();
    }
  }
}



export function handleTransfer(event: TransferEvent): void {
  // Convert the tokenId to its hex string representation
  let sldId = event.params.tokenId.toHexString();

  // Load the existing Sld entity from the store
  let sld = Sld.load(sldId);

  // Check if the Sld entity exists
  if (sld !== null) {
    // Create or update the Account entity for the new owner
    let newOwnerAccount = new Account(event.params.to.toHex());
    newOwnerAccount.save();

    // Update the owner field on the Sld entity
    sld.owner = newOwnerAccount.id;

    // Save the updated Sld entity back to the store
    sld.save();
  }
}
