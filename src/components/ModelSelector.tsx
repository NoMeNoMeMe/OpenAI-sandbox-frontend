import React from 'react';
import { Model } from '../typings/model';

interface ModelSelectorProps {
  models: Model[];
  selectedModel: string;
  setSelectedModel: (model: string) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({
  models,
  selectedModel,
  setSelectedModel,
}) => {
  return (
    <div className="w-1/4">
      <label
        htmlFor="model-select"
        className="block font-small text-gray-800 mb-2"
      >
        Model:
      </label>
      <select
        id="model-select"
        value={selectedModel}
        onChange={(e) => setSelectedModel(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700"
      >
        <option value="" disabled>
          -- Select a model --
        </option>
        {models.map((model) => (
          <option key={model.id} value={model.id}>
            {model.id.split('/')[1]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ModelSelector;