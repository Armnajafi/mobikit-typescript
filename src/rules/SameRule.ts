import { ValidationRule } from './ValidationRule';

export class SameRule implements ValidationRule {
  private defaultMessage: string = '';
  private customMessage?: string;

  setDefaultMessage(message: string) {
    this.defaultMessage = message;
  }

  setCustomMessage(message: string) {
    this.customMessage = message;
  }

  validate(value: any, ruleValue: string, field: string, inputs: any): string | null {
    if (value !== inputs[ruleValue]) {
      const msg = this.customMessage || this.defaultMessage;
      return msg.replace('{field}', field).replace('{compareField}', ruleValue);
    }
    return null;
  }
}
