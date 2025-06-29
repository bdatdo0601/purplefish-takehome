import ChatBox from "@/components/ChatBox";
import ChatSidebar from "@/components/ChatSidebar";
import SessionList from "@/components/SessionList";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ sessionId: string }>;
}) {
  const sessionId = (await searchParams).sessionId;
  return (
    <div className="h-full mx-auto w-full">
      <div className="h-full flex flex-row gap-2">
        <ChatSidebar SessionList={<SessionList />} />

        {/* Main chat area */}
        {sessionId && <ChatBox id={sessionId} onSend={() => {}} />}
      </div>
    </div>
  );
}
