export type Log =
  | { type: 'INFO'; message: string }
  | { type: 'ERROR'; message: string; error: Error };
