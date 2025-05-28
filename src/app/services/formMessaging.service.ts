/// <reference types="chrome" />
import { Injectable, NgZone } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FormMessagingService {
  constructor(private ngZone: NgZone) {}

  getForms(): Promise<any[]> {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ type: 'GET_FORMS' }, (response: any) => {
        this.ngZone.run(() => {
          resolve(response?.forms || []);
        });
      });
    });
  }
}
