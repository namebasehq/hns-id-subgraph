import { BigInt, Address, Bytes } from "@graphprotocol/graph-ts";
import {
  Transfer as TransferEvent,
  Approval as ApprovalEvent,
} from "../generated/WHNS/ERC20";
import { TokenTransfer, Account, WhnsToken } from "../generated/schema";

function getOrCreateAccount(address: Address): Account {
  let accountId = address.toHexString();
  let account = Account.load(accountId);

  if (!account) {
    account = new Account(accountId);

    account.WhnsBalance = BigInt.fromI32(0);
    account.save();
  }

  return account;
}

function getOrCreateWhnsToken(): WhnsToken {

  let whnsToken = WhnsToken.load("WHNS");

  if (!whnsToken) {
    whnsToken = new WhnsToken("WHNS");

    whnsToken.totalSupply = BigInt.fromI32(0);
    whnsToken.save();
  }

  return whnsToken;

}

export function handleTransfer(event: TransferEvent): void {
  let zeroAddress = "0x0000000000000000000000000000000000000000";

  let from = getOrCreateAccount(event.params.from);
  let to = getOrCreateAccount(event.params.to);

  // Update balances
  if (from.id != zeroAddress) {
    from.WhnsBalance = from.WhnsBalance.minus(event.params.value);
    from.save();
  }
  else {
    let whnsToken = getOrCreateWhnsToken();
    whnsToken.totalSupply = whnsToken.totalSupply.plus(event.params.value);
    whnsToken.save();
  }

  
  if (to.id != zeroAddress) {
    to.WhnsBalance = to.WhnsBalance.plus(event.params.value);
    to.save();
  }
  else {
    let whnsToken = getOrCreateWhnsToken();
    whnsToken.totalSupply = whnsToken.totalSupply.minus(event.params.value);
    whnsToken.save();
  }

  // Create transfer event
  let transfer = new TokenTransfer(
    event.transaction.hash.toHexString() + "-" + event.logIndex.toString()
  );

  transfer.from = from.id;
  transfer.to = to.id;
  transfer.value = event.params.value;
  transfer.timestamp = event.block.timestamp;
  transfer.blockNumber = event.block.number;
  transfer.transactionHash = event.transaction.hash;

  transfer.save();
}

export function handleApproval(event: ApprovalEvent): void {}
