
import React from 'react';
import { MetamaskIcon } from './icons';

interface ConnectWalletModalProps {
  onClose: () => void;
  onConnect: () => void;
}

const ConnectWalletModal: React.FC<ConnectWalletModalProps> = ({ onClose, onConnect }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-8 m-4 max-w-sm w-full text-center shadow-2xl transform transition-all">
        <h2 className="text-2xl font-bold text-white mb-4">Connect Wallet</h2>
        <p className="text-gray-400 mb-6">Choose your wallet provider to continue. This is a simulation.</p>
        
        <button 
          onClick={onConnect}
          className="w-full flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
        >
          <MetamaskIcon className="w-8 h-8 mr-3" />
          Connect with MetaMask
        </button>
        
        <button
          onClick={onClose}
          className="mt-6 text-gray-400 hover:text-white transition duration-300 text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConnectWalletModal;
