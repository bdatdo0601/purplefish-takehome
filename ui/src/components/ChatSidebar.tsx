"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { createChatSession } from "@/app/actions";
import useQueryParams from "@/hooks";

interface ChatSidebarProps {
  SessionList: React.ReactNode;
}

export default function ChatSidebar({ SessionList }: ChatSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { setQueryParams } = useQueryParams();

  return (
    <>
      {/* Toggle button - visible on mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md border border-gray-200 hover:bg-gray-50"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Desktop sidebar - always visible on large screens */}
      <div className="hidden md:block w-64 rounded-lg shadow-lg border border-gray-200 h-full">
        <div className="p-4 border-b border-gray-200 bg-white rounded-t-lg">
          <h2 className="text-lg font-semibold">Chat Sessions</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="p-2">
            <button
              className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 w-full hover:cursor-pointer"
              onClick={() => {
                createChatSession().then((id) => {
                  setQueryParams({ sessionId: id });
                });
              }}
            >
              New Session
            </button>
            {SessionList}
          </div>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />

          {/* Sidebar */}
          <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform md:hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Chat Sessions</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              <button
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 w-full hover:cursor-pointer"
                onClick={() => {
                  createChatSession().then((id) => {
                    setQueryParams({ sessionId: id });
                  });
                }}
              >
                New Session
              </button>
              <div className="p-2">{SessionList}</div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
