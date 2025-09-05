import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NewListPopupService {
  public createList$: Subject<string> = new Subject<string>();
  public closeList$: Subject<void> = new Subject<void>();
}
