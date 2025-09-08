'use server';

/**
 * @fileOverview A flow that determines the appropriate number of breathing exercises based on the user's anxiety levels reported via mood tracking.
 *
 * - getBreathingExerciseCount - A function that returns the number of breathing exercises to recommend.
 * - GetBreathingExerciseCountInput - The input type for the getBreathingExerciseCount function.
 * - GetBreathingExerciseCountOutput - The return type for the getBreathingExerciseCount function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetBreathingExerciseCountInputSchema = z.object({
  anxietyLevel: z
    .number()
    .describe(
      'The user reported anxiety level. Should be a number between 1 and 10, inclusive.'
    ),
});
export type GetBreathingExerciseCountInput = z.infer<
  typeof GetBreathingExerciseCountInputSchema
>;

const GetBreathingExerciseCountOutputSchema = z.object({
  exerciseCount: z
    .number()
    .describe(
      'The number of breathing exercises to recommend to the user based on their anxiety level.'
    ),
});
export type GetBreathingExerciseCountOutput = z.infer<
  typeof GetBreathingExerciseCountOutputSchema
>;

export async function getBreathingExerciseCount(
  input: GetBreathingExerciseCountInput
): Promise<GetBreathingExerciseCountOutput> {
  return getBreathingExerciseCountFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getBreathingExerciseCountPrompt',
  input: {schema: GetBreathingExerciseCountInputSchema},
  output: {schema: GetBreathingExerciseCountOutputSchema},
  prompt: `You are a mental health expert. Given a user's reported anxiety level (on a scale of 1 to 10), determine the appropriate number of breathing exercises to recommend.

Anxiety Level: {{{anxietyLevel}}}

Respond with only a number. The number of exercises should range from 1 to 5. Higher anxiety levels indicate a need for more exercises.
`,
});

const getBreathingExerciseCountFlow = ai.defineFlow(
  {
    name: 'getBreathingExerciseCountFlow',
    inputSchema: GetBreathingExerciseCountInputSchema,
    outputSchema: GetBreathingExerciseCountOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
