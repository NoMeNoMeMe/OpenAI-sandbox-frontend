import React from 'react';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
}

const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt }) => {
  return (
    <div className="mb-6 w-full">
      <label
        htmlFor="prompt-input"
        className="block text-lg font-medium text-gray-800 my-2"
      >
        Enter your prompt:
      </label>
      <textarea
        id="prompt-input"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={6}
        className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 resize-none"
        placeholder="Type your prompt here..."
      />
    </div>
  );
};

export default PromptInput;