// src/app/chat-room/page.tsx
import { ChatRoom } from "@/components/chat-room";
import Image from "next/image";

export default function ChatRoomPage() {
  return (
    <div className="mx-auto max-w-4xl w-full h-full flex flex-col">
       <div className="flex flex-col items-center">
        <div className="flex justify-center items-center gap-4 mb-6">
            <Image
                src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGh3cWxvY3d2eTVmd3Zra2R3cWN4Ynd5Ymw0MnljeTQxb2pvYXlnaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/4mNmHkucD6JYheJ0ZJ/giphy.gif"
                alt="Welcome GIF"
                width={150}
                height={150}
                unoptimized
                className="rounded-lg flex-shrink-0"
                data-ai-hint="friendly welcome"
            />
            <div className="relative bg-muted p-4 rounded-lg rounded-bl-none shadow-md">
                <p className="text-md italic text-foreground">&quot;Welcome on board! Let's wave your worries into oblivion!&quot;</p>
                <div className="absolute bottom-0 left-[-10px] w-0 h-0 border-t-[10px] border-t-transparent border-r-[10px] border-r-muted border-b-[10px] border-b-transparent"></div>
            </div>
        </div>
        <p className="text-center mt-2 mb-8 text-lg text-muted-foreground">
          Connect with others, share experiences, and find support.
        </p>
       </div>
      <ChatRoom />
    </div>
  );
}
