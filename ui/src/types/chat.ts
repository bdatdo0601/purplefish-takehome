export interface ChatMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

export type ChatSessionMetadata = object;

export interface ChatSessionData {
  messages: ChatMessage[];
}

export interface ChatSession {
  id: string;
  title: string;
  metadata: ChatSessionMetadata;
  session_data: {
    messages: ChatMessage[];
    isCompleted: boolean;
    isLoading: boolean;
  };
  created_at: Date;
  updated_at: Date;
}
