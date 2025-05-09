import { ValidationRule } from './ValidationRule';

export class AlphaRule implements ValidationRule {
  private defaultMessage = '';
  private customMessage?: string;
  
  setDefaultMessage(message: string) {
    this.defaultMessage = message;
  }
  
  setCustomMessage(message: string) {
    this.customMessage = message;
  }
  
  validate(value: any, ruleValue: any, field: string, inputs: Record<string, any>): string | null {
    // Skip validation if value is empty
    if (value === undefined || value === null || value === '') {
      return null;
    }
    
    // Convert value to string if it's not already
    const stringValue = String(value);
    
    // Check if the string contains only alphabetic characters
    // Using a regular expression to match only letters (a-z, A-Z)
    const alphaRegex = /^[a-zA-Z]+$/;
    
    if (!alphaRegex.test(stringValue)) {
      const msg = this.customMessage || this.defaultMessage;
      return msg.replace('{field}', field);
    }
    
    return null;
  }
}