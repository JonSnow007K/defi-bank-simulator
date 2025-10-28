# Deployment Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Local Deployment](#local-deployment)
3. [Testnet Deployment](#testnet-deployment)
4. [Frontend Deployment](#frontend-deployment)
5. [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Software
- Node.js v16 or higher
- npm v7 or higher
- Git
- MetaMask browser extension (for testing)

### Required Accounts
- Alchemy/Infura account (for Ethereum RPC)
- Etherscan API key (for contract verification)
- Hosting service account (Vercel/Netlify)

### Environment Setup
Create a `.env` file in the project root:
```env
PRIVATE_KEY=your_private_key_here
SEPOLIA_URL=https://eth-sepolia.g.alchemy.com/v2/your_api_key
ETHERSCAN_API_KEY=your_etherscan_api_key
```

## Local Deployment

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Local Blockchain
In terminal 1:
```bash
npm run node
```

This starts a local Hardhat node at `http://127.0.0.1:8545`

### Step 3: Compile Contracts
```bash
npm run compile
```

### Step 4: Deploy Contracts
In terminal 2:
```bash
npm run deploy:local
```

You should see output like:
```
Deployment completed successfully!

Deployed contracts:
  Governance: 0x5FbDB2315678afecb367f032d93F642f64180aa3
  Bank: 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
  BankMock: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
```

### Step 5: Configure MetaMask
1. Open MetaMask
2. Add Custom Network:
   - Network Name: Localhost 8545
   - RPC URL: http://127.0.0.1:8545
   - Chain ID: 31337
   - Currency Symbol: ETH
3. Import test account with private key from Hardhat output

### Step 6: Update Contract Addresses
Copy the deployed contract addresses and update `services/web3Service.ts`:
```typescript
this.contractAddresses = {
  bank: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
  governance: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  bankMock: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
};
```

### Step 7: Start Frontend
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Testnet Deployment

### Sepolia Testnet Deployment

#### Step 1: Get Test Ether
1. Visit Sepolia faucet: https://sepoliafaucet.com/
2. Request test ether for your address
3. Wait for confirmation

#### Step 2: Update Hardhat Config
Ensure your `.env` has:
```env
SEPOLIA_URL=https://eth-sepolia.g.alchemy.com/v2/your_key
PRIVATE_KEY=your_private_key
```

#### Step 3: Deploy to Sepolia
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

#### Step 4: Verify Contracts
```bash
npx hardhat verify --network sepolia <CONTRACT_ADDRESS>
```

#### Step 5: Update Frontend
Update contract addresses in your frontend deployment

### Other Testnets
The same process applies to other testnets (Goerli, Mumbai, etc.)
Just update the network configuration in `hardhat.config.js`

## Frontend Deployment

### Option 1: Vercel (Recommended)

#### Step 1: Install Vercel CLI
```bash
npm i -g vercel
```

#### Step 2: Deploy
```bash
vercel
```

Follow the prompts to:
1. Set up project
2. Link to GitHub (optional)
3. Configure build settings

#### Step 3: Environment Variables
In Vercel dashboard:
- Go to Project Settings → Environment Variables
- Add your environment variables
- Redeploy

#### Step 4: Custom Domain (Optional)
- Go to Project Settings → Domains
- Add your custom domain
- Update DNS records

### Option 2: Netlify

#### Step 1: Install Netlify CLI
```bash
npm i -g netlify-cli
```

#### Step 2: Build
```bash
npm run build
```

#### Step 3: Deploy
```bash
netlify deploy --prod
```

#### Step 4: Configure
- Add environment variables in Netlify dashboard
- Set build command: `npm run build`
- Set publish directory: `dist`

### Option 3: GitHub Pages

#### Step 1: Update vite.config.ts
```typescript
export default defineConfig({
  base: '/defichain-bank-simulator/', // your repo name
  // ... rest of config
})
```

#### Step 2: Create GitHub Action
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

#### Step 3: Push to GitHub
```bash
git push origin main
```

Deployment will trigger automatically.

## Production Considerations

### Security Checklist
- [ ] Remove test/private keys from code
- [ ] Use environment variables
- [ ] Enable HTTPS
- [ ] Verify smart contracts
- [ ] Set up monitoring
- [ ] Back up private keys securely

### Performance Optimization
- [ ] Enable gzip compression
- [ ] Optimize images
- [ ] Use CDN for assets
- [ ] Implement caching
- [ ] Minify production build

### Monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Configure analytics
- [ ] Monitor contract events
- [ ] Set up uptime monitoring
- [ ] Create alerts

## Troubleshooting

### Contract Deployment Issues

#### Error: "Could not compile"
```bash
# Clean and rebuild
rm -rf artifacts cache
npm run compile
```

#### Error: "Insufficient funds"
- Check balance on network
- Get testnet faucet tokens
- Verify gas price settings

#### Error: "Contract already deployed"
```bash
# Delete deployment files
rm scripts/deployment.json
```

### Frontend Issues

#### Error: "Contract not found"
- Verify contract addresses
- Check network configuration
- Ensure MetaMask is on correct network

#### Error: "Transaction failed"
- Check gas limits
- Verify sufficient balance
- Check contract state

#### Error: "Network error"
- Verify RPC URL
- Check network connectivity
- Try different RPC provider

### Common Commands

```bash
# Reset local environment
npm run node -- --reset

# Clear Hardhat cache
npx hardhat clean

# Check contract sizes
npx hardhat size-contracts

# Run specific tests
npx hardhat test test/Bank.test.js
```

## Maintenance

### Regular Tasks
1. Update dependencies monthly
2. Monitor contract events
3. Review security advisories
4. Backup important data
5. Update documentation

### Support Resources
- Discord community
- GitHub Issues
- Documentation website
- Stack Overflow

## Conclusion

This deployment guide covers the essential steps to get your DeFiChain Bank Simulator running in various environments. Always test thoroughly in local and testnet environments before deploying to production.

For additional support, refer to:
- [Main README](../README.md)
- [Architecture Docs](./ARCHITECTURE.md)
- [GitHub Issues](https://github.com/your-repo/issues)

