/// <reference types="chrome" />
import { Injectable, NgZone } from '@angular/core';

/**
 * Service for communicating with content scripts to retrieve input data.
 * Uses Chrome extension messaging APIs to request detected inputs from the active tab.
 */
@Injectable({ providedIn: 'root' })
export class InputMessagingService {
  constructor(private ngZone: NgZone) {}

  /**
   * Requests detected inputs from the content script in the active tab.
   * @returns Promise resolving to an array of serialized input summaries.
   */
  getInputs(): Promise<any[]> {
    return new Promise((resolve) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (!tabs[0]?.id) {
          resolve([]);
          return;
        }
        chrome.tabs.sendMessage(
          tabs[0].id,
          { type: 'GET_INPUTS' },
          (response: any) => {
            this.ngZone.run(() => {
              resolve(response?.inputs || []);
            });
          }
        );
      });
    });
  }
}
