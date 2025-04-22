import { ValidationRule } from './ValidationRule';

export class RegexRule implements ValidationRule {
  private defaultMessage: string = '';
  private customMessage?: string;

  setDefaultMessage(message: string) {
    this.defaultMessage = message;
  }

  setCustomMessage(message: string) {
    this.customMessage = message;
  }

  validate(value: any, ruleValue: RegExp, field: string): string | null {

    if (typeof value !== 'string') {
        return null;
    }

    if (!ruleValue.test(value)) {
      console.log(typeof value)
      const msg = this.customMessage || this.defaultMessage;
      return msg.replace('{field}', field); 
    }

    return null;
  }
}
