import { Log } from './log-types';

export function logIt(log: Log): void {
  switch (log.type) {
    case 'INFO':
      console.log(log.message);
      break;
    case 'ERROR':
      console.log(log.message, log.error.stack);
  }
}
