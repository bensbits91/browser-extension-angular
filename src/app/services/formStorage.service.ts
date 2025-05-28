/**
 * Represents a detected form object.
 * Extend this interface to specify known properties of a detected form.
 */
interface DetectedForm {
  [key: string]: any;
}

/**
 * Service for storing and retrieving the most recently detected forms.
 */
export class FormStorageService {
  private lastDetectedForms: DetectedForm[] = [];

  /**
   * Stores the provided array of detected forms.
   * @param forms - Array of detected form objects to store.
   */
  setForms(forms: DetectedForm[]) {
    this.lastDetectedForms = forms;
  }

  /**
   * Retrieves the most recently stored array of detected forms.
   * @returns Array of detected form objects.
   */
  getForms() {
    return this.lastDetectedForms;
  }
}
