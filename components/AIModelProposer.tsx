
import React from 'react';
import Loader from './Loader';

interface AIModelProposerProps {
  description: string;
  setDescription: (value: string) => void;
  onGenerate: () => void;
  proposal: string;
  isLoading: boolean;
}

const AIModelProposer: React.FC<AIModelProposerProps> = ({
  description,
  setDescription,
  onGenerate,
  proposal,
  isLoading,
}) => {
  return (
    <div className="space-y-4 flex flex-col h-full">
      <p className="text-sm text-gray-600">
        Describe your goal for the AI model. Based on your description and sensor list, we'll generate a technical proposal.
      </p>
      <div>
        <label htmlFor="model-description" className="block text-sm font-medium text-gray-700 mb-1">
          Model Goal
        </label>
        <textarea
          id="model-description"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green-light focus:border-brand-green"
          placeholder="e.g., A model to predict wheat yield and detect disease early."
        />
      </div>
      <button
        onClick={onGenerate}
        disabled={isLoading}
        className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-bold py-2.5 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center disabled:bg-gray-400"
      >
        {isLoading ? <Loader /> : 'Generate Proposal'}
      </button>
      
      <div className="border-t border-gray-200 pt-4 flex-grow">
        <h3 className="font-semibold text-gray-700 mb-2">Generated Proposal:</h3>
        {isLoading ? (
            <div className="flex justify-center items-center h-48">
                <Loader />
            </div>
        ) : proposal ? (
          <div className="prose prose-sm max-w-none p-3 bg-gray-50 rounded-lg max-h-96 overflow-y-auto" dangerouslySetInnerHTML={{ __html: proposal.replace(/###\s(.*?)\n/g, '<h3 class="font-bold text-brand-brown-dark">$1</h3>').replace(/-\s(.*?)\n/g, '<li class="ml-4">$1</li>') }}>
          </div>
        ) : (
          <p className="text-gray-500 italic text-center py-4">Proposal will appear here...</p>
        )}
      </div>
    </div>
  );
};

export default AIModelProposer;
