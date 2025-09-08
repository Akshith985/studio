// src/ai/flows/personalized-meditation.ts
'use server';

/**
 * @fileOverview Generates personalized meditation scripts based on user mood and previous sessions.
 *
 * - generatePersonalizedMeditation - A function that generates a personalized meditation script.
 * - PersonalizedMeditationInput - The input type for the generatePersonalizedMeditation function.
 * - PersonalizedMeditationOutput - The return type for the generatePersonalizedMeditation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedMeditationInputSchema = z.object({
  mood: z
    .string()
    .describe('The current mood of the user (e.g., happy, stressed, anxious).'),
  previousSessionsSummary: z
    .string()
    .optional()
    .describe("A summary of the user's previous meditation sessions, if available."),
});
export type PersonalizedMeditationInput = z.infer<
  typeof PersonalizedMeditationInputSchema
>;

const PersonalizedMeditationOutputSchema = z.object({
  title: z.string().describe('A short, calming title for the meditation.'),
  introduction: z
    .string()
    .describe('A brief introduction to the meditation, 1-2 sentences.'),
  steps: z
    .array(z.string())
    .describe('A list of 3-5 short, simple steps for the meditation.'),
  conclusion: z
    .string()
    .describe('A short concluding thought for the meditation, 1-2 sentences.'),
});
export type PersonalizedMeditationOutput = z.infer<
  typeof PersonalizedMeditationOutputSchema
>;

export async function generatePersonalizedMeditation(
  input: PersonalizedMeditationInput
): Promise<PersonalizedMeditationOutput> {
  return personalizedMeditationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedMeditationPrompt',
  input: {schema: PersonalizedMeditationInputSchema},
  output: {schema: PersonalizedMeditationOutputSchema},
  prompt: `You are a meditation guide. Generate a short, structured meditation based on the user's current mood. The entire meditation should be calm, concise, and easy to follow.

Current Mood: {{{mood}}}
Previous Sessions Summary: {{#if previousSessionsSummary}}{{{previousSessionsSummary}}}{{else}}None{{/if}}

Generate a response with a title, a short introduction (1-2 sentences), 3-5 simple steps, and a brief conclusion (1-2 sentences).`,
});

const personalizedMeditationFlow = ai.defineFlow(
  {
    name: 'personalizedMeditationFlow',
    inputSchema: PersonalizedMeditationInputSchema,
    outputSchema: PersonalizedMeditationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
