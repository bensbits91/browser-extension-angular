/**
 * Represents a detected input object.
 * Extend this interface to specify known properties of a detected input.
 */
interface DetectedInput {
  [key: string]: any;
}

/**
 * Service for storing and retrieving the most recently detected inputs.
 */
export class InputStorageService {
  private lastDetectedInputs: DetectedInput[] = [];

  /**
   * Stores the provided array of detected inputs.
   * @param inputs - Array of detected input objects to store.
   */
  setInputs(inputs: DetectedInput[]) {
    this.lastDetectedInputs = inputs;
  }

  /**
   * Retrieves the most recently stored array of detected inputs.
   * @returns Array of detected input objects.
   */
  getInputs() {
    return this.lastDetectedInputs;
  }
}
