export class Validator {
    /*
        parseRule - This function parses a rule string into an object with keys and values.
        @param ruleStr - The rule string to parse.
        @returns An object with keys and values parsed from the rule string.
    */
    private parseRule(ruleStr: string): Record<string, any> {
        const ruleParts = ruleStr.split("|");
        const result: Record<string, any> = {};
      
        for (const part of ruleParts) {
          if (part.includes(":")) {
            const [key, value] = part.split(":");
            result[key] = isNaN(Number(value)) ? value : Number(value);
          } else {
            result[part] = true;
          }
        }
      
        return result;
    }

    validate (inputs: object , rules: object): void {
        console.table(inputs);

        for (const [key, value] of Object.entries(rules)) {
            console.table(this.parseRule(value));
            console.log(`Key: ${key}, Value: ${value}`);
        }
    }

}