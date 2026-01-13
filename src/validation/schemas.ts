import { z } from 'zod';

export const timerSettingsSchema = z.object({
  time: z.number().min(1).max(3600), // 1 second to 1 hour
  rest: z.number().min(0).max(600), // 0 to 10 minutes
  repetitions: z.number().min(1).max(100), // 1 to 100 repetitions
});

export type TimerSettings = z.infer<typeof timerSettingsSchema>;
