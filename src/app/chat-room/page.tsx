// src/app/chat-room/page.tsx
import { ChatRoom } from "@/components/chat-room";
import Image from "next/image";

export default function ChatRoomPage() {
  return (
    <div className="mx-auto max-w-4xl w-full h-full flex flex-col">
       <div className="flex flex-col items-center">
        <Image
            src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGh3cWxvY3d2eTVmd3Zra2R3cWN4Ynd5Ymw0MnljeTQxb2pvYXlnaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/4mNmHkucD6JYheJ0ZJ/giphy.gif"
            alt="Welcome GIF"
            width={200}
            height={200}
            unoptimized
            className="rounded-lg"
            data-ai-hint="friendly welcome"
        />
        <p className="text-center mt-2 mb-8 text-lg text-muted-foreground">
          Connect with others, share experiences, and find support.
        </p>
       </div>
      <ChatRoom />
    </div>
  );
}
