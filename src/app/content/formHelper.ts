export interface FormSummary {
  action: string;
  method: string;
  id: string;
  className: string;
}

/**
 * Helper class for detecting, serializing, and highlighting form-related elements in the DOM.
 */
export class FormHelper {
  /** CSS selector for input and textarea elements. */
  static INPUT_SELECTOR = 'input, textarea';

  /** Set of input types to ignore (button-like inputs). */
  static INPUTS_TO_IGNORE = new Set(['submit', 'button', 'reset', 'image']);

  /**
   * Detects all input and textarea elements in the DOM, excluding button-like inputs.
   * Also observes for new elements added during the timeout window.
   * @param timeout - The number of milliseconds to observe for new elements before resolving.
   * @returns Promise resolving to an array of detected input and textarea elements.
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
      document
        .querySelectorAll(FormHelper.INPUT_SELECTOR)
        .forEach(shouldAddElement);

      // Observe for new inputs and textareas added to the DOM
      const observer = new MutationObserver((mutations) => {
        mutations.forEach(({ addedNodes }) => {
          addedNodes.forEach((node: any) => {
            if (!(node instanceof Element)) return;
            // Check the node itself and all its descendants
            [
              node,
              ...(node.querySelectorAll
                ? Array.from(node.querySelectorAll(FormHelper.INPUT_SELECTOR))
                : []),
            ].forEach((el: Element) => shouldAddElement(el));
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
   * @param forms - Array of input or textarea elements to serialize.
   * @returns Array of FormSummary objects.
   */
  static serializeForms(forms: Element[]): FormSummary[] {
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
   * @returns Promise resolving to an array of FormSummary objects.
   */
  static async getFormSummaries(): Promise<FormSummary[]> {
    const forms = await this.detectForms();
    return this.serializeForms(forms);
  }

  /**
   * Highlights all detected form elements with a colored outline.
   * @param style - The CSS outline style to apply (default: '4px solid darkorange').
   * @returns Promise that resolves when highlighting is complete.
   */
  static async highlightForms(
    style: string = '4px solid darkorange'
  ): Promise<void> {
    const forms = await this.detectForms();
    forms.forEach((form) => {
      (form as HTMLElement).style.outline = style;
    });
  }
}
