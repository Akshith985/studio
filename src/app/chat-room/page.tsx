// src/app/chat-room/page.tsx
import { ChatRoom } from "@/components/chat-room";

export default function ChatRoomPage() {
  return (
    <div className="mx-auto max-w-4xl w-full">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Chat Room</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Connect with others, share experiences, and find support.
        </p>
      </div>
      <ChatRoom />
    </div>
  );
}
