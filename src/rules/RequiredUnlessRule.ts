import { ValidationRule } from './ValidationRule';

export class RequiredUnlessRule implements ValidationRule {
  private defaultMessage = '';
  private customMessage?: string;
  
  setDefaultMessage(message: string) {
    this.defaultMessage = message;
  }
  
  setCustomMessage(message: string) {
    this.customMessage = message;
  }
  
  validate(value: any, params: any, field: string, inputs: Record<string, any>): string | null {
    // params should be in format: "otherField,value1,value2,..."
    if (typeof params !== 'string') {
      return 'Invalid parameters for required_unless rule';
    }

    const paramsArray = params.split(',');
    if (paramsArray.length < 2) {
      return 'Invalid parameters for required_unless rule';
    }

    const otherField = paramsArray[0];
    const exemptValues = paramsArray.slice(1);
    const otherValue = inputs[otherField];

    // Check if the other field's value is in the exempt values
    const isOtherValueMatch = exemptValues.some(val => 
      val === otherValue || val === String(otherValue)
    );

    // If other field does NOT match any of the values, this field is required
    if (!isOtherValueMatch) {
      // Check if this field is empty
      const isEmpty = value === undefined || value === null || value === '';
      
      if (isEmpty) {
        // Replace placeholders in the message
        const msg = this.customMessage || this.defaultMessage;
        return msg
          .replace('{field}', field)
          .replace('{other}', otherField)
          .replace('{value}', exemptValues.join(', '));
      }
    }

    return null;
  }
}