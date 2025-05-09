import { ValidationRule } from './ValidationRule';

export class RequiredIfRule implements ValidationRule {
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
      return 'Invalid parameters for required_if rule';
    }

    const paramsArray = params.split(',');
    if (paramsArray.length < 2) {
      return 'Invalid parameters for required_if rule';
    }

    const otherField = paramsArray[0];
    const allowedValues = paramsArray.slice(1);
    const otherValue = inputs[otherField];

    // Check if the other field's value is in the allowed values
    const isOtherValueMatch = allowedValues.some(val => 
      val === otherValue || val === String(otherValue)
    );

    // If other field matches one of the values, this field is required
    if (isOtherValueMatch) {
      // Check if this field is empty
      const isEmpty = value === undefined || value === null || value === '';
      
      if (isEmpty) {
        // Replace placeholders in the message
        const msg = this.customMessage || this.defaultMessage;
        return msg
          .replace('{field}', field)
          .replace('{other}', otherField)
          .replace('{value}', allowedValues.join(', '));
      }
    }

    return null;
  }
}