
import React from 'react';
import Loader from './Loader';

interface DataFlowDiagramProps {
  onGenerate: () => void;
  diagram: string;
  isLoading: boolean;
  isProposalGenerated: boolean;
}

const DataFlowDiagram: React.FC<DataFlowDiagramProps> = ({
  onGenerate,
  diagram,
  isLoading,
  isProposalGenerated,
}) => {
  return (
    <div className="space-y-4 flex flex-col h-full">
      <p className="text-sm text-gray-600">
        Generate a high-level diagram illustrating how data moves from sensors to the final prediction.
      </p>
      <button
        onClick={onGenerate}
        disabled={isLoading || !isProposalGenerated}
        className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-bold py-2.5 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isLoading ? <Loader /> : 'Generate Diagram'}
      </button>
      {!isProposalGenerated && <p className="text-xs text-center text-yellow-700">Generate a proposal first.</p>}
      
      <div className="border-t border-gray-200 pt-4 flex-grow">
        <h3 className="font-semibold text-gray-700 mb-2">Data Flow:</h3>
        {isLoading ? (
           <div className="flex justify-center items-center h-48">
                <Loader />
            </div>
        ) : diagram ? (
          <div className="space-y-2 p-3 bg-gray-50 rounded-lg max-h-96 overflow-y-auto">
            {diagram.split('\n').map((line, index) => {
              if (!line.trim()) return null;
              const hasArrow = line.includes('->');
              const parts = line.split('->');
              return (
                <div key={index} className="flex flex-col text-sm">
                  <span className={`font-medium ${hasArrow ? 'text-brand-brown-dark' : 'text-brand-green-dark'}`}>
                    {parts[0]}
                  </span>
                  {parts[1] && <span className="text-gray-600 pl-4">{`-> ${parts[1]}`}</span>}
                </div>
              )
            })}
          </div>
        ) : (
          <p className="text-gray-500 italic text-center py-4">Diagram will appear here...</p>
        )}
      </div>
    </div>
  );
};

export default DataFlowDiagram;
