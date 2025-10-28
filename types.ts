export type Page = 'Dashboard' | 'Transactions' | 'Governance' | 'Security';

export interface UserAccount {
  address: string;
  balance: number;
}

export type TransactionStatus = 'Completed' | 'Pending' | 'Failed';
export type TransactionAction = 'Deposit' | 'Withdrawal' | 'Transfer In' | 'Transfer Out';

export interface Transaction {
  id: string;
  date: string;
  action: TransactionAction;
  amount: number;
  from: string;
  to: string;
  status: TransactionStatus;
}

export interface Proposal {
  id: string;
  title: string;
  description: string;
  proposer: string;
  endDate: string;
  votesFor: number;
  votesAgainst: number;
  status: 'Active' | 'Passed' | 'Failed';
}

export type TransactionType = 'Deposit' | 'Withdraw' | 'Transfer';

export interface BalanceData {
  name: string;
  balance: number;
}

export interface TokenHolder {
  address: string;
  balance: number;
}