import { ValidationRule } from './ValidationRule';

export class NotInRule implements ValidationRule {
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
    let disallowedValues: string[] = [];
    let strictMode = false;
    
    if (typeof params === 'string') {
      // Format: "value1,value2,value3" or "value1,value2,value3,strict"
      const paramsArray = params.split(',');
      
      // Check if the last parameter is "strict"
      if (paramsArray.length > 0 && paramsArray[paramsArray.length - 1].trim().toLowerCase() === 'strict') {
        strictMode = true;
        disallowedValues = paramsArray.slice(0, -1);
      } else {
        disallowedValues = paramsArray;
      }
    } else if (Array.isArray(params)) {
      // Format: ["value1", "value2", "value3"] or ["value1", "value2", "value3", "strict"]
      if (params.length > 0 && params[params.length - 1] === 'strict') {
        strictMode = true;
        disallowedValues = params.slice(0, -1).map(String);
      } else {
        disallowedValues = params.map(String);
      }
    } else {
      return 'Invalid parameters for not_in rule';
    }
    
    // Check if the value is NOT in the disallowed values list
    const isInvalid = strictMode
      ? disallowedValues.some(disallowedValue => disallowedValue === String(value) && typeof disallowedValue === typeof value)
      : disallowedValues.some(disallowedValue => String(disallowedValue) === String(value));
    
    if (isInvalid) {
      const msg = this.customMessage || this.defaultMessage;
      return msg
        .replace('{field}', field)
        .replace('{values}', disallowedValues.join(', '));
    }
    
    return null;
  }
}