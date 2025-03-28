import React, { useState } from 'react';
import { HistoryItem } from '../typings/history';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface HistoryProps {
  history: HistoryItem[];
  onDeleteHistory: () => void; // Function to delete all history
  onDeleteItem: (index: number) => void; // Function to delete a specific item
  onEditItem: (index: number, newText: string) => void; // Function to edit a specific item
}

const History: React.FC<HistoryProps> = ({ history, onDeleteHistory, onDeleteItem, onEditItem }) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null); // Track the index of the item being edited
  const [editText, setEditText] = useState(''); // Track the text being edited

  const handleEditClick = (index: number, currentText: string) => {
    setEditingIndex(index); // Set the index of the item being edited
    setEditText(currentText); // Set the current text for editing
  };

  const handleSaveClick = (index: number) => {
    onEditItem(index, editText); // Save the edited text
    setEditingIndex(null); // Exit edit mode
    setEditText(''); // Clear the edit text
  };

  const handleCancelClick = () => {
    setEditingIndex(null); // Exit edit mode
    setEditText(''); // Clear the edit text
  };

  return (
    <div className="mt-6 w-full max-w-4xl bg-gray-50 p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">History</h2>
        <button
          onClick={onDeleteHistory}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Delete All History
        </button>
      </div>
      <div className="space-y-6">
        {history.map((item, index) => (
          <div key={index} className="p-4 bg-white rounded-lg shadow">
            <div className="flex justify-between items-center">
              <p className="text-left">
                <span className="text-gray-800 font-medium capitalize">{item.role}</span>
                {item.role === 'assistant' && item.model && (
                  <span className="text-zinc-300">{"    " + item.model.replace("models/", "")}</span>
                )}
              </p>
              <div className="flex gap-2">
                {editingIndex === index ? (
                  <>
                    <button
                      onClick={() => handleSaveClick(index)}
                      className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelClick}
                      className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditClick(index, item.parts[0]?.text || '')}
                      className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDeleteItem(index)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
            <hr className="my-2 border-gray-300" />
            <div className="text-gray-700 text-left overflow-auto">
              {editingIndex === index ? (
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  rows={4}
                />
              ) : (
                <Markdown remarkPlugins={[remarkGfm]}>{item.parts[0]?.text || ''}</Markdown>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;