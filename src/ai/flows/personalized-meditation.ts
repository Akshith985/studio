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
    .describe('A summary of the user\'s previous meditation sessions, if available.'),
});
export type PersonalizedMeditationInput = z.infer<
  typeof PersonalizedMeditationInputSchema
>;

const PersonalizedMeditationOutputSchema = z.object({
  script: z
    .string()
    .describe('A personalized meditation script tailored to the user\'s current mood and previous sessions.'),
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
  prompt: `You are a meditation guide. Generate a personalized meditation script based on the user's current mood and previous meditation sessions.

Current Mood: {{{mood}}}
Previous Sessions Summary: {{#if previousSessionsSummary}}{{{previousSessionsSummary}}}{{else}}None{{/if}}

Meditation Script:`, // Keep Handlebars syntax, change prompt text, add conditional for optional field
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
