import { Observable } from 'rxjs';

export interface UseCase<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  execute(...params: any[]): Observable<T>;
}
