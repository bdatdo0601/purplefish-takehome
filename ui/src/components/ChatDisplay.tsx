"use client";

import { ChatSession, ChatMessage } from "@/types/chat";
import ChatInput from "./ChatInput";
import { useEffect, useState, useRef } from "react";
import { onNewMessageInSession } from "@/app/actions";

interface ChatDisplayProps {
  chatSession: ChatSession;
}

export const ChatDisplay: React.FC<ChatDisplayProps> = ({ chatSession }) => {
  const [internalChatSession, setInternalChatSession] =
    useState<ChatSession>(chatSession);
  const isWaitingForAssistant = internalChatSession.session_data.isLoading;
  const isCompleted = internalChatSession.session_data.isCompleted;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setInternalChatSession(chatSession);
  }, [chatSession]);

  useEffect(() => {
    scrollToBottom();
  }, [internalChatSession]);

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div
        className="flex flex-col h-full border border-gray-200 rounded-lg shadow-sm max-w-700 w-full overflow-y-scroll relative"
        data-chat-id={internalChatSession.id}
      >
        <div className="flex-shrink-0 px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-lg sticky top-0 w-full">
          <h3 className="text-lg font-semibold">
            {internalChatSession.title ||
              `Session at ${internalChatSession.created_at}`}
          </h3>
        </div>

        <div className="flex-1 px-6 py-4 space-y-6 my-6">
          {internalChatSession.session_data.messages.map(
            (message: ChatMessage) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium ${
                      message.role === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-purple-500 text-white"
                    }`}
                  >
                    {message.role === "user" ? "You" : "PF"}
                  </div>
                </div>

                {/* Message content */}
                <div
                  className={`flex flex-col max-w-xs lg:max-w-md ${message.role === "user" ? "items-end" : "items-start"}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-600">
                      {message.role === "user" ? "You" : "Assistant"}
                    </span>
                    <span className="text-xs text-gray-400">
                      {message.timestamp.toString()}
                    </span>
                  </div>
                  <div
                    className={`px-4 py-3 rounded-2xl shadow-sm ${
                      message.role === "user"
                        ? "bg-blue-500 text-white rounded-br-md"
                        : "bg-white text-gray-900 border border-gray-200 rounded-bl-md"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              </div>
            ),
          )}

          {/* Loading indicator */}
          {isWaitingForAssistant && (
            <div className="flex gap-3 flex-row">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium bg-purple-500 text-white">
                  PF
                </div>
              </div>

              {/* Loading message content */}
              <div className="flex flex-col max-w-xs lg:max-w-md items-start">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-gray-600">
                    Assistant
                  </span>
                  <span className="text-xs text-gray-400">typing...</span>
                </div>
                <div className="px-4 py-3 rounded-2xl shadow-sm bg-white text-gray-900 border border-gray-200 rounded-bl-md">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <ChatInput
        onSend={async (message) => {
          const updatedSession: ChatSession = {
            ...internalChatSession,
            session_data: {
              isLoading: true,
              isCompleted: false,
              messages: [
                ...internalChatSession.session_data.messages,
                {
                  role: "user",
                  content: message,
                  timestamp: new Date(),
                  id: internalChatSession.session_data.messages.length.toString(),
                },
              ],
            },
          };
          setInternalChatSession(updatedSession);
          await onNewMessageInSession(updatedSession);
        }}
        disabled={isCompleted}
      />
    </div>
  );
};

export default ChatDisplay;
