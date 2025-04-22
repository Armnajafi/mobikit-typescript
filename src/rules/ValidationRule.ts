export interface ValidationRule {
    setDefaultMessage(message: string): void;
    setCustomMessage(message: string): void;
    validate(value: any, ruleValue: any, field: string , inputs: any): string | null;
  }
  