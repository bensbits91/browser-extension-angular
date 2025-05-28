export class FormHelper {
  static detectForms(): HTMLFormElement[] {
    return Array.from(document.querySelectorAll('form'));
  }

  static getFormSummaries(): any[] {
    return this.detectForms().map((form) => ({
      action: form.action,
      method: form.method,
      id: form.id,
      className: form.className,
    }));
  }

  static highlightForms(): void {
    this.detectForms().forEach((form) => {
      (form as HTMLElement).style.outline = '4px solid darkorange';
    });
  }
}
