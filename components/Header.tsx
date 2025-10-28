import React from 'react';
import type { UserAccount } from '../types';
import { WalletIcon, LogoutIcon } from './icons';

interface HeaderProps {
  account: UserAccount | null;
  onConnect: () => void;
  onDisconnect: () => void;
}

const Header: React.FC<HeaderProps> = ({ account, onConnect, onDisconnect }) => {
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <header className="flex-shrink-0 bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 p-4 flex justify-between items-center">
      <h1 className="text-xl md:text-2xl font-bold text-white">DeFiChain Bank</h1>
      <div>
        {account ? (
          <div className="flex items-center space-x-3 bg-gray-700/50 rounded-full p-2">
            <div className="flex flex-col items-end">
                <span className="text-sm font-semibold text-white">{formatAddress(account.address)}</span>
                <span className="text-xs text-green-400 font-mono">₹{account.balance.toLocaleString()}</span>
            </div>
            <button
              onClick={onDisconnect}
              className="p-2 rounded-full bg-red-500/20 hover:bg-red-500/40 text-red-400 hover:text-red-300 transition-colors duration-300"
              title="Disconnect Wallet"
            >
              <LogoutIcon className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <button
            onClick={onConnect}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
          >
            <WalletIcon className="w-5 h-5" />
            <span>Connect Wallet</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
