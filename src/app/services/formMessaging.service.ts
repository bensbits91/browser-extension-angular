/// <reference types="chrome" />
import { Injectable, NgZone } from '@angular/core';

/**
 * Service for communicating with content scripts to retrieve form data.
 * Uses Chrome extension messaging APIs to request detected forms from the active tab.
 */
@Injectable({ providedIn: 'root' })
export class FormMessagingService {
  constructor(private ngZone: NgZone) {}

  /**
   * Requests detected forms from the content script in the active tab.
   * @returns Promise resolving to an array of serialized form summaries.
   */
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
