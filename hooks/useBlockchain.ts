import { useState, useCallback } from 'react';
import type { UserAccount, Transaction, Proposal, TransactionType, BalanceData, TokenHolder } from '../types';
import { MOCK_ACCOUNT, MOCK_TRANSACTIONS, MOCK_PROPOSALS, MOCK_BALANCE_HISTORY, MOCK_TOKEN_HOLDERS } from '../services/mockData';

// Extend the Window interface to include ethereum
declare global {
    interface Window {
        ethereum?: any;
    }
}

export const useBlockchain = () => {
  const [account, setAccount] = useState<UserAccount | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [proposals, setProposals] = useState<Proposal[]>(MOCK_PROPOSALS);
  const [balanceHistory, setBalanceHistory] = useState<BalanceData[]>([]);
  const [tokenHolders, setTokenHolders] = useState<TokenHolder[]>([]);
  const [votedProposalIds, setVotedProposalIds] = useState<Set<string>>(new Set());

  const connectWallet = useCallback(async (): Promise<boolean> => {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const userAddress = accounts[0];
            // In this simulation, we use the real address but mock the balance and history.
            setAccount({
                address: userAddress,
                balance: MOCK_ACCOUNT.balance
            });
            setTransactions(MOCK_TRANSACTIONS);
            setBalanceHistory(MOCK_BALANCE_HISTORY);
            setTokenHolders(MOCK_TOKEN_HOLDERS);
            return true;
        } catch (error) {
            console.error("User denied account access or error occurred:", error);
            alert("Could not connect to MetaMask. Please ensure it's installed and unlocked. Using a simulation account for now.");
            // Fallback to mock account
            setAccount(MOCK_ACCOUNT);
            setTransactions(MOCK_TRANSACTIONS);
            setBalanceHistory(MOCK_BALANCE_HISTORY);
            setTokenHolders(MOCK_TOKEN_HOLDERS);
            return true; // Still "succeeded" for the simulator
        }
    } else {
        // MetaMask is not installed. Fallback to mock account for simulation purposes.
        console.warn("MetaMask not detected. Falling back to mock account for simulation.");
        setAccount(MOCK_ACCOUNT);
        setTransactions(MOCK_TRANSACTIONS);
        setBalanceHistory(MOCK_BALANCE_HISTORY);
        setTokenHolders(MOCK_TOKEN_HOLDERS);
        return true; // The connection "succeeded" in the context of the simulator.
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setAccount(null);
    setTransactions([]);
    setBalanceHistory([]);
    setTokenHolders([]);
    setVotedProposalIds(new Set()); // Reset votes on disconnect
  }, []);

  const performTransaction = useCallback((type: TransactionType, amount: number, recipient?: string) => {
    if (!account) return;

    let newBalance = account.balance;
    const newDate = new Date().toLocaleString();
    const transactionsToAdd: Transaction[] = [];

    if (type === 'Deposit') {
      newBalance += amount;
      transactionsToAdd.push({
        id: `0x${Math.random().toString(16).slice(2, 12)}`,
        date: newDate,
        action: 'Deposit',
        amount,
        from: '0xExternal...Bank',
        to: account.address,
        status: 'Completed',
      });
    } else if (type === 'Withdraw') {
      newBalance -= amount;
      transactionsToAdd.push({
        id: `0x${Math.random().toString(16).slice(2, 12)}`,
        date: newDate,
        action: 'Withdrawal',
        amount,
        from: account.address,
        to: '0xExternal...Bank',
        status: 'Completed',
      });
    } else if (type === 'Transfer' && recipient) {
      newBalance -= amount;
      // User's outgoing transaction
      transactionsToAdd.push({
        id: `0x${Math.random().toString(16).slice(2, 12)}`,
        date: newDate,
        action: 'Transfer Out',
        amount,
        from: account.address,
        to: recipient,
        status: 'Completed',
      });
      // Recipient's incoming transaction for simulation realism
      transactionsToAdd.push({
        id: `0x${Math.random().toString(16).slice(2, 12)}`,
        date: newDate,
        action: 'Transfer In',
        amount,
        from: account.address,
        to: recipient,
        status: 'Completed',
      });
    }
    
    // If a transaction was created, update state
    if (transactionsToAdd.length > 0) {
        setAccount(prev => prev ? { ...prev, balance: newBalance } : null);
        setTransactions(prev => [...transactionsToAdd, ...prev]);
        setBalanceHistory(prev => [...prev, {name: `T+${prev.length - 4}`, balance: newBalance}]);
    }

  }, [account]);

  const voteOnProposal = useCallback((proposalId: string, vote: 'For' | 'Against') => {
    if (votedProposalIds.has(proposalId)) {
        alert("You have already voted on this proposal.");
        return;
    }

    setProposals(prevProposals =>
      prevProposals.map(p => {
        if (p.id === proposalId) {
          if (vote === 'For') {
            return { ...p, votesFor: p.votesFor + 1 };
          } else {
            return { ...p, votesAgainst: p.votesAgainst + 1 };
          }
        }
        return p;
      })
    );
    setVotedProposalIds(prev => new Set(prev).add(proposalId));
  }, [votedProposalIds]);

  const createProposal = useCallback((title: string, description: string) => {
    if (!account) return;

    const newProposal: Proposal = {
      id: `PIP-${String(proposals.length + 1).padStart(3, '0')}`,
      title,
      description,
      proposer: account.address,
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      votesFor: 0,
      votesAgainst: 0,
      status: 'Active',
    };

    setProposals(prev => [newProposal, ...prev]);

  }, [account, proposals.length]);


  return {
    account,
    transactions,
    proposals,
    balanceHistory,
    tokenHolders,
    connectWallet,
    disconnectWallet,
    performTransaction,
    voteOnProposal,
    createProposal,
    votedProposalIds,
  };
};