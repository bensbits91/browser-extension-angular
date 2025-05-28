import { FormHelper } from './formHelper';

// Report forms when the content script loads
const formSummaries = FormHelper.getFormSummaries();
chrome.runtime.sendMessage({
  type: 'FORMS_DETECTED',
  forms: formSummaries,
});

// Listen for highlight message from background script
chrome.runtime.onMessage.addListener((message: any, sender, sendResponse) => {
  if (message.type === 'HIGHLIGHT_FORMS') {
    FormHelper.highlightForms();
  }
});
