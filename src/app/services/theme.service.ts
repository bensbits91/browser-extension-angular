import { Injectable } from '@angular/core';

// Declare chrome as a global variable for TypeScript
declare const chrome: any;

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly key = 'darkMode';

  /**
   * Sets the dark mode preference in chrome.storage.sync.
   * @param value - Boolean indicating whether dark mode is enabled.
   */
  setDarkMode(value: boolean): void {
    if (
      typeof chrome !== 'undefined' &&
      chrome.storage &&
      chrome.storage.sync
    ) {
      chrome.storage.sync.set({ [this.key]: value }, () => {
        if (chrome.runtime && chrome.runtime.lastError) {
          console.error('Storage set error:', chrome.runtime.lastError);
        } else {
          console.log('Saved darkMode:', value);
        }
      });
    }
  }

  /**
   * Retrieves the dark mode preference from chrome.storage.sync.
   * @returns Promise resolving to a boolean indicating if dark mode is enabled.
   */
  getDarkMode(): Promise<boolean> {
    return new Promise((resolve) => {
      if (
        typeof chrome !== 'undefined' &&
        chrome.storage &&
        chrome.storage.sync
      ) {
        chrome.storage.sync.get(
          [this.key],
          (result: { [key: string]: boolean }) => {
            console.log('Loaded darkMode:', result[this.key]);
            resolve(!!result[this.key]);
          }
        );
      } else {
        resolve(false);
      }
    });
  }
}
