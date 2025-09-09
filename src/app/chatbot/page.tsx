import { Chatbot } from "@/components/chatbot";

export default function ChatbotPage() {
  return (
    <div className="mx-auto max-w-2xl w-full h-full flex flex-col">
       <p className="text-center mt-2 mb-8 text-lg text-muted-foreground">
         Chat with our AI to get advice and support.
        </p>
      <Chatbot />
    </div>
  );
}
