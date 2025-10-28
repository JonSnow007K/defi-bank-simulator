
import React from 'react';
import { ShieldCheckIcon, LockClosedIcon, UsersIcon } from './icons';

const SecurityFeature: React.FC<{ icon: React.ReactNode, title: string, children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
    <div className="flex items-center mb-3">
      <span className="text-blue-400">{icon}</span>
      <h3 className="ml-3 text-lg font-semibold text-white">{title}</h3>
    </div>
    <p className="text-gray-400 text-sm">
      {children}
    </p>
  </div>
);

const Security: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white">Security & Transparency</h2>
        <p className="text-gray-400 mt-1">Our commitment to protecting your assets and ensuring protocol integrity.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SecurityFeature icon={<ShieldCheckIcon className="w-7 h-7" />} title="Smart Contract Audits">
          All smart contracts are simulations and for demonstration purposes. In a real-world scenario, they would undergo rigorous, independent third-party audits to identify and rectify potential vulnerabilities before deployment.
        </SecurityFeature>
        <SecurityFeature icon={<LockClosedIcon className="w-7 h-7" />} title="Non-Custodial Wallets">
          You are always in control of your funds. The protocol interacts with your wallet (like MetaMask) but never has access to your private keys. Your assets remain in your custody.
        </SecurityFeature>
        <SecurityFeature icon={<UsersIcon className="w-7 h-7" />} title="Decentralized Governance">
          The protocol's future is decided by token holders, not a central entity. All proposals and voting records are transparently recorded on-chain, ensuring a fair and community-driven evolution.
        </SecurityFeature>
        <SecurityFeature icon={<ShieldCheckIcon className="w-7 h-7" />} title="Transaction Transparency">
          Every deposit, withdrawal, and transfer is a transaction on the blockchain, publicly verifiable by anyone. This creates an immutable and transparent ledger of all financial activities.
        </SecurityFeature>
        <SecurityFeature icon={<LockClosedIcon className="w-7 h-7" />} title="Encrypted Data">
          While blockchain data is public, all off-chain interactions and personal data (if any were collected) would be secured using state-of-the-art encryption standards to protect your privacy.
        </SecurityFeature>
        <SecurityFeature icon={<UsersIcon className="w-7 h-7" />} title="Community Bug Bounties">
          To enhance security, a real protocol would run a bug bounty program, rewarding ethical hackers and security researchers for discovering and responsibly disclosing potential security flaws.
        </SecurityFeature>
      </div>
    </div>
  );
};

export default Security;
