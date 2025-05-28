import { InputStorageService } from './inputStorage.service';

/**
 * Handles background messaging between content scripts, popup, and storage.
 * Listens for input detection and retrieval messages, and relays highlight commands.
 */
export class BackgroundMessagingService {
  /**
   * Constructs the BackgroundMessagingService and sets up message listeners.
   * @param inputStorage - Service for storing and retrieving input data.
   */
  constructor(private inputStorage: InputStorageService) {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      // Store inputs sent from content scripts
      if (message.type === 'INPUTS_DETECTED') {
        this.inputStorage.setInputs(message.inputs);
      }
      // Respond to requests for stored inputs
      if (message.type === 'GET_INPUTS') {
        sendResponse({ inputs: this.inputStorage.getInputs() });
      }
    });
  }

  /**
   * Sends a message to the specified tab to highlight detected inputs.
   * @param tabId - The ID of the tab to send the highlight message to.
   */
  sendHighlightMessage(tabId: number) {
    chrome.tabs.sendMessage(tabId, { type: 'HIGHLIGHT_INPUTS' });
  }
}
