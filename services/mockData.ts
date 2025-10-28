import type { UserAccount, Transaction, Proposal, BalanceData, TokenHolder } from '../types';

export const MOCK_ACCOUNT: UserAccount = {
  address: '0x1A2b3C4d5E6f7A8b9C0d1E2f3A4b5C6d7E8f9A0b',
  balance: 12500.75,
};

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '0xabc123',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleString(),
    action: 'Deposit',
    amount: 5000.00,
    from: '0xExternal...Bank',
    to: MOCK_ACCOUNT.address,
    status: 'Completed',
  },
  {
    id: '0xdef456',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleString(),
    action: 'Transfer Out',
    amount: 1500.25,
    from: MOCK_ACCOUNT.address,
    to: '0x9F8e7D6c5B4a3C2b1A0d9E8f7G6h5I4j3K2l1M',
    status: 'Completed',
  },
    {
    id: '0xfeed78',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleString(),
    action: 'Deposit',
    amount: 2500,
    from: '0xExternal...Bank',
    to: '0x9F8e7D6c5B4a3C2b1A0d9E8f7G6h5I4j3K2l1M',
    status: 'Completed',
  },
  {
    id: '0xghi789',
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toLocaleString(),
    action: 'Withdrawal',
    amount: 1000.00,
    from: MOCK_ACCOUNT.address,
    to: '0xExternal...Bank',
    status: 'Completed',
  },
    {
    id: '0xjkl012',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleString(),
    action: 'Transfer In',
    amount: 10000.00,
    from: '0x7A6b5C4d3E2f1A0b9C8d7E6f5G4h3I2j1K0l9M',
    to: MOCK_ACCOUNT.address,
    status: 'Completed',
  },
];

export const MOCK_PROPOSALS: Proposal[] = [
  {
    id: 'PIP-001',
    title: 'Increase Interest Rate for Staking Rewards',
    description: 'This proposal suggests increasing the annual percentage yield (APY) for staked assets from 4.5% to 5.5% to incentivize long-term holding and platform stability.',
    proposer: '0xDeFi...DAO',
    endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    votesFor: 1250345,
    votesAgainst: 123456,
    status: 'Active',
  },
  {
    id: 'PIP-002',
    title: 'Integrate New Cross-Chain Bridge',
    description: 'Proposal to allocate development funds to integrate a new bridge for seamless asset transfer between Ethereum and a partner blockchain, enhancing liquidity and user experience.',
    proposer: '0xCore...Dev',
    endDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    votesFor: 890123,
    votesAgainst: 45678,
    status: 'Active',
  },
  {
    id: 'PIP-003',
    title: 'Update UI/UX for Mobile App',
    description: 'A community-led proposal to revamp the mobile application interface for a more intuitive and modern user experience. This passed with overwhelming support.',
    proposer: '0xComm...Rep',
    endDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    votesFor: 2109876,
    votesAgainst: 54321,
    status: 'Passed',
  },
];

export const MOCK_BALANCE_HISTORY: BalanceData[] = [
  { name: 'T-4', balance: 10000 },
  { name: 'T-3', balance: 9000 },
  { name: 'T-2', balance: 7500 },
  { name: 'T-1', balance: 12500 },
  { name: 'Today', balance: 12500.75 },
];

export const MOCK_TOKEN_HOLDERS: TokenHolder[] = [
    { address: '0xDeFi...DAO', balance: 2500000 },
    { address: '0xWhale...001', balance: 1800000 },
    { address: '0xEarly...vst', balance: 1200000 },
    { address: '0xCore...Dev', balance: 950000 },
    { address: '0xPart...ner', balance: 750000 },
    { address: '0xComm...Pool', balance: 500000 },
];