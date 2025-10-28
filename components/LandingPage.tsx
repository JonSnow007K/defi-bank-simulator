import React from 'react';
import { LogoIcon, DashboardIcon, TransactionsIcon, GovernanceIcon, SecurityIcon, WalletIcon } from './icons';

interface LandingPageProps {
  onLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const features = [
    {
      icon: <DashboardIcon className="w-8 h-8" />,
      title: 'Interactive Dashboard',
      description: 'View real-time balance tracking with beautiful charts and analytics. Monitor your financial performance at a glance.',
      preview: 'Balance tracking, transaction history, and performance metrics'
    },
    {
      icon: <TransactionsIcon className="w-8 h-8" />,
      title: 'Seamless Transactions',
      description: 'Deposit, withdraw, or transfer funds with ease. Track all transactions in real-time across the blockchain network.',
      preview: 'Deposit, Withdraw, and Transfer operations'
    },
    {
      icon: <GovernanceIcon className="w-8 h-8" />,
      title: 'Decentralized Governance',
      description: 'Create and vote on proposals. Participate in the democratic decision-making process of the DeFi platform.',
      preview: 'Proposal creation, voting, and community participation'
    },
    {
      icon: <SecurityIcon className="w-8 h-8" />,
      title: 'Enterprise Security',
      description: 'Bank-level security with blockchain encryption. Your funds are protected by the most advanced security protocols.',
      preview: 'Multi-layer security, encryption, and authentication'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans overflow-x-hidden">
      {/* Hero Section */}
      <div className="flex items-center justify-center min-h-screen px-4 py-16">
        <div className="text-center p-8 max-w-4xl mx-auto">
          <div className="flex justify-center items-center mb-6">
            <LogoIcon className="w-16 h-16 md:w-20 md:h-20 text-blue-500" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Welcome to DeFiChain Bank Simulator
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Experience the future of finance. A transparent, secure, and decentralized banking system built on blockchain principles.
          </p>
          <button
            onClick={onLogin}
            className="inline-flex items-center justify-center w-full sm:w-auto max-w-xs mx-auto bg-white hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 mb-8"
          >
            Get Started
          </button>
          <p className="text-xs sm:text-sm text-gray-600 mt-4">
            This is a simulation for demonstration purposes. No real blockchain transactions are processed.
          </p>
        </div>
      </div>

      {/* Visual Preview Section */}
      <div className="bg-gray-800/50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12">
            Explore Our Platform
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Dashboard Preview Card */}
            <div className="bg-gray-800/70 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center mb-4">
                <DashboardIcon className="w-6 h-6 text-blue-500 mr-3" />
                <h3 className="text-xl font-semibold">Dashboard</h3>
              </div>

              {/* Image Preview Section */}
              <div className="h-48 rounded-lg overflow-hidden mb-4 flex items-center justify-center bg-gray-900">
                <img
                  src="/assets/Dashboard-preview.png"   // 👈 your image path
                  alt="Dashboard Preview"
                  className="w-full h-full object-contain"
                />
              </div>

              <p className="text-gray-400 text-sm">
                View your balance, track history, and manage transactions with interactive charts.
              </p>
            </div>


            {/* Transactions Preview Card */}
            <div className="bg-gray-800/70 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center mb-4">
                <TransactionsIcon className="w-6 h-6 text-green-500 mr-3" />
                <h3 className="text-xl font-semibold">Transactions</h3>
              </div>

              {/* Image Preview Section */}
              <div className="h-48 rounded-lg overflow-hidden mb-4 flex items-center justify-center bg-gray-900">
                <img
                  src="/assets/Transactions-preview.png"  // 👈 your image path
                  alt="Transactions Preview"
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <p className="text-gray-400 text-sm">
                Track all your deposits, withdrawals, and transfers in one convenient place.
              </p>
            </div>
          </div>
        </div>
      </div>


      {/* Features Section */}
      <div className="bg-gray-900 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors duration-300">
                <div className="text-blue-500 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm mb-3">
                  {feature.description}
                </p>
                <p className="text-gray-500 text-xs italic">
                  {feature.preview}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-800/50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="space-y-6">
            {[
              { num: '1', title: 'Connect Your Wallet', desc: 'Securely connect with MetaMask or other Web3 wallets to access your account.' },
              { num: '2', title: 'Explore the Dashboard', desc: 'View your balance, transaction history, and perform banking operations.' },
              { num: '3', title: 'Engage in Governance', desc: 'Participate in democratic decision-making by creating and voting on proposals.' },
              { num: '4', title: 'Monitor Security', desc: 'Track security metrics and ensure your funds are protected at all times.' },
            ].map((step, index) => (
              <div key={index} className="flex items-start bg-gray-800/70 p-6 rounded-xl border border-gray-700">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center font-bold text-lg mr-4">
                  {step.num}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <WalletIcon className="w-16 h-16 text-blue-500 mx-auto mb-6" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Join thousands of users experiencing the future of decentralized banking.
          </p>
          <button
            onClick={onLogin}
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Launch Simulator
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 border-t border-gray-800 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-sm text-gray-500">
          <p>© 2024 DeFiChain Bank Simulator. Built for demonstration purposes only.</p>
          <p className="mt-2">No real transactions or financial services are provided by this application.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;