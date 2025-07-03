import React, { createContext, useContext, useState, ReactNode } from 'react';

type FlashMessageType = 'success' | 'error';

interface FlashMessage {
  message: string;
  type: FlashMessageType;
}

interface FlashMessageContextProps {
  flashMessage: FlashMessage | null;
  showFlash: (message: string, type: FlashMessageType) => void;
  clearFlash: () => void;
}

const FlashMessageContext = createContext<FlashMessageContextProps | null>(null);

export const FlashMessageProvider = ({ children }: { children: ReactNode }) => {
  const [flashMessage, setFlashMessage] = useState<FlashMessage | null>(null);

  const showFlash = (message: string, type: FlashMessageType) => {
    setFlashMessage({ message, type });
    setTimeout(() => setFlashMessage(null), 5000); // auto-clear after 5s
  };

  const clearFlash = () => setFlashMessage(null);

  return (
    <FlashMessageContext.Provider value={{ flashMessage, showFlash, clearFlash }}>
      {children}
    </FlashMessageContext.Provider>
  );
};

export const useFlashMessage = () => {
  const context = useContext(FlashMessageContext);
  if (!context) {
    throw new Error('useFlashMessage must be used within a FlashMessageProvider');
  }
  return context;
};
