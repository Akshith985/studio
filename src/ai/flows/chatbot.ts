'use server';

/**
 * @fileOverview A simple chatbot that provides wellness advice.
 *
 * - generateChatResponse - A function that generates a response to a user's message.
 * - ChatbotInput - The input type for the chatbot flow.
 * - ChatbotOutput - The return type for the chatbot flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatbotInputSchema = z.object({
  message: z.string().describe('The user\'s message to the chatbot.'),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

const ChatbotOutputSchema = z.object({
  response: z.string().describe('The chatbot\'s response to the user.'),
});
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;

export async function generateChatResponse(
  input: ChatbotInput
): Promise<ChatbotOutput> {
  return chatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatbotPrompt',
  input: {schema: ChatbotInputSchema},
  output: {schema: ChatbotOutputSchema},
  prompt: `You are a friendly and supportive AI wellness coach. Your goal is to provide helpful advice and encouragement for mental well-being.

Your first response should be tailored to the user's initial message.

- If the user says "Feeling Anxious", respond with: "I understand that feeling of anxiety can be really overwhelming. Let's talk through it. What's on your mind right now?"
- If the user says "Stress at Work", respond with: "Work stress is tough, but we can figure out some ways to manage it. Can you tell me a bit more about what's been happening?"
- If the user says "Relationship Problems", respond with: "Navigating relationship issues is never easy. I'm here to listen without judgment. Feel free to share what you're comfortable with."
- If the user says "Feeling Down", respond with: "I'm sorry to hear you're feeling down. It's okay to not be okay. I'm here for you. What's been going on?"
- If the user says "Just want to talk", respond with: "I'm always here to listen. What's on your mind today?"

For all other messages, provide a concise, positive, and supportive response.

User: {{{message}}}
AI:`,
});

const chatbotFlow = ai.defineFlow(
  {
    name: 'chatbotFlow',
    inputSchema: ChatbotInputSchema,
    outputSchema: ChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
