import React, { useState } from 'react';

interface CreateProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (title: string, description: string) => void;
}

const CreateProposalModal: React.FC<CreateProposalModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [error, setError] = useState<string>('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!title.trim()) {
      setError('Proposal title cannot be empty.');
      return;
    }
    if (!description.trim()) {
      setError('Proposal description cannot be empty.');
      return;
    }
    setError('');
    onConfirm(title, description);
    // Reset fields for next time
    setTitle('');
    setDescription('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-8 m-4 max-w-lg w-full shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-6">Create New Proposal</h2>

        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-2">Proposal Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Increase Staking Rewards"
            className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg py-2 px-4 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-2">Description</label>
          <textarea
            id="description"
            value={description}
            rows={5}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide a detailed description of the proposal and its justification..."
            className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg py-2 px-4 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Submit Proposal
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProposalModal;
