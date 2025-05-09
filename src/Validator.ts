import type { ValidationRule } from './rules/ValidationRule';

import { RequiredRule } from './rules/RequiredRule';
import { MinRule } from './rules/MinRule';
import { MaxRule } from './rules/MaxRule';
import { EmailRule } from './rules/EmailRule';
import { RegexRule } from './rules/RegexRule';
import { SameRule } from './rules/SameRule';
import { NumericRule } from './rules/NumericRule';


import fs from 'fs';
import path from 'path';
import { MaxLengthRule } from './rules/MaxLengthRule';
import { MinLengthRule } from './rules/MinLengthRule';
import { RequiredIfRule } from './rules/RequiredIfRule';
import { RequiredUnlessRule } from './rules/RequiredUnlessRule';
import { RequiredWithRule } from './rules/RequiredWithRule';
import { RequiredWithoutRule } from './rules/RequiredWithoutRule';


export class Validator {
  
  private messages: Record<string, string> = {};

  private ruleHandlers: Record<string, ValidationRule> = {
    required: new RequiredRule(),
    min: new MinRule(),
    max: new MaxRule(),
    email: new EmailRule(),
    regex: new RegexRule(),
    same: new SameRule(),
    numeric: new NumericRule(),
    maxLen: new MaxLengthRule(),
    minLen: new MinLengthRule(),
    required_if: new RequiredIfRule(), 
    required_unless: new RequiredUnlessRule(),
    required_with: new RequiredWithRule(),
    required_without: new RequiredWithoutRule()
  };

  constructor(private locale: string = 'en') {}

  async loadLocale(): Promise<void> {
    const filePath = path.resolve(__dirname, `./locales/${this.locale}.json`);
    if (!fs.existsSync(filePath)) throw new Error(`Locale '${this.locale}' not found`);
    const data = await fs.promises.readFile(filePath, 'utf-8');
    this.messages = JSON.parse(data);
  }

  setLocale(locale: string) {
    this.locale = locale;
  }

  private getMessage(ruleName: string): string {
    return this.messages[ruleName] || '';
  }
  async validate(
    inputs: Record<string, any>,
    rules: Record<string, Record<string, { value: any; message: string }>>
  ): Promise<Boolean | Record<string, string[]>> {
    await this.loadLocale();

    const errors: Record<string, string[]> = {};

    for (const [field, ruleSet] of Object.entries(rules)) {
      const value = inputs[field];

      for (const [ruleName, { value: ruleValue, message }] of Object.entries(ruleSet)) {
        const handler = this.ruleHandlers[ruleName];

        if (!handler) continue;

        handler.setDefaultMessage(this.getMessage(ruleName));

        const err = handler.validate(value, ruleValue, field , inputs);
        if (err) {
          errors[field] = errors[field] || [];
          errors[field].push(message || err);
        }
      }
    }

    // Check if errors object is empty
    const hasErrors = Object.keys(errors).length > 0;

    return hasErrors ? errors : false;
  }
}
