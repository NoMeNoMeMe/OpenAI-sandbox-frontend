import React from 'react';

interface SystemMessageInputProps {
  systemMessageInput: string;
  setSystemMessageInput: (prompt: string) => void;
}

const SystemMessageInput: React.FC<SystemMessageInputProps> = ({ systemMessageInput, setSystemMessageInput }) => {
  return (
    <div className="m4-6 w-full">
      <label
        htmlFor="prompt-input"
        className="block text-lg font-medium text-gray-800 mb-2"
      >
        System Message:
      </label>
      <textarea
        id="system-message-input"
        value={systemMessageInput}
        onChange={(e) => setSystemMessageInput(e.target.value)}
        rows={6}
        className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 resize-none"
        placeholder="..."
      />
    </div>
  );
};

export default SystemMessageInput;