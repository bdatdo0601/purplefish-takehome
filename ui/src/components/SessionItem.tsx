"use client";

import { deleteChatSession } from "@/app/actions";
import useQueryParams from "@/hooks";
import { ChatSession } from "@/types/chat";
import { redirect } from "next/navigation";

export default function SessionItem({ item }: { item: ChatSession }) {
  const { setQueryParams } = useQueryParams();
  return (
    <div
      key={item.id}
      className="p-3 rounded-lg bg-blue-50 border border-blue-200 cursor-pointer hover:bg-blue-100 mb-2 relative"
      onClick={() => {
        setQueryParams({ sessionId: item.id });
      }}
    >
      <div className="font-medium text-sm truncate">
        {item.title || `Session at ${item.created_at}`}
      </div>
      <div className="text-xs text-gray-500 mt-1">
        {new Date(item.updated_at).toLocaleDateString()}
      </div>
      <button
        className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
        onClick={(e) => {
          e.stopPropagation();
          deleteChatSession(item.id).then(() => {
            redirect("/");
          });
        }}
      >
        ×
      </button>
    </div>
  );
}
