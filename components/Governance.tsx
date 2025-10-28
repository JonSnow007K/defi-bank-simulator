import React from 'react';
import type { Proposal } from '../types';

interface GovernanceProps {
  proposals: Proposal[];
  onVote: (proposalId: string, vote: 'For' | 'Against') => void;
  onCreate: () => void;
  walletConnected: boolean;
  votedProposalIds: Set<string>;
}

const ProposalCard: React.FC<{ proposal: Proposal; onVote: (proposalId: string, vote: 'For' | 'Against') => void; walletConnected: boolean; hasVoted: boolean; }> = ({ proposal, onVote, walletConnected, hasVoted }) => {
  const totalVotes = proposal.votesFor + proposal.votesAgainst;
  const forPercentage = totalVotes > 0 ? (proposal.votesFor / totalVotes) * 100 : 0;
  const againstPercentage = totalVotes > 0 ? (proposal.votesAgainst / totalVotes) * 100 : 0;

  const getStatusInfo = () => {
    switch(proposal.status) {
      case 'Active': return { text: 'Active', color: 'text-blue-400', bg: 'bg-blue-500/20' };
      case 'Passed': return { text: 'Passed', color: 'text-green-400', bg: 'bg-green-500/20' };
      case 'Failed': return { text: 'Failed', color: 'text-red-400', bg: 'bg-red-500/20' };
    }
  };
  const statusInfo = getStatusInfo();

  return (
    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 flex flex-col">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-white">{proposal.title}</h3>
        <span className={`px-3 py-1 text-xs font-bold rounded-full ${statusInfo.bg} ${statusInfo.color}`}>{statusInfo.text}</span>
      </div>
      <p className="text-sm text-gray-400 mb-4 flex-grow">{proposal.description}</p>
      
      <div className="space-y-2 mb-4">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="font-medium text-green-400">For</span>
            <span className="text-gray-300">{proposal.votesFor.toLocaleString()} votes</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${forPercentage}%` }}></div>
          </div>
        </div>
        <div>
           <div className="flex justify-between text-xs mb-1">
            <span className="font-medium text-red-400">Against</span>
            <span className="text-gray-300">{proposal.votesAgainst.toLocaleString()} votes</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-red-500 h-2 rounded-full" style={{ width: `${againstPercentage}%` }}></div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-700 pt-4 mt-auto">
        <div className="flex justify-between items-center text-xs text-gray-400">
          <span>{proposal.status === 'Active' ? `Voting ends: ${proposal.endDate}` : `Ended: ${proposal.endDate}`}</span>
          <span className="font-mono" title={proposal.proposer}>By: {`${proposal.proposer.slice(0, 6)}...${proposal.proposer.slice(-4)}`}</span>
        </div>
        {proposal.status === 'Active' && walletConnected && (
          <div className="flex gap-4 mt-4">
            <button 
                onClick={() => onVote(proposal.id, 'For')} 
                disabled={hasVoted}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
              Vote For
            </button>
            <button 
                onClick={() => onVote(proposal.id, 'Against')}
                disabled={hasVoted} 
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
              Vote Against
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Governance: React.FC<GovernanceProps> = ({ proposals, onVote, onCreate, walletConnected, votedProposalIds }) => {
  return (
    <div className="space-y-6">
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
         <div>
            <h2 className="text-2xl font-bold text-white">Governance Proposals</h2>
            <p className="text-gray-400 mt-1">Participate in the future of the protocol by voting on proposals.</p>
         </div>
         {walletConnected && (
            <button
                onClick={onCreate}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 whitespace-nowrap"
            >
                Create Proposal
            </button>
         )}
       </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {proposals.map((p) => (
          <ProposalCard key={p.id} proposal={p} onVote={onVote} walletConnected={walletConnected} hasVoted={votedProposalIds.has(p.id)} />
        ))}
      </div>
    </div>
  );
};

export default Governance;