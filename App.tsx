import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import Governance from './components/Governance';
import Security from './components/Security';
import ConnectWalletModal from './components/ConnectWalletModal';
import { useBlockchain } from './hooks/useBlockchain';
import type { Page, TransactionType } from './types';
import TransactionModal from './components/TransactionModal';
import CreateProposalModal from './components/CreateProposalModal';
import LandingPage from './components/LandingPage';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<Page>('Dashboard');
  const [isWalletModalOpen, setWalletModalOpen] = useState<boolean>(false);
  const [isTxModalOpen, setTxModalOpen] = useState<boolean>(false);
  const [isProposalModalOpen, setProposalModalOpen] = useState<boolean>(false);
  const [txType, setTxType] = useState<TransactionType>('Deposit');
  
  const { 
    account, 
    connectWallet, 
    disconnectWallet,
    transactions, 
    proposals,
    balanceHistory,
    tokenHolders,
    performTransaction,
    voteOnProposal,
    createProposal,
    votedProposalIds,
  } = useBlockchain();

  const handleConnect = useCallback(async () => {
    const success = await connectWallet();
    if (success) {
      setWalletModalOpen(false);
    }
  }, [connectWallet]);
  
  const openTransactionModal = useCallback((type: TransactionType) => {
    setTxType(type);
    setTxModalOpen(true);
  }, []);

  const handleCreateProposal = useCallback((title: string, description: string) => {
    createProposal(title, description);
    setProposalModalOpen(false);
  }, [createProposal]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <LandingPage onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'Dashboard':
        return <Dashboard account={account} balanceHistory={balanceHistory} onAction={openTransactionModal} />;
      case 'Transactions':
        return <Transactions transactions={transactions} tokenHolders={tokenHolders} />;
      case 'Governance':
        return <Governance 
                  proposals={proposals} 
                  onVote={voteOnProposal} 
                  onCreate={() => setProposalModalOpen(true)}
                  walletConnected={!!account}
                  votedProposalIds={votedProposalIds}
                />;
      case 'Security':
        return <Security />;
      default:
        return <Dashboard account={account} balanceHistory={balanceHistory} onAction={openTransactionModal} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200 font-sans">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          account={account} 
          onConnect={() => setWalletModalOpen(true)} 
          onDisconnect={disconnectWallet}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-4 sm:p-6 lg:p-8">
          {account ? (
            renderPage()
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-white mb-4">Welcome to DeFiChain Bank</h2>
                <p className="text-gray-400 mb-6">Please connect your wallet to access the dashboard.</p>
                <button
                  onClick={() => setWalletModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                >
                  Connect Wallet
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
      {isWalletModalOpen && !account && (
        <ConnectWalletModal
          onClose={() => setWalletModalOpen(false)}
          onConnect={handleConnect}
        />
      )}
      {isTxModalOpen && account && (
        <TransactionModal
          isOpen={isTxModalOpen}
          onClose={() => setTxModalOpen(false)}
          transactionType={txType}
          onConfirm={performTransaction}
          currentBalance={account.balance}
        />
      )}
      {isProposalModalOpen && account && (
        <CreateProposalModal
            isOpen={isProposalModalOpen}
            onClose={() => setProposalModalOpen(false)}
            onConfirm={handleCreateProposal}
        />
      )}
    </div>
  );
};

export default App;