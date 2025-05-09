import { ValidationRule } from './ValidationRule';

export class RequiredWithRule implements ValidationRule {
  private defaultMessage = '';
  private customMessage?: string;
  
  setDefaultMessage(message: string) {
    this.defaultMessage = message;
  }
  
  setCustomMessage(message: string) {
    this.customMessage = message;
  }
  
  validate(value: any, params: any, field: string, inputs: Record<string, any>): string | null {
    // params should be in format: "field1,field2,field3,..."
    if (typeof params !== 'string') {
      return 'Invalid parameters for required_with rule';
    }

    const otherFields = params.split(',');
    if (otherFields.length < 1) {
      return 'Invalid parameters for required_with rule';
    }

    // Check if any of the other fields are present (not undefined, null, or empty string)
    const isAnyOtherFieldPresent = otherFields.some(otherField => {
      const otherValue = inputs[otherField];
      return !(otherValue === undefined || otherValue === null || otherValue === '');
    });

    // If any other field is present, this field is required
    if (isAnyOtherFieldPresent) {
      // Check if this field is empty
      const isEmpty = value === undefined || value === null || value === '';
      
      if (isEmpty) {
        // Replace placeholders in the message
        const msg = this.customMessage || this.defaultMessage;
        return msg
          .replace('{field}', field)
          .replace('{other}', otherFields.join(', '));
      }
    }

    return null;
  }
}