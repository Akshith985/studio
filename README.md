# SereneMind: Your Personal Guide to Mental Wellness

SereneMind is a comprehensive web application designed to support users on their mental wellness journey. Built with Next.js, Firebase, and Genkit, it offers a suite of interactive tools to promote mindfulness, relaxation, and emotional well-being.

## Features

### Core Experience
- **Dashboard:** A personalized central hub providing a quick glance at daily wellness tools, including a positive affirmation, mood tracker, and a wellness tip.
- **User Authentication:** Secure user registration and login using Firebase Authentication, with protected routes for personal content.
- **Gamification:** Earn "Wellness Points" by interacting with app features, adding a layer of motivation and tracking engagement.

### Interactive Tools
- **AI Wellness Coach (`/chatbot`):** A friendly AI-powered chatbot that provides supportive conversations. It starts with predefined topics and uses Google's Gemini model via Genkit to generate empathetic responses.
- **Unwind Corner (`/unwind`):** A dedicated space for relaxation, featuring two main activities:
    - **Guided Meditation:** An AI-powered generator that creates personalized meditation scripts based on the user's described mood.
    - **Breathing Exercises:** A tool that recommends a number of breathing cycles based on the user's self-reported anxiety level, complete with a visualizer to guide the user.
- **Community Chat Room (`/chat-room`):** An anonymous, real-time chat room where users can connect with others, share experiences, and find support. Messages are powered by Firebase Firestore.
- **Mood Tracker:** An interactive component on the dashboard that lets users log their daily mood, with a friendly mascot that reacts to their input.
- **Visual Relaxation:** A curated section with calming visuals and embedded videos to help users de-stress.

### Professional Support
- **Book a Session (`/contact`):** A form that allows users to book an appointment with a professional counsellor. The form integrates with Brevo to manage contact requests.
- **Video Call (`/video-call`):** A one-on-one video calling interface, allowing users to connect directly with counsellors. (Note: This is a frontend-only implementation and requires a WebRTC service for full functionality).

## Tech Stack

- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS
- **UI Components:** ShadCN UI for a modern, accessible, and customizable component library.
- **Generative AI:** Google AI (Gemini models) via Genkit for the chatbot, meditation generator, and breathing exercise recommendations.
- **Backend & Database:** Firebase (Authentication, Firestore) for user management and real-time data.
- **Styling:** Tailwind CSS for utility-first styling and `globals.css` for theme variables.
- **State Management:** React Context API for managing global state like authentication and user points.
- **Forms:** React Hook Form for managing form state and validation.

## Project Structure

```
/src
├── ai/                # Genkit AI flows
│   ├── flows/
│   └── genkit.ts      # Genkit configuration
├── app/               # Next.js App Router pages
│   ├── (pages)/       # Page components
│   └── layout.tsx     # Root layout
├── components/        # Reusable React components
│   ├── ui/            # ShadCN UI components
│   └── (custom)/      # Custom application components
├── context/           # React Context providers
│   ├── auth-provider.tsx
│   └── points-provider.tsx
├── hooks/             # Custom React hooks
├── lib/               # Core logic and utilities
│   ├── actions.ts     # Server Actions
│   ├── firebase.ts    # Firebase initialization
│   ├── types.ts       # TypeScript type definitions
│   └── utils.ts       # Utility functions
└── middleware.ts      # Next.js middleware for routing
```

## Getting Started

### Prerequisites
- Node.js (v18 or later)
- npm or yarn

### Environment Variables
Create a `.env.local` file in the root of the project and add your Firebase and Brevo API keys:

```bash
# Firebase Configuration (retrieve from your Firebase project settings)
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id

# Brevo API Key (for the contact form)
BREVO_API_KEY=your-brevo-api-key
```

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Development Server
To run the application locally, you need to run both the Next.js frontend and the Genkit AI flows concurrently.

1.  **Start the Genkit development server:**
    ```bash
    npm run genkit:dev
    ```
2.  **In a separate terminal, start the Next.js development server:**
    ```bash
    npm run dev
    ```
Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.
