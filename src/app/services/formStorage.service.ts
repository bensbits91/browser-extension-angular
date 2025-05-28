interface DetectedForm {
  // Define properties of a detected form here if known, otherwise use 'any'
  [key: string]: any;
}

export class FormStorageService {
  private lastDetectedForms: DetectedForm[] = [];
  setForms(forms: DetectedForm[]) {
    this.lastDetectedForms = forms;
  }
  getForms() {
    return this.lastDetectedForms;
  }
}
