
"use server";

import { generatePersonalizedMeditation, type PersonalizedMeditationInput } from "@/ai/flows/personalized-meditation";
import { getBreathingExerciseCount } from "@/ai/flows/anxiety-based-breathing-guidance";
import { generateChatResponse } from "@/ai/flows/chatbot";
import { z } from "zod";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { cookies } from "next/headers";
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy } from "firebase/firestore";
import { Message } from "./types";

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
    const apiKey = process.env.BREVO_API_KEY;

    if (!apiKey) {
      throw new Error("Brevo API Key is not configured.");
    }

    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        email,
        attributes: {
          // Note: 'FIRSTNAME' and 'MESSAGE' are example attribute names.
          // You must create these attributes in your Brevo account first.
          'FIRSTNAME': name,
          'MESSAGE': message,
        },
        // If you have a specific list you want to add contacts to, specify its ID here.
        // listIds: [123] 
      }),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error("Brevo API Error:", errorBody);
      throw new Error(`Brevo API responded with status ${response.status}: ${errorBody.message}`);
    }

    console.log('Successfully added contact to Brevo.');
    return { success: true };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
    return { error: `Failed to send message. Please try again later. Details: ${errorMessage}` };
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


const messageSchema = z.object({
  message: z.string().min(1).max(500),
});

type MessageState = {
  success?: boolean;
  error?: string;
}

export async function sendMessageAction(formData: FormData): Promise<MessageState | void> {
  const user = auth.currentUser;
  if (!user || !user.email) {
    return { error: "You must be logged in to send a message." };
  }

  const validatedFields = messageSchema.safeParse({
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.message?.[0],
    };
  }

  try {
    await addDoc(collection(db, "messages"), {
      text: validatedFields.data.message,
      userEmail: user.email,
      timestamp: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    console.error("Error sending message:", error);
    return { error: "Failed to send message. Please try again." };
  }
}

export async function getMessages(): Promise<{messages?: Message[], error?: string}> {
    try {
        const messagesCol = collection(db, 'messages');
        const q = query(messagesCol, orderBy('timestamp', 'asc'));
        const messageSnapshot = await getDocs(q);
        const messageList = messageSnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                text: data.text,
                userEmail: data.userEmail,
                timestamp: data.timestamp.toDate(),
            }
        });
        return { messages: messageList };
    } catch (error) {
        console.error("Error fetching messages:", error);
        return { error: "Failed to fetch messages." };
    }
}
