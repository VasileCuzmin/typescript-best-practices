import { Log, LogType, ExtractNonTypeParams } from './log-types';

export function logIt<T extends LogType>(
  log: T,
  args: ExtractNonTypeParams<Log, T>
): void {
  switch (log) {
    case 'INFO':
      console.log(args.message);
      break;
    case 'ERROR':
      console.log(
        args.message,
        (args as ExtractNonTypeParams<Log, 'ERROR'>)['error'].stack
      );
  }
}
