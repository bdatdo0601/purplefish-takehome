import { ChatSession } from "@/types/chat";
import PocketBase from "pocketbase";
import ChatDisplay from "./ChatDisplay";

interface ChatBoxProps {
  id: string;
  onSend: (message: string) => void;
}

export const ChatBox: React.FC<ChatBoxProps> = async ({ id }) => {
  const pb = new PocketBase("http://localhost:8090");
  let chatSession;
  try {
    chatSession = await pb.collection("chat_sessions").getOne<ChatSession>(id);
  } catch (error) {
    console.log(error);
  }
  pb.collection("chat_sessions").subscribe(id, async (e) => {
    if (e.action === "update") {
      chatSession = await pb
        .collection("chat_sessions")
        .getOne<ChatSession>(id);
    }
  });
  if (!chatSession) return null;

  return <ChatDisplay chatSession={chatSession} />;
};

export default ChatBox;
