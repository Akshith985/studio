
"use server";

import { generatePersonalizedMeditation, type PersonalizedMeditationInput } from "@/ai/flows/personalized-meditation";
import { getBreathingExerciseCount } from "@/ai/flows/anxiety-based-breathing-guidance";
import { generateChatResponse } from "@/ai/flows/chatbot";
import { z } from "zod";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { cookies } from "next/headers";

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


const contactSchema = z.object({
  name: z.string().min(2, { message: "Please enter your name." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Please enter a message of at least 10 characters." }),
});


type ContactState = {
    success?: boolean;
    error?: string;
    errors?: {
        name?: string[];
        email?: string[];
        message?: string[];
    };
};

export async function sendContactMessageAction(
  prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const validatedFields = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      error: 'Please check the form for errors.'
    };
  }
  
  try {
    const { name, email, message } = validatedFields.data;
    const webhookUrl = process.env.BREVO_WEBHOOK_URL;
    const apiKey = process.env.BREVO_API_KEY;

    if (!webhookUrl || !apiKey) {
      throw new Error("Brevo credentials are not configured.");
    }
    
    // In a real application, you would send an email or save to a database here.
    // For now, we'll just log it to the console.
    console.log("New contact message received, sending to Brevo:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        name,
        email,
        message,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Brevo API Error:", errorBody);
      throw new Error(`Brevo API responded with status ${response.status}`);
    }

    return { success: true };
  } catch (e) {
    console.error(e);
    return { error: "Failed to send message. Please try again later." };
  }
}

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type AuthState = {
  success: boolean;
  error?: string;
};

export async function loginAction(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const validatedFields = authSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return { success: false, error: "Invalid email or password." };
  }

  try {
    const { email, password } = validatedFields.data;
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();
    cookies().set('firebaseIdToken', idToken, { secure: true, httpOnly: true });
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export async function registerAction(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const validatedFields = authSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return { success: false, error: "Invalid email or password (must be at least 6 characters)." };
  }

  try {
    const { email, password } = validatedFields.data;
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();
    cookies().set('firebaseIdToken', idToken, { secure: true, httpOnly: true });
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}
