import React from 'react';
import { useFlashMessage } from '../contexts/FlashMessageContext';
import { X } from 'lucide-react'; // Install `lucide-react` or replace with any close icon

const FlashMessageDisplay = () => {
  const { flashMessage, clearFlash } = useFlashMessage();

  if (!flashMessage) return null;
  return (
    <div
      className={`fixed top-16 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full shadow-lg rounded-lg px-4 py-3 flex items-center justify-between gap-2
        ${flashMessage.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}
        animate-fade-in`}
    >
      <span className="text-sm font-medium flex-grow text-center">{flashMessage.message}</span>
      <button
        onClick={() => {clearFlash}}
        className="text-white hover:text-gray-200"
        aria-label="Close flash message"
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default FlashMessageDisplay;
