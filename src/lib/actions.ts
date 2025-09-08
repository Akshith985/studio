
"use server";

import { generatePersonalizedMeditation, type PersonalizedMeditationInput } from "@/ai/flows/personalized-meditation";
import { getBreathingExerciseCount } from "@/ai/flows/anxiety-based-breathing-guidance";
import { generateChatResponse } from "@/ai/flows/chatbot";
import { z } from "zod";

const meditationSchema = z.object({
  mood: z.string().min(3, { message: "Please describe your current feelings or mood." }),
});

type MeditationState = {
  script?: string;
  error?: string;
};

export async function generateMeditationAction(
  prevState: MeditationState,
  formData: FormData
): Promise<MeditationState> {
  const validatedFields = meditationSchema.safeParse({
    mood: formData.get("mood"),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.mood?.[0],
    };
  }

  try {
    const result = await generatePersonalizedMeditation({ mood: validatedFields.data.mood });
    return { script: result.script };
  } catch (e) {
    console.error(e);
    return { error: "Failed to generate meditation. Please try again later." };
  }
}

const breathingSchema = z.object({
  anxietyLevel: z.coerce.number().min(1).max(10),
});

type BreathingState = {
  count?: number;
  error?: string;
};

export async function getBreathingRecommendationsAction(
  anxietyLevel: number
): Promise<BreathingState> {
  const validatedFields = breathingSchema.safeParse({ anxietyLevel });

  if (!validatedFields.success) {
    return {
      error: "Invalid anxiety level provided.",
    };
  }

  try {
    const result = await getBreathingExerciseCount({
      anxietyLevel: validatedFields.data.anxietyLevel,
    });
    return { count: result.exerciseCount };
  } catch (e) {
    console.error(e);
    return { error: "Failed to get recommendations. Please try again later." };
  }
}

const chatbotSchema = z.object({
  message: z.string().min(1, { message: "Message cannot be empty." }),
});

type ChatbotState = {
  response?: string;
  error?: string;
};

export async function chatbotAction(
  prevState: ChatbotState,
  formData: FormData
): Promise<ChatbotState> {
  const validatedFields = chatbotSchema.safeParse({
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.message?.[0],
    };
  }

  try {
    const result = await generateChatResponse({ message: validatedFields.data.message });
    return { response: result.response };
  } catch (e) {
    console.error(e);
    return { error: "Failed to get response. Please try again later." };
  }
}
