export interface FormSummary {
  action: string;
  method: string;
  id: string;
  className: string;
}

export class FormHelper {
  static INPUT_SELECTOR = 'input, textarea';
  static INPUTS_TO_IGNORE = new Set(['submit', 'button', 'reset', 'image']);

  /**
   * Detects all input and textarea elements in the DOM, excluding button-like inputs.
   * Also observes for new elements added during the timeout window.
   */
  static detectForms(timeout: number = 100): Promise<Element[]> {
    return new Promise((resolve) => {
      const detected = new WeakSet<Element>();
      const elements: Element[] = [];

      const shouldAddElement = (node: Element) => {
        if (node.matches('input')) {
          const type = (node.getAttribute('type') || '').toLowerCase();
          if (FormHelper.INPUTS_TO_IGNORE.has(type)) return;
        }
        if (node.matches(FormHelper.INPUT_SELECTOR) && !detected.has(node)) {
          detected.add(node);
          elements.push(node);
        }
      };

      // Initial scan
      document.querySelectorAll(FormHelper.INPUT_SELECTOR).forEach(shouldAddElement);

      // Observe for new inputs and textareas added to the DOM
      const observer = new MutationObserver((mutations) => {
        mutations.forEach(({ addedNodes }) => {
          addedNodes.forEach((node: any) => {
            if (!(node instanceof Element)) return;
            // Check the node itself and all its descendants
            [node, ...(node.querySelectorAll ? Array.from(node.querySelectorAll(FormHelper.INPUT_SELECTOR)) : [])]
              .forEach((el: Element) => shouldAddElement(el));
          });
        });
      });

      observer.observe(document.body, { childList: true, subtree: true });

      setTimeout(() => {
        observer.disconnect();
        resolve(elements);
      }, timeout);
    });
  }

  /**
   * Serializes form elements to a summary object.
   */
  static serializeForms(forms: Element[]) {
    return forms.map((form) => {
      const f = form as HTMLFormElement;
      return {
        action: f.action,
        method: f.method,
        id: f.id,
        className: f.className,
      };
    });
  }

  /**
   * Detects and serializes all form elements in the DOM.
   */
  static async getFormSummaries(): Promise<FormSummary[]> {
    const forms = await this.detectForms();
    return this.serializeForms(forms);
  }

  /**
   * Highlights all detected form elements with a colored outline.
   */
  static async highlightForms(
    color: string = '4px solid darkorange'
  ): Promise<void> {
    const forms = await this.detectForms();
    forms.forEach((form) => {
      (form as HTMLElement).style.outline = color;
    });
  }
}