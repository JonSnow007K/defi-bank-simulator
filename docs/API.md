# API Reference

## Table of Contents
1. [Smart Contract APIs](#smart-contract-apis)
2. [Frontend APIs](#frontend-apis)
3. [Hooks API](#hooks-api)
4. [Services API](#services-api)

## Smart Contract APIs

### Bank Contract

#### deposit()
Deposit funds into the bank.

```solidity
function deposit() external payable
```

**Parameters:**
- None (sends ether with transaction)

**Returns:** None

**Events:**
```solidity
event Deposit(address indexed user, uint256 amount, uint256 timestamp);
```

**Example Usage:**
```typescript
const tx = await bankContract.deposit({ value: ethers.utils.parseEther("1.0") });
await tx.wait();
```

**Gas Cost:** ~50,000 gas

---

#### withdraw(uint256 amount)
Withdraw funds from the bank.

```solidity
function withdraw(uint256 amount) external
```

**Parameters:**
- `amount` (uint256): Amount to withdraw in wei

**Returns:** None

**Events:**
```solidity
event Withdrawal(address indexed user, uint256 amount, uint256 timestamp);
```

**Reverts if:**
- Insufficient balance
- Amount is zero

**Example Usage:**
```typescript
const tx = await bankContract.withdraw(ethers.utils.parseEther("0.5"));
await tx.wait();
```

**Gas Cost:** ~65,000 gas

---

#### transfer(address to, uint256 amount)
Transfer funds to another address.

```solidity
function transfer(address to, uint256 amount) external
```

**Parameters:**
- `to` (address): Recipient address
- `amount` (uint256): Amount to transfer in wei

**Returns:** None

**Events:**
```solidity
event Transfer(address indexed from, address indexed to, uint256 amount, uint256 timestamp);
```

**Reverts if:**
- Invalid address
- Transferring to self
- Insufficient balance
- Amount is zero

**Example Usage:**
```typescript
const tx = await bankContract.transfer(
  "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  ethers.utils.parseEther("0.1")
);
await tx.wait();
```

**Gas Cost:** ~80,000 gas

---

#### getBalance(address user)
Get balance of an address.

```solidity
function getBalance(address user) external view returns (uint256)
```

**Parameters:**
- `user` (address): Address to query

**Returns:**
- `uint256`: Balance in wei

**Example Usage:**
```typescript
const balance = await bankContract.getBalance(userAddress);
const balanceInEth = ethers.utils.formatEther(balance);
```

---

#### getUserTransactions(address user)
Get transaction history for an address.

```solidity
function getUserTransactions(address user) external view returns (Transaction[] memory)
```

**Parameters:**
- `user` (address): Address to query

**Returns:**
```solidity
struct Transaction {
    uint256 id;
    string action;
    uint256 amount;
    address from;
    address to;
    uint256 timestamp;
    bool isComplete;
}
```

**Example Usage:**
```typescript
const transactions = await bankContract.getUserTransactions(userAddress);
```

---

#### getTotalTransactions()
Get total number of transactions.

```solidity
function getTotalTransactions() external view returns (uint256)
```

**Returns:**
- `uint256`: Total transaction count

---

### Governance Contract

#### createProposal(string memory title, string memory description)
Create a new governance proposal.

```solidity
function createProposal(
    string memory title,
    string memory description
) external returns (uint256)
```

**Parameters:**
- `title` (string): Proposal title
- `description` (string): Proposal description

**Returns:**
- `uint256`: Proposal ID

**Events:**
```solidity
event ProposalCreated(
    uint256 indexed proposalId,
    string title,
    address proposer,
    uint256 endDate
);
```

**Example Usage:**
```typescript
const tx = await governanceContract.createProposal(
  "Increase Interest Rate",
  "Proposal to increase APY from 4.5% to 5.5%"
);
const receipt = await tx.wait();
```

**Gas Cost:** ~150,000 gas

---

#### vote(uint256 proposalId, bool support)
Vote on a proposal.

```solidity
function vote(uint256 proposalId, bool support) external
```

**Parameters:**
- `proposalId` (uint256): ID of the proposal
- `support` (bool): true for yes, false for no

**Returns:** None

**Events:**
```solidity
event VoteCast(
    uint256 indexed proposalId,
    address voter,
    bool support,
    uint256 votesFor,
    uint256 votesAgainst
);
```

**Reverts if:**
- Proposal doesn't exist
- Voting period ended
- Already voted

**Example Usage:**
```typescript
const tx = await governanceContract.vote(proposalId, true);
await tx.wait();
```

**Gas Cost:** ~50,000 gas

---

#### voteFor(uint256 proposalId)
Vote in favor of a proposal.

```solidity
function voteFor(uint256 proposalId) external
```

**Parameters:**
- `proposalId` (uint256): ID of the proposal

**Returns:** None

**Example Usage:**
```typescript
await governanceContract.voteFor(0);
```

---

#### voteAgainst(uint256 proposalId)
Vote against a proposal.

```solidity
function voteAgainst(uint256 proposalId) external
```

**Parameters:**
- `proposalId` (uint256): ID of the proposal

**Returns:** None

**Example Usage:**
```typescript
await governanceContract.voteAgainst(0);
```

---

#### getProposal(uint256 proposalId)
Get proposal details.

```solidity
function getProposal(uint256 proposalId) external view returns (
    uint256 id,
    string memory title,
    string memory description,
    address proposer,
    uint256 endDate,
    uint256 votesFor,
    uint256 votesAgainst,
    uint256 totalVoters,
    bool isExecuted
)
```

**Parameters:**
- `proposalId` (uint256): ID of the proposal

**Returns:**
- `id` (uint256): Proposal ID
- `title` (string): Proposal title
- `description` (string): Proposal description
- `proposer` (address): Address of proposer
- `endDate` (uint256): End timestamp
- `votesFor` (uint256): Number of yes votes
- `votesAgainst` (uint256): Number of no votes
- `totalVoters` (uint256): Total voters
- `isExecuted` (bool): Execution status

**Example Usage:**
```typescript
const proposal = await governanceContract.getProposal(0);
console.log(proposal.title, proposal.votesFor);
```

---

#### getProposalStatus(uint256 proposalId)
Get proposal status.

```solidity
function getProposalStatus(uint256 proposalId) external view returns (string memory)
```

**Parameters:**
- `proposalId` (uint256): ID of the proposal

**Returns:**
- `string`: Status ("Active", "Passed", "Failed")

---

## Frontend APIs

### useBlockchain Hook

React hook for blockchain interactions.

#### Returns

```typescript
{
  account: UserAccount | null;
  transactions: Transaction[];
  proposals: Proposal[];
  balanceHistory: BalanceData[];
  tokenHolders: TokenHolder[];
  connectWallet: () => Promise<boolean>;
  disconnectWallet: () => void;
  performTransaction: (type, amount, recipient?) => void;
  voteOnProposal: (proposalId, vote) => void;
  createProposal: (title, description) => void;
  votedProposalIds: Set<string>;
}
```

#### Methods

##### connectWallet()
Connect to MetaMask wallet.

**Returns:** `Promise<boolean>`

**Example:**
```typescript
const success = await connectWallet();
```

##### disconnectWallet()
Disconnect wallet and reset state.

**Returns:** `void`

##### performTransaction(type, amount, recipient?)
Execute a transaction.

**Parameters:**
- `type`: 'Deposit' | 'Withdraw' | 'Transfer'
- `amount`: number (in ETH)
- `recipient?`: string (address, for transfers)

**Example:**
```typescript
performTransaction('Deposit', 1.5);
performTransaction('Transfer', 0.5, '0x...');
```

##### voteOnProposal(proposalId, vote)
Vote on a governance proposal.

**Parameters:**
- `proposalId`: string
- `vote`: 'For' | 'Against'

**Example:**
```typescript
voteOnProposal('PIP-001', 'For');
```

##### createProposal(title, description)
Create a new governance proposal.

**Parameters:**
- `title`: string
- `description`: string

**Example:**
```typescript
createProposal(
  'Increase APY',
  'Increase annual percentage yield to 6%'
);
```

---

## Services API

### Web3Service

Service for Web3 interactions.

#### Methods

##### getInstance()
Get Web3Service singleton instance.

```typescript
const service = Web3Service.getInstance();
```

##### initializeContracts()
Initialize contract addresses.

```typescript
await service.initializeContracts();
```

##### isMetaMaskInstalled()
Check if MetaMask is installed.

```typescript
const isInstalled = service.isMetaMaskInstalled();
```

##### requestAccounts()
Request account access from MetaMask.

```typescript
const accounts = await service.requestAccounts();
```

##### switchNetwork(chainId)
Switch network in MetaMask.

```typescript
await service.switchNetwork('0x7A69'); // localhost
```

##### weiToEther(wei)
Convert wei to ether.

```typescript
const eth = service.weiToEther('1000000000000000000'); // 1.0
```

##### etherToWei(ether)
Convert ether to wei.

```typescript
const wei = service.etherToWei(1.5); // '1500000000000000000'
```

---

## Type Definitions

### UserAccount
```typescript
interface UserAccount {
  address: string;
  balance: number;
}
```

### Transaction
```typescript
interface Transaction {
  id: string;
  date: string;
  action: 'Deposit' | 'Withdrawal' | 'Transfer In' | 'Transfer Out';
  amount: number;
  from: string;
  to: string;
  status: 'Completed' | 'Pending' | 'Failed';
}
```

### Proposal
```typescript
interface Proposal {
  id: string;
  title: string;
  description: string;
  proposer: string;
  endDate: string;
  votesFor: number;
  votesAgainst: number;
  status: 'Active' | 'Passed' | 'Failed';
}
```

### TokenHolder
```typescript
interface TokenHolder {
  address: string;
  balance: number;
}
```

---

## Error Handling

### Common Errors

#### Insufficient Funds
```typescript
try {
  await withdraw(amount);
} catch (error) {
  if (error.message.includes('Insufficient')) {
    // Handle insufficient funds
  }
}
```

#### Transaction Rejection
```typescript
try {
  await deposit({ value: amount });
} catch (error) {
  if (error.code === 4001) {
    // User rejected transaction
  }
}
```

#### Network Errors
```typescript
try {
  await connectWallet();
} catch (error) {
  console.error('Network error:', error);
}
```

---

## Best Practices

1. **Always handle errors**
   ```typescript
   try {
     await transaction();
   } catch (error) {
     console.error(error);
   }
   ```

2. **Confirm large transactions**
   - Always confirm with user
   - Show transaction details
   - Display gas estimates

3. **Validate inputs**
   - Check address format
   - Verify amounts
   - Sanitize strings

4. **Use events for UI updates**
   - Listen for contract events
   - Update UI reactively
   - Cache responses

5. **Handle loading states**
   - Show loading indicators
   - Disable buttons during transactions
   - Display progress

---

For more information, see [Main README](../README.md) and [Architecture Documentation](./ARCHITECTURE.md).

