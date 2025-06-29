import { ChatSession } from "@/types/chat";
import PocketBase from "pocketbase";
import SessionItem from "./SessionItem";
import { EventSource } from "eventsource";

global.EventSource = EventSource;

export default async function SessionList() {
  const pb = new PocketBase("http://127.0.0.1:8090");
  let chatSessions = await pb
    .collection("chat_sessions")
    .getFullList<ChatSession>();

  pb.collection("chat_sessions").subscribe("*", async (e) => {
    chatSessions = await pb
      .collection("chat_sessions")
      .getFullList<ChatSession>();
  });
  return (
    <div className="flex flex-col gap-2 my-2">
      {chatSessions.map((session) => (
        <SessionItem item={session} key={session.id} />
      ))}
    </div>
  );
}
