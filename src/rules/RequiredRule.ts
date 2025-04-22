import { ValidationRule } from './ValidationRule';

export class RequiredRule implements ValidationRule {
    private defaultMessage = '';
    private customMessage?: string;
  
    setDefaultMessage(message: string) {
      this.defaultMessage = message;
    }
  
    setCustomMessage(message: string) {
      this.customMessage = message;
    }
  
    validate(value: any, ruleValue: any, field: string): string | null {
      const isEmpty = value === undefined || value === null || value === '';
      if (ruleValue && isEmpty) {
        const msg = this.customMessage || this.defaultMessage;
        return msg.replace('{field}', field);
      }
      return null;
    }
  }
  