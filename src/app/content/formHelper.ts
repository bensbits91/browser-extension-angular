interface FormSummary {
  action: string;
  method: string;
  id: string;
  className: string;
}

export class FormHelper {
  static detectForms(): HTMLFormElement[] {
    return Array.from(document.querySelectorAll('form'));
  }

  static getFormSummaries(): FormSummary[] {
    return this.detectForms().map((form) => ({
      action: form.action,
      method: form.method,
      id: form.id,
      className: form.className,
    }));
  }

  static highlightForms(color: string = '4px solid darkorange'): void {
    this.detectForms().forEach((form) => {
      form.style.outline = color;
    });
  }
}
