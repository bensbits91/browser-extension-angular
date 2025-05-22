console.log('Content script running...');

class FormDetector {
  detectForms(): HTMLFormElement[] {
    return Array.from(document.querySelectorAll('form'));
  }

  reportForms(): void {
    const forms = this.detectForms();
    // For demonstration, we'll just log them
    console.log(`[FormDetector] Found ${forms.length} form(s) on the page.`);

    const formSummaries = forms.map((form) => ({
      action: form.action,
      method: form.method,
      id: form.id,
      className: form.className,
    }));

    chrome.runtime.sendMessage({
      type: 'FORMS_DETECTED',
      forms: formSummaries,
    });

    forms.forEach((form, idx) => {
      console.log(`[FormDetector] Form #${idx + 1}:`, form);
    });
  }
}

// Run detection when the content script loads
const detector = new FormDetector();
detector.reportForms();
