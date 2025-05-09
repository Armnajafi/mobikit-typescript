import { ValidationRule } from './ValidationRule';

export class JsonRule implements ValidationRule {
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
    
    // Try to parse the string as JSON
    try {
      JSON.parse(stringValue);
      return null; // Valid JSON
    } catch (e) {
      const msg = this.customMessage || this.defaultMessage;
      return msg.replace('{field}', field);
    }
  }
}