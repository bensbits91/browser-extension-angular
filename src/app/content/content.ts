import { InputHelper } from './domHelper';

// Report inputs when the content script loads
const inputSummaries = InputHelper.getInputSummaries();
chrome.runtime.sendMessage({
  type: 'INPUTS_DETECTED',
  inputs: inputSummaries,
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'GET_INPUTS') {
    InputHelper.detectInputs().then((inputs) => {
      sendResponse({ inputs: InputHelper.serializeInputs(inputs) });
    });
    return true; // Keep the message channel open for async response
  }
  return false; // Explicitly return false for other message types
});

// Listen for highlight message from background script
chrome.runtime.onMessage.addListener((message: any, sender, sendResponse) => {
  if (message.type === 'HIGHLIGHT_INPUTS') {
    InputHelper.highlightInputs();
  }
});
