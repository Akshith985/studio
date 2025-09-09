// src/app/chat-room/page.tsx
import { ChatRoom } from "@/components/chat-room";

export default function ChatRoomPage() {
  return (
    <div className="mx-auto max-w-4xl w-full h-full flex flex-col">
       <p className="text-center mt-2 mb-8 text-lg text-muted-foreground">
          Connect with others, share experiences, and find support.
        </p>
      <ChatRoom />
    </div>
  );
}
