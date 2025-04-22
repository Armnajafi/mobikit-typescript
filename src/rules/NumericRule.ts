import { ValidationRule } from './ValidationRule';

export class NumericRule implements ValidationRule {
  private defaultMessage: string = '';
  private customMessage?: string;

  setDefaultMessage(message: string) {
    this.defaultMessage = message;
  }

  setCustomMessage(message: string) {
    this.customMessage = message;
  }

  validate(value: any, ruleValue: boolean, field: string): string | null {
    if (ruleValue && isNaN(value)) {
      const msg = this.customMessage || this.defaultMessage;
      return msg.replace('{field}', field);
    }
    return null;
  }
}
