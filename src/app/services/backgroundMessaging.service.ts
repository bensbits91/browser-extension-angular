import { FormStorageService } from './formStorage.service';

/**
 * Handles background messaging between content scripts, popup, and storage.
 * Listens for form detection and retrieval messages, and relays highlight commands.
 */
export class BackgroundMessagingService {
  /**
   * Constructs the BackgroundMessagingService and sets up message listeners.
   * @param formStorage - Service for storing and retrieving form data.
   */
  constructor(private formStorage: FormStorageService) {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      // Store forms sent from content scripts
      if (message.type === 'FORMS_DETECTED') {
        this.formStorage.setForms(message.forms);
      }
      // Respond to requests for stored forms
      if (message.type === 'GET_FORMS') {
        sendResponse({ forms: this.formStorage.getForms() });
      }
    });
  }

  /**
   * Sends a message to the specified tab to highlight detected forms.
   * @param tabId - The ID of the tab to send the highlight message to.
   */
  sendHighlightMessage(tabId: number) {
    chrome.tabs.sendMessage(tabId, { type: 'HIGHLIGHT_FORMS' });
  }
}
