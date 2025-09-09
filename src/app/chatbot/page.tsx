import { Chatbot } from "@/components/chatbot";
import Image from "next/image";

export default function ChatbotPage() {
  return (
    <div className="mx-auto max-w-2xl w-full h-full flex flex-col">
       <p className="text-center mt-2 mb-8 text-lg text-muted-foreground">
         Chat with our AI to get advice and support.
        </p>
        <div className="flex justify-center mb-6">
            <Image 
                src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWN3eDR2bnVqNWdya2ZiZ3Jpa2I0c2FiaXo1djVqcGkwdWJraG5oNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/xnmqgLtQZv9M1fo6n4/giphy.gif"
                alt="Friendly AI Assistant GIF"
                width={150}
                height={150}
                unoptimized
                className="rounded-full"
                data-ai-hint="friendly robot"
            />
        </div>
      <Chatbot />
    </div>
  );
}
