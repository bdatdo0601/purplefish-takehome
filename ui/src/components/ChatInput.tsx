"use client";

import React, { useCallback, useState } from "react";

interface ChatInputProps {
  disabled?: boolean;
  onSend: (message: string) => Promise<void>;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [inputMessage, setInputMessage] = useState("");

  const handleSend = useCallback(async () => {
    const input = inputMessage.trim();
    setInputMessage("");
    if (input) {
      await onSend(input);
    }
  }, [inputMessage]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex-shrink-0 px-6 py-4 border-t border-gray-200 border rounded-lg h-30">
      <div className="flex gap-2 items-center">
        <textarea
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={disabled ? "" : "Type your message..."}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white resize-none disabled:bg-gray-700"
          rows={3}
          disabled={disabled}
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
