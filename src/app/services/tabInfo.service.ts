import { Injectable } from '@angular/core';

declare const chrome: any;

interface Tab {
  url?: string;
  title?: string;
}

interface TabInfo {
  title: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class TabInfoService {
  /**
   * Retrieves information about the currently active browser tab.
   * Handles restricted pages (e.g., chrome://, edge://) and unavailable APIs gracefully.
   * @returns Promise resolving to an object containing the tab's title and URL.
   */
  getTabInfo(): Promise<{ title: string; url: string }> {
    return new Promise((resolve) => {
      if (typeof chrome !== 'undefined' && chrome.tabs) {
        chrome.tabs.query(
          { active: true, currentWindow: true },
          (tabs: Tab[]) => {
            if (chrome.runtime?.lastError) {
              resolve({
                title: 'Restricted Page',
                url: 'This page cannot be accessed by the extension.',
              } as TabInfo);
              return;
            }
            const tab: Tab = tabs[0];
            const url: string = tab?.url || '';
            if (
              url.startsWith('chrome://') ||
              url.startsWith('edge://') ||
              url === ''
            ) {
              resolve({
                title: 'Restricted Page',
                url: 'This page cannot be accessed by the extension.',
              } as TabInfo);
            } else {
              resolve({
                title: tab?.title || '',
                url,
              } as TabInfo);
            }
          }
        );
      } else {
        resolve({
          title: 'Unavailable',
          url: 'chrome.tabs API not available',
        });
      }
    });
  }
}
