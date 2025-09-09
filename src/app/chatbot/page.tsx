
'use client';

import { useState } from "react";
import { Chatbot } from "@/components/chatbot";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const issueOptions = [
  "Feeling Anxious",
  "Stress at Work",
  "Relationship Problems",
  "Feeling Down",
  "Just want to talk",
];

export default function ChatbotPage() {
  const [initialMessage, setInitialMessage] = useState<string | undefined>();

  const handleOptionClick = (option: string) => {
    setInitialMessage(option);
  };

  return (
    <div className="mx-auto max-w-2xl w-full h-full flex flex-col">
       <p className="text-center mt-2 mb-8 text-lg text-muted-foreground">
         Chat with our AI to get advice and support.
        </p>
        <div className="flex justify-center items-center gap-4 mb-6">
            <Image 
                src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWN3eDR2bnVqNWdya2ZiZ3Jpa2I0c2FiaXo1djVqcGkwdWJraG5oNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/xnmqgLtQZv9M1fo6n4/giphy.gif"
                alt="Friendly AI Assistant GIF"
                width={150}
                height={150}
                unoptimized
                className="rounded-full"
                data-ai-hint="friendly robot"
            />
            <div className="relative bg-muted p-4 rounded-lg rounded-bl-none shadow-md">
                <p className="text-md italic text-foreground">&quot;Hey there pal! Wanna talk?&quot;</p>
                <div className="absolute bottom-0 left-[-10px] w-0 h-0 border-t-[10px] border-t-transparent border-r-[10px] border-r-muted border-b-[10px] border-b-transparent"></div>
            </div>
        </div>

      {initialMessage ? (
         <Chatbot initialMessage={initialMessage} />
      ) : (
        <Card>
            <CardHeader>
                <CardTitle className="text-center">What exactly is your problem?</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2 justify-center">
                {issueOptions.map((option) => (
                    <Button key={option} variant="outline" onClick={() => handleOptionClick(option)}>
                        {option}
                    </Button>
                ))}
            </CardContent>
        </Card>
      )}
    </div>
  );
}
