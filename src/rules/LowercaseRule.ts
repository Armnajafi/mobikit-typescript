import { ValidationRule } from './ValidationRule';

export class LowercaseRule implements ValidationRule {
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
    
    // Check if the string is lowercase
    // A string is lowercase if it's equal to its lowercase version
    // and not equal to its uppercase version (to ensure it has at least one character)
    if (stringValue !== stringValue.toLowerCase() || stringValue === stringValue.toUpperCase()) {
      const msg = this.customMessage || this.defaultMessage;
      return msg.replace('{field}', field);
    }
    
    return null;
  }
}