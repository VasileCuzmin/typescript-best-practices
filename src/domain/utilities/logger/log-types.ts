export type Log =
  | { type: 'INFO'; message: string }
  | { type: 'ERROR'; message: string; error: Error };

export type LogType = Log['type']; // LogType is of type 'INFO' | 'ERROR'

// ExtractNonTypeParams is a utility type that extracts the properties of a union type L that match a specific type T,'
//  excluding the 'type' property itself.
export type ExtractNonTypeParams<L, T> = L extends { type: T }
  ? Omit<L, 'type'>
  : never;

type Test =
  | { type: 'TEST'; message: string }
  | { type: 'ANOTHER'; message: string };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type V = Test['message']; // V is of type string
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type C = Test['type']; // C is of type 'TEST' | 'ANOTHER'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type v = ExtractNonTypeParams<Test, 'TEST'>; // v is of type { message: string }
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type w = ExtractNonTypeParams<Test, 'ANOTHER'>; // w is of type { message: string }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type x = ExtractNonTypeParams<Test, 'NON_EXISTENT'>; // x is of type never
