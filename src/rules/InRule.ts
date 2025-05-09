import { ValidationRule } from './ValidationRule';

export class InRule implements ValidationRule {
  private defaultMessage = '';
  private customMessage?: string;
  
  setDefaultMessage(message: string) {
    this.defaultMessage = message;
  }
  
  setCustomMessage(message: string) {
    this.customMessage = message;
  }
  
  validate(value: any, params: any, field: string, inputs: Record<string, any>): string | null {
    // Skip validation if value is empty
    if (value === undefined || value === null || value === '') {
      return null;
    }
    
    // Parse parameters
    let allowedValues: string[] = [];
    let strictMode = false;
    
    if (typeof params === 'string') {
      // Format: "value1,value2,value3" or "value1,value2,value3,strict"
      const paramsArray = params.split(',');
      
      // Check if the last parameter is "strict"
      if (paramsArray.length > 0 && paramsArray[paramsArray.length - 1].trim().toLowerCase() === 'strict') {
        strictMode = true;
        allowedValues = paramsArray.slice(0, -1);
      } else {
        allowedValues = paramsArray;
      }
    } else if (Array.isArray(params)) {
      // Format: ["value1", "value2", "value3"] or ["value1", "value2", "value3", "strict"]
      if (params.length > 0 && params[params.length - 1] === 'strict') {
        strictMode = true;
        allowedValues = params.slice(0, -1).map(String);
      } else {
        allowedValues = params.map(String);
      }
    } else {
      return 'Invalid parameters for in rule';
    }
    
    // Check if the value is in the allowed values list
    const isValid = strictMode
      ? allowedValues.some(allowedValue => allowedValue === String(value) && typeof allowedValue === typeof value)
      : allowedValues.some(allowedValue => String(allowedValue) === String(value));
    
    if (!isValid) {
      const msg = this.customMessage || this.defaultMessage;
      return msg
        .replace('{field}', field)
        .replace('{values}', allowedValues.join(', '));
    }
    
    return null;
  }
}