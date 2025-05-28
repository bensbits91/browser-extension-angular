/// <reference types="chrome" />
import { Injectable, NgZone } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FormMessagingService {
  constructor(private ngZone: NgZone) {}

  getForms(): Promise<any[]> {
    return new Promise((resolve) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (!tabs[0]?.id) {
          resolve([]);
          return;
        }
        chrome.tabs.sendMessage(
          tabs[0].id,
          { type: 'GET_FORMS' },
          (response: any) => {
            this.ngZone.run(() => {
              resolve(response?.forms || []);
            });
          }
        );
      });
    });
  }
}
