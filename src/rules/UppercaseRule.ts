import { ValidationRule } from './ValidationRule';

export class UppercaseRule implements ValidationRule {
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
    
    // Check if the string is uppercase
    // A string is uppercase if it's equal to its uppercase version
    // and not equal to its lowercase version (to ensure it has at least one character)
    if (stringValue !== stringValue.toUpperCase() || stringValue === stringValue.toLowerCase()) {
      const msg = this.customMessage || this.defaultMessage;
      return msg.replace('{field}', field);
    }
    
    return null;
  }
}