interface FormSummary {
  action: string;
  method: string;
  id: string;
  className: string;
}

export class FormHelper {
  static detectForms(timeout: number = 100): Promise<Element[]> {
    return new Promise((resolve) => {
      const detected = new WeakSet<Element>();
      const forms: Element[] = [];

      function scanNode(root: ParentNode) {
        root.childNodes.forEach((node: any) => {
          if (!(node instanceof Element)) return;

          // If it's a form, add and don't traverse inside
          if (node.matches('form')) {
            if (!detected.has(node)) {
              detected.add(node);
              forms.push(node);
            }
            return;
          }

          // If it's an input or textarea NOT inside a form, add it
          if (
            (node.matches('input') || node.matches('textarea')) &&
            !node.closest('form')
          ) {
            if (!detected.has(node)) {
              detected.add(node);
              forms.push(node);
            }
          }

          // Continue traversing children (unless it's a form)
          scanNode(node);
        });
      }

      // Initial scan
      scanNode(document);

      const observer = new MutationObserver((mutations) => {
        mutations.forEach(({ addedNodes }) => {
          addedNodes.forEach((node: any) => {
            if (!(node instanceof Element)) return;

            if (node.matches('form')) {
              if (!detected.has(node)) {
                detected.add(node);
                forms.push(node);
              }
              return;
            }

            if (
              (node.matches('input') || node.matches('textarea')) &&
              !node.closest('form')
            ) {
              if (!detected.has(node)) {
                detected.add(node);
                forms.push(node);
              }
            }
            scanNode(node);
          });
        });
      });

      observer.observe(document.body, { childList: true, subtree: true });

      setTimeout(() => {
        observer.disconnect();
        resolve(forms);
      }, timeout);
    });
  }

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

  static async getFormSummaries(): Promise<FormSummary[]> {
    const forms = await this.detectForms();
    return this.serializeForms(forms);
  }

  static async highlightForms(
    color: string = '4px solid darkorange'
  ): Promise<void> {
    const forms = await this.detectForms();
    forms.forEach((form) => {
      (form as HTMLElement).style.outline = color;
    });
  }
}
