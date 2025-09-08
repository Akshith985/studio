import { Chatbot } from "@/components/chatbot";

export default function ChatbotPage() {
  return (
    <div className="mx-auto max-w-2xl w-full">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">AI Wellness Coach</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Chat with our AI to get advice and support.
        </p>
      </div>
      <Chatbot />
    </div>
  );
}
