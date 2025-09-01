export type Log =
  | { type: 'INFO'; message: string }
  | { type: 'ERROR'; message: string; error: Error };

export type LogType = Log['type'];
export type ExtractNonTypeParams<L, T> = L extends { type: T }
  ? Omit<L, 'type'>
  : never;
