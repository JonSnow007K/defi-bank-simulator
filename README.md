# DeFiChain Bank Simulator

A comprehensive decentralized banking simulation platform built with React, TypeScript, and Solidity smart contracts. This application demonstrates DeFi banking operations including deposits, withdrawals, transfers, and governance features.

## 🌟 Features

- **Banking Operations**
  - Deposit funds
  - Withdraw funds
  - Transfer funds between accounts
  - Real-time balance tracking
  - Transaction history

- **Analytics Dashboard**
  - Visual balance history
  - Transaction volume charts
  - Top token holders tracking
  - Network statistics

- **Governance**
  - Create proposals
  - Vote on proposals
  - Track voting status
  - Transparent voting results

- **Security**
  - Wallet integration (MetaMask)
  - Secure transaction signing
  - On-chain verification
  - Transaction status tracking

## 🏗️ Architecture

### Frontend
- **Framework**: React 19 with TypeScript
- **UI Library**: TailwindCSS
- **Charts**: Recharts
- **Build Tool**: Vite

### Smart Contracts
- **Language**: Solidity 0.8.19
- **Framework**: Hardhat
- **Network**: Ethereum-compatible local/testnet

### Key Components

```
src/
├── components/        # React components
│   ├── Dashboard.tsx        # Main dashboard
│   ├── Transactions.tsx     # Transaction history & charts
│   ├── Governance.tsx       # Governance interface
│   └── Security.tsx         # Security features
├── hooks/
│   └── useBlockchain.ts     # Blockchain interaction hook
├── services/
│   ├── mockData.ts          # Mock data for development
│   └── web3Service.ts       # Web3 service abstraction
└── contracts/               # Solidity smart contracts
    ├── Bank.sol             # Main banking contract
    ├── Governance.sol       # Governance contract
    └── BankMock.sol         # Mock contract for testing
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MetaMask browser extension (optional, for wallet integration)
- Hardhat development environment

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd defichain-bank-simulator
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env` file in the root directory:
```env
PRIVATE_KEY=your_private_key_here
SEPOLIA_URL=https://eth-sepolia.g.alchemy.com/v2/your_api_key
```

4. **Compile smart contracts**
```bash
npm run compile
```

5. **Deploy contracts (Optional)**
For local deployment:
```bash
# Terminal 1: Start local blockchain
npm run node

# Terminal 2: Deploy contracts
npm run deploy:local
```

6. **Start the development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📚 Usage Guide

### Wallet Connection

1. Click "Connect Wallet" in the header
2. If MetaMask is installed, approve the connection
3. If not, the app will use a simulation account for demo purposes

### Making Transactions

#### Deposit
1. Navigate to Dashboard
2. Click "Deposit" button
3. Enter amount
4. Confirm transaction

#### Withdraw
1. Click "Withdraw" button
2. Enter amount
3. Confirm withdrawal

#### Transfer
1. Click "Transfer" button
2. Enter recipient address
3. Enter amount
4. Confirm transfer

### Governance

1. Navigate to Governance tab
2. View active proposals
3. Click "Vote" to participate
4. Create new proposals using "Create Proposal" button

## 🔧 Development

### Running Tests
```bash
npm test
```

### Building for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📄 Smart Contracts

### Bank Contract (`contracts/Bank.sol`)

Main banking contract that handles:
- Deposit operations
- Withdrawal operations
- Transfer functionality
- Transaction history
- Top holders tracking

**Key Functions:**
- `deposit()` - Deposit ETH into the bank
- `withdraw(uint256 amount)` - Withdraw funds
- `transfer(address to, uint256 amount)` - Transfer to another address
- `getBalance(address user)` - Query user balance
- `getUserTransactions(address user)` - Get transaction history

### Governance Contract (`contracts/Governance.sol`)

Governance system for:
- Proposal creation
- Voting mechanism
- Proposal execution
- Vote tracking

**Key Functions:**
- `createProposal(string title, string description)` - Create new proposal
- `voteFor(uint256 proposalId)` - Vote in favor
- `voteAgainst(uint256 proposalId)` - Vote against
- `getProposalStatus(uint256 proposalId)` - Check proposal status

## 🔒 Security Considerations

1. **Smart Contract Security**
   - Reentrancy protection
   - Access control modifiers
   - Input validation
   - Safe math operations

2. **Frontend Security**
   - Wallet signature verification
   - Transaction confirmation dialogs
   - Error handling and user feedback
   - Network validation

3. **Best Practices**
   - Never expose private keys
   - Always verify contract addresses
   - Test thoroughly before mainnet deployment
   - Regular security audits

## 🌐 Deployment

### Local Development
```bash
npm run node
npm run deploy:local
```

### Testnet Deployment (Sepolia)
```bash
npm run deploy:local --network sepolia
```

### Mainnet Deployment
⚠️ **Warning**: Only deploy to mainnet after thorough testing and security audits.

```bash
npm run deploy:local --network mainnet
```

## 📖 API Reference

### useBlockchain Hook

Custom React hook for blockchain interactions.

**Returns:**
- `account`: User account information
- `transactions`: Transaction history
- `proposals`: Governance proposals
- `balanceHistory`: Balance over time
- `tokenHolders`: Top token holders
- `connectWallet()`: Connect wallet function
- `disconnectWallet()`: Disconnect wallet
- `performTransaction()`: Execute transaction
- `voteOnProposal()`: Vote on proposal
- `createProposal()`: Create new proposal

**Example Usage:**
```typescript
const { account, transactions, connectWallet } = useBlockchain();

await connectWallet();
console.log(account.balance);
```

## 🐛 Troubleshooting

### MetaMask Connection Issues
1. Ensure MetaMask is installed and unlocked
2. Check if you're on the correct network
3. Try resetting the MetaMask connection

### Contract Deployment Errors
1. Verify Hardhat is properly configured
2. Check network connectivity
3. Ensure sufficient gas funds

### Transaction Failures
1. Verify sufficient balance
2. Check network congestion
3. Ensure correct contract addresses

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- MetaMask for wallet integration
- Recharts for visualization
- Hardhat for development framework
- React team for the amazing framework

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Note**: This is a simulation/demo application. Use at your own risk. Always perform thorough testing before using in production environments.
