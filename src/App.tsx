import './App.css';
import { useState, useEffect, useMemo } from 'react';

import { getModels } from './api/getModels';
import { postPrompt } from './api/postPrompt';

import History from './components/History';
import SystemMessageInput from './components/SystemMessageInput';
import PromptInput from './components/PromptInput';
import ModelSelector from './components/ModelSelector';

import { Model } from './typings/model';
import { HistoryItem } from './typings/history';

// TODO: improve performance for large history
// TODO: add image models support
// TODO: add support for file upload
// TODO: add support for openai and deepseek models
// TODO: add support for storing history and changing conversations

function App() {
  const [selectedModel, setSelectedModel] = useState('');
  const [models, setModels] = useState<Model[]>([]);
  const [prompt, setPrompt] = useState('');
  const [systemMessage, setSystemMessage] = useState('You are a helpful assistant.');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const memoizedModels = useMemo(() => models, [models]);

  useEffect(() => {
    const fetchModels = async () => {
      const data = await getModels();
      if (data) {
        setModels(data);
      }
    };

    fetchModels();
  }, []);

  const handleSubmit = async () => {
    if (!selectedModel || !prompt) {
      setError('Select a model and enter a prompt before submitting.');
      return;
    }

    setError(''); // Clear any previous error
    setLoading(true); // Start loading animation

    try {
      const res = await postPrompt({ model: selectedModel, prompt, history, systemMessage });
      if (!res) {
        throw new Error('Network response was not ok');
      }
      const data = res;
      const newResponse = data;
      setHistory([...history, { role: "user", parts: [{text: prompt}]}, { role: "assistant", model: selectedModel, parts: [{text: newResponse}] }]);
      setPrompt('');
      // Set the system message to the first item in the history
      const systemMessageItem = history.find(item => item.role === 'system');
      console.log('System message item:', systemMessageItem);
      if (systemMessageItem) {
        setSystemMessage(systemMessageItem.parts[0].text);
      }
    } catch (error) {
      console.error('Error fetching response:', error);
      setError('An error occurred while fetching the response: ' + error);
    } finally {
      setLoading(false); // Stop loading animation
    }
  };

  // Function to delete all history except the system message
  const handleDeleteHistory = () => {
    setHistory(prevHistory => prevHistory.filter(item => item.role === 'system'));
  };

  // Function to delete a specific history item
  const handleDeleteItem = (index: number) => {
    setHistory((prevHistory) => prevHistory.filter((_, i) => i !== index));
  };

  // Function to edit a specific history item
  const handleEditItem = (index: number, newText: string) => {
    setHistory((prevHistory) =>
      prevHistory.map((item, i) =>
        i === index
          ? { ...item, parts: [{ ...item.parts[0], text: newText }] }
          : item
      )
    );
  };

  return (
    <div className="App min-h-screen w-screen bg-gradient-to-b from-blue-50 to-gray-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          AI Model Sandbox
        </h1>

        <SystemMessageInput
          systemMessageInput={systemMessage}
          setSystemMessageInput={setSystemMessage}
        />

        <History
          history={history}
          onDeleteHistory={handleDeleteHistory}
          onDeleteItem={handleDeleteItem}
          onEditItem={handleEditItem}
        />

        {error && (
          <div className="mt-4 text-red-600 text-center bg-red-100 p-3 rounded-lg">
            {error}
            <br/><br />
            Only classic text models are supported for now.
          </div>
        )}


        <PromptInput prompt={prompt} setPrompt={setPrompt} />

        <div className="flex flex-row items-center gap-x-8 gap-y-4 mt-6">
          <ModelSelector
            models={memoizedModels}
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
          />
          <button
            onClick={handleSubmit}
            className={`w-3/4 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200 self-end flex items-center justify-center ${
              loading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Send Prompt'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;