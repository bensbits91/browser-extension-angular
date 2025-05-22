/// <reference types="chrome" />
console.log('Background script running...');

interface FormsDetectedMessage {
  type: 'FORMS_DETECTED';
  forms: unknown[]; // Replace 'unknown' with a more specific type if available
}

type BackgroundMessage = FormsDetectedMessage;

interface DetectedForm {
  // Define properties of a detected form here if known, otherwise use 'any'
  [key: string]: any;
}

let lastDetectedForms: DetectedForm[] = [];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'FORMS_DETECTED') {
    lastDetectedForms = message.forms;
  }
  if (message.type === 'GET_FORMS') {
    sendResponse({ forms: lastDetectedForms });
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'highlight-forms',
    title: 'Highlight Forms',
    contexts: ['all'],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'highlight-forms' && tab?.id) {
    chrome.tabs.sendMessage(tab.id, { type: 'HIGHLIGHT_FORMS' });
  }
});