import React from 'react';

interface ResponseDisplayProps {
  response: string;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ response }) => {
  return (
    <div className="mt-6 w-full max-w-4xl bg-gray-100 p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">AI Response:</h2>
      <p className="text-gray-700 whitespace-pre-wrap">{response || 'No response yet.'}</p>
    </div>
  );
};

export default ResponseDisplay;