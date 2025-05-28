import {FormStorageService} from './formStorage.service';

export class BackgroundMessagingService {
  constructor(private formStorage: FormStorageService) {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === 'FORMS_DETECTED') {
        this.formStorage.setForms(message.forms);
      }
      if (message.type === 'GET_FORMS') {
        sendResponse({ forms: this.formStorage.getForms() });
      }
    });
  }

  sendHighlightMessage(tabId: number) {
    chrome.tabs.sendMessage(tabId, { type: 'HIGHLIGHT_FORMS' });
  }
}
