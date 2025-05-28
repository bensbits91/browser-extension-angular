export interface InputSummary {
  tag: string;
  type?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  id: string;
  className: string;
  required?: boolean;
  disabled?: boolean;
}

/**
 * Helper class for detecting, serializing, and highlighting input elements in the DOM.
 */
export class InputHelper {
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
  static detectInputs(timeout: number = 100): Promise<Element[]> {
    return new Promise((resolve) => {
      const detected = new WeakSet<Element>();
      const elements: Element[] = [];

      const shouldAddElement = (node: Element) => {
        if (node.matches('input')) {
          const type = (node.getAttribute('type') || '').toLowerCase();
          if (InputHelper.INPUTS_TO_IGNORE.has(type)) return;
        }
        if (node.matches(InputHelper.INPUT_SELECTOR) && !detected.has(node)) {
          detected.add(node);
          elements.push(node);
        }
      };

      // Initial scan
      document
        .querySelectorAll(InputHelper.INPUT_SELECTOR)
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
                ? Array.from(node.querySelectorAll(InputHelper.INPUT_SELECTOR))
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
   * Serializes input and textarea elements to a summary object.
   * @param elements - Array of input or textarea elements to serialize.
   * @returns Array of InputSummary objects.
   */
  static serializeInputs(elements: Element[]): InputSummary[] {
    return elements.map((el) => {
      const tag = el.tagName.toLowerCase();
      const input = el as HTMLInputElement | HTMLTextAreaElement;
      return {
        tag,
        type: tag === 'input' ? input.type : undefined,
        id: input.id,
        className: input.className,
        name: input.name || undefined,
        placeholder: 'placeholder' in input ? input.placeholder : undefined,
        value: 'value' in input ? input.value : undefined,
        required: 'required' in input ? !!(input as any).required : undefined,
        disabled: 'disabled' in input ? !!(input as any).disabled : undefined,
      };
    });
  }

  /**
   * Detects and serializes all input elements in the DOM.
   * @returns Promise resolving to an array of inputSummary objects.
   */
  static async getInputSummaries(): Promise<InputSummary[]> {
    const inputs = await this.detectInputs();
    return this.serializeInputs(inputs);
  }

  /**
   * Highlights all detected input elements with a colored outline.
   * @param style - The CSS outline style to apply (default: '4px solid darkorange').
   * @returns Promise that resolves when highlighting is complete.
   */
  static async highlightInputs(
    style: string = '4px solid darkorange'
  ): Promise<void> {
    const inputs = await this.detectInputs();
    inputs.forEach((input) => {
      (input as HTMLElement).style.outline = style;
    });
  }
}
