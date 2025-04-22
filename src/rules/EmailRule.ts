import { ValidationRule } from './ValidationRule';

export class EmailRule implements ValidationRule {
  private defaultMessage: string = '';
  private customMessage?: string;

  setDefaultMessage(message: string) {
    this.defaultMessage = message;
  }

  setCustomMessage(message: string) {
    this.customMessage = message;
  }

  validate(value: any, ruleValue: any, field: string): string | null {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (typeof value === 'string' && !emailPattern.test(value)) {
      const msg = this.customMessage || this.defaultMessage;
      return msg.replace('{field}', field);
    }
    return null;
  }
}
