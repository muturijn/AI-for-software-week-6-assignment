
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import SensorInput from './components/SensorInput';
import AIModelProposer from './components/AIModelProposer';
import DataFlowDiagram from './components/DataFlowDiagram';
import { generateAIProposal, generateDataFlowDiagram } from './services/geminiService';
import Card from './components/Card';
import Loader from './components/Loader';

const App: React.FC = () => {
  const [sensors, setSensors] = useState<string[]>([
    'Soil Moisture Sensor',
    'Temperature & Humidity Sensor',
    'Sunlight Intensity Sensor (PAR)',
    'pH Sensor',
    'Nutrient Sensor (N-P-K)'
  ]);
  const [aiModelDescription, setAiModelDescription] = useState<string>('A model to predict corn yield based on real-time sensor data.');
  const [aiModelProposal, setAiModelProposal] = useState<string>('');
  const [dataFlowDiagram, setDataFlowDiagram] = useState<string>('');

  const [isProposalLoading, setIsProposalLoading] = useState<boolean>(false);
  const [isDiagramLoading, setIsDiagramLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateProposal = useCallback(async () => {
    if (sensors.length === 0 || !aiModelDescription) {
      setError('Please add at least one sensor and provide a model description.');
      return;
    }
    setError(null);
    setIsProposalLoading(true);
    setDataFlowDiagram(''); // Clear old diagram when generating new proposal
    try {
      const proposal = await generateAIProposal(sensors, aiModelDescription);
      setAiModelProposal(proposal);
    } catch (err) {
      setError('Failed to generate AI model proposal. Please try again.');
      console.error(err);
    } finally {
      setIsProposalLoading(false);
    }
  }, [sensors, aiModelDescription]);
  
  const handleGenerateDiagram = useCallback(async () => {
    if (!aiModelProposal) {
      setError('Please generate an AI model proposal first.');
      return;
    }
    setError(null);
    setIsDiagramLoading(true);
    try {
      const diagram = await generateDataFlowDiagram(sensors, aiModelProposal);
      setDataFlowDiagram(diagram);
    } catch (err) {
      setError('Failed to generate data flow diagram. Please try again.');
      console.error(err);
    } finally {
      setIsDiagramLoading(false);
    }
  }, [sensors, aiModelProposal]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <Card step="1" title="Define IoT Sensors">
            <SensorInput sensors={sensors} setSensors={setSensors} />
          </Card>
          
          <Card step="2" title="Propose AI Model">
            <AIModelProposer
              description={aiModelDescription}
              setDescription={setAiModelDescription}
              onGenerate={handleGenerateProposal}
              proposal={aiModelProposal}
              isLoading={isProposalLoading}
            />
          </Card>

          <Card step="3" title="Visualize Data Flow">
            <DataFlowDiagram
              onGenerate={handleGenerateDiagram}
              diagram={dataFlowDiagram}
              isLoading={isDiagramLoading}
              isProposalGenerated={!!aiModelProposal}
            />
          </Card>
        </div>
      </main>
    </div>
  );
};

export default App;
