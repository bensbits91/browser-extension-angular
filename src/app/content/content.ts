import { FormHelper } from './formHelper';

// Report forms when the content script loads
const formSummaries = FormHelper.getFormSummaries();
chrome.runtime.sendMessage({
  type: 'FORMS_DETECTED',
  forms: formSummaries,
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'GET_FORMS') {
    FormHelper.detectForms().then((forms) => {
      sendResponse({ forms: FormHelper.serializeForms(forms) });
    });
    return true; // Keep the message channel open for async response
  }
  return false; // Explicitly return false for other message types
});

// Listen for highlight message from background script
chrome.runtime.onMessage.addListener((message: any, sender, sendResponse) => {
  if (message.type === 'HIGHLIGHT_FORMS') {
    FormHelper.highlightForms();
  }
});
