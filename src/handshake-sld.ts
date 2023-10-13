import {
  ResolverSet as ResolverSetEvent,
  RoyaltyPayoutAddressSet as RoyaltyPayoutAddressSetEvent,
  RoyaltyPayoutAmountSet as RoyaltyPayoutAmountSetEvent,
  Transfer as TransferEvent
} from "../generated/HandshakeSld/HandshakeSld"
import {
  Account,
  Royalty,
  RoyaltyHistory,
  Sld,
  Tld
} from "../generated/schema"



// TODO: will need to implement this
export function handleResolverSet(event: ResolverSetEvent): void {

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
      historyEntity.blockTimestamp = event.block.timestamp;
      historyEntity.transactionHash = event.transaction.hash;
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
      historyEntity.blockTimestamp = event.block.timestamp;
      historyEntity.transactionHash = event.transaction.hash;
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
    // Create or load the Account entity for the new owner
    let newOwnerId = event.params.to.toHex();
    let newOwnerAccount = Account.load(newOwnerId);
    if (newOwnerAccount == null) {
      newOwnerAccount = new Account(newOwnerId);
    }
    
    // Other properties can be set or updated for the new owner account here
    newOwnerAccount.save();

    // Update the owner field on the Sld entity
    sld.owner = newOwnerAccount.id;

    // Save the updated Sld entity back to the store
    sld.save();
  }
}

