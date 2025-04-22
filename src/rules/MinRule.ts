import { ValidationRule } from './ValidationRule';

export class MinRule implements ValidationRule {
  private defaultMessage: string = '';
  private customMessage?: string;

  setDefaultMessage(message: string) {
    this.defaultMessage = message;
  }

  setCustomMessage(message: string) {
    this.customMessage = message;
  }

  validate(value: any, ruleValue: number, field: string): string | null {
    if (typeof value === 'number' && value < ruleValue) {
      const msg = this.customMessage || this.defaultMessage;
      return msg
        .replace('{field}', field)
        .replace('{value}', ruleValue.toString());
    }
    return null;
  }
}
