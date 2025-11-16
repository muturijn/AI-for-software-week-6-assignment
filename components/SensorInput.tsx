
import React, { useState } from 'react';
import PlusIcon from './icons/PlusIcon';
import TrashIcon from './icons/TrashIcon';

interface SensorInputProps {
  sensors: string[];
  setSensors: React.Dispatch<React.SetStateAction<string[]>>;
}

const SensorInput: React.FC<SensorInputProps> = ({ sensors, setSensors }) => {
  const [newSensor, setNewSensor] = useState('');

  const handleAddSensor = () => {
    if (newSensor.trim() && !sensors.includes(newSensor.trim())) {
      setSensors(prev => [...prev, newSensor.trim()]);
      setNewSensor('');
    }
  };

  const handleRemoveSensor = (sensorToRemove: string) => {
    setSensors(prev => prev.filter(sensor => sensor !== sensorToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddSensor();
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        List the IoT sensors that will collect data from the field. Default sensors are provided.
      </p>
      <div className="flex space-x-2">
        <input
          type="text"
          value={newSensor}
          onChange={(e) => setNewSensor(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g., Wind Speed Sensor"
          className="flex-grow w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green-light focus:border-brand-green"
        />
        <button
          onClick={handleAddSensor}
          className="flex-shrink-0 bg-brand-green hover:bg-brand-green-dark text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center"
        >
          <PlusIcon />
          <span className="ml-2 hidden sm:inline">Add</span>
        </button>
      </div>
      <div className="space-y-2 pt-4">
        <h3 className="font-semibold text-gray-700">Sensor List:</h3>
        {sensors.length > 0 ? (
          <ul className="max-h-60 overflow-y-auto pr-2">
            {sensors.map((sensor, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-100 p-2 rounded-md mb-2 group"
              >
                <span className="text-brand-brown-dark">{sensor}</span>
                <button
                  onClick={() => handleRemoveSensor(sensor)}
                  className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label={`Remove ${sensor}`}
                >
                  <TrashIcon />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic text-center py-4">No sensors added yet.</p>
        )}
      </div>
    </div>
  );
};

export default SensorInput;
