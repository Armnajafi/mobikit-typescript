import { Validator } from '../index';

async function testAllValidationRules() {
  const validator = new Validator('en');

  console.log('=== Testing Required Rule ===');
  await testRequiredRule(validator);

  console.log('\n=== Testing Min Rule ===');
  await testMinRule(validator);

  console.log('\n=== Testing Max Rule ===');
  await testMaxRule(validator);

  console.log('\n=== Testing Email Rule ===');
  await testEmailRule(validator);

  console.log('\n=== Testing Regex Rule ===');
  await testRegexRule(validator);

  console.log('\n=== Testing Same Rule ===');
  await testSameRule(validator);

  console.log('\n=== Testing Numeric Rule ===');
  await testNumericRule(validator);

  console.log('\n=== Testing MaxLength Rule ===');
  await testMaxLengthRule(validator);

  console.log('\n=== Testing MinLength Rule ===');
  await testMinLengthRule(validator);

  console.log('\n=== Testing Required_If Rule ===');
  await testRequiredIfRule(validator);

  console.log('\n=== Testing Required_Unless Rule ===');
  await testRequiredUnlessRule(validator);

  console.log('\n=== Testing Required_With Rule ===');
  await testRequiredWithRule(validator);

  console.log('\n=== Testing Required_Without Rule ===');
  await testRequiredWithoutRule(validator);

  console.log('\n=== Testing Required_With_All Rule ===');
  await testRequiredWithAllRule(validator);

  console.log('\n=== Testing Required_Without_All Rule ===');
  await testRequiredWithoutAllRule(validator);

  console.log('\n=== Testing Uppercase Rule ===');
  await testUppercaseRule(validator);

  console.log('\n=== Testing Lowercase Rule ===');
  await testLowercaseRule(validator);

  console.log('\n=== Testing JSON Rule ===');
  await testJsonRule(validator);

  console.log('\n=== Testing Alpha Rule ===');
  await testAlphaRule(validator);

  console.log('\n=== Testing In Rule ===');
  await testInRule(validator);

  console.log('\n=== Testing Not_In Rule ===');
  await testNotInRule(validator);
}

async function testRequiredRule(validator: Validator) {
  // Valid case
  const validInput = { username: 'testuser' };
  const validRules = {
    username: {
      required: { value: true, message: 'Username is required.' }
    }
  };
  
  const validErrors = await validator.validate(validInput, validRules);
  console.log('Valid input:', validErrors ? 'Failed' : 'Passed');

  // Invalid case
  const invalidInput = { username: '' };
  const invalidErrors = await validator.validate(invalidInput, validRules);
  console.log('Invalid input:', invalidErrors ? 'Detected errors correctly' : 'Failed to detect errors');
  if (invalidErrors) console.log(invalidErrors);
}

async function testMinRule(validator: Validator) {
  // Valid case
  const validInput = { age: 25 };
  const validRules = {
    age: {
      min: { value: 18, message: 'Age must be at least 18.' }
    }
  };
  
  const validErrors = await validator.validate(validInput, validRules);
  console.log('Valid input:', validErrors ? 'Failed' : 'Passed');

  // Invalid case
  const invalidInput = { age: 15 };
  const invalidErrors = await validator.validate(invalidInput, validRules);
  console.log('Invalid input:', invalidErrors ? 'Detected errors correctly' : 'Failed to detect errors');
  if (invalidErrors) console.log(invalidErrors);
}

async function testMaxRule(validator: Validator) {
  // Valid case
  const validInput = { age: 25 };
  const validRules = {
    age: {
      max: { value: 65, message: 'Age must not exceed 65.' }
    }
  };
  
  const validErrors = await validator.validate(validInput, validRules);
  console.log('Valid input:', validErrors ? 'Failed' : 'Passed');

  // Invalid case
  const invalidInput = { age: 70 };
  const invalidErrors = await validator.validate(invalidInput, validRules);
  console.log('Invalid input:', invalidErrors ? 'Detected errors correctly' : 'Failed to detect errors');
  if (invalidErrors) console.log(invalidErrors);
}

async function testEmailRule(validator: Validator) {
  // Valid case
  const validInput = { email: 'test@example.com' };
  const validRules = {
    email: {
      email: { value: true, message: 'Please enter a valid email address.' }
    }
  };
  
  const validErrors = await validator.validate(validInput, validRules);
  console.log('Valid input:', validErrors ? 'Failed' : 'Passed');

  // Invalid case
  const invalidInput = { email: 'invalid-email' };
  const invalidErrors = await validator.validate(invalidInput, validRules);
  console.log('Invalid input:', invalidErrors ? 'Detected errors correctly' : 'Failed to detect errors');
  if (invalidErrors) console.log(invalidErrors);
}

async function testRegexRule(validator: Validator) {
  // Valid case
  const validInput = { username: 'test123' };
  const validRules = {
    username: {
      regex: { value: /^[a-z0-9]+$/, message: 'Username can only contain lowercase letters and numbers.' }
    }
  };
  
  const validErrors = await validator.validate(validInput, validRules);
  console.log('Valid input:', validErrors ? 'Failed' : 'Passed');

  // Invalid case
  const invalidInput = { username: 'Test@123' };
  const invalidErrors = await validator.validate(invalidInput, validRules);
  console.log('Invalid input:', invalidErrors ? 'Detected errors correctly' : 'Failed to detect errors');
  if (invalidErrors) console.log(invalidErrors);
}

async function testSameRule(validator: Validator) {
  // Valid case
  const validInput = { password: 'password123', confirmPassword: 'password123' };
  const validRules = {
    confirmPassword: {
      same: { value: 'password', message: 'Password and confirm password must match.' }
    }
  };
  
  const validErrors = await validator.validate(validInput, validRules);
  console.log('Valid input:', validErrors ? 'Failed' : 'Passed');

  // Invalid case
  const invalidInput = { password: 'password123', confirmPassword: 'different' };
  const invalidErrors = await validator.validate(invalidInput, validRules);
  console.log('Invalid input:', invalidErrors ? 'Detected errors correctly' : 'Failed to detect errors');
  if (invalidErrors) console.log(invalidErrors);
}

async function testNumericRule(validator: Validator) {
  // Valid case
  const validInput = { age: '25' };
  const validRules = {
    age: {
      numeric: { value: true, message: 'Age must be a number.' }
    }
  };
  
  const validErrors = await validator.validate(validInput, validRules);
  console.log('Valid input:', validErrors ? 'Failed' : 'Passed');

  // Invalid case
  const invalidInput = { age: 'twenty-five' };
  const invalidErrors = await validator.validate(invalidInput, validRules);
  console.log('Invalid input:', invalidErrors ? 'Detected errors correctly' : 'Failed to detect errors');
  if (invalidErrors) console.log(invalidErrors);
}

async function testMaxLengthRule(validator: Validator) {
  // Valid case
  const validInput = { username: 'test' };
  const validRules = {
    username: {
      maxLen: { value: 10, message: 'Username must not exceed 10 characters.' }
    }
  };
  
  const validErrors = await validator.validate(validInput, validRules);
  console.log('Valid input:', validErrors ? 'Failed' : 'Passed');

  // Invalid case
  const invalidInput = { username: 'thisusernameiswaytoolong' };
  const invalidErrors = await validator.validate(invalidInput, validRules);
  console.log('Invalid input:', invalidErrors ? 'Detected errors correctly' : 'Failed to detect errors');
  if (invalidErrors) console.log(invalidErrors);
}

async function testMinLengthRule(validator: Validator) {
  // Valid case
  const validInput = { username: 'testuser' };
  const validRules = {
    username: {
      minLen: { value: 5, message: 'Username must have at least 5 characters.' }
    }
  };
  
  const validErrors = await validator.validate(validInput, validRules);
  console.log('Valid input:', validErrors ? 'Failed' : 'Passed');

  // Invalid case
  const invalidInput = { username: 'test' };
  const invalidErrors = await validator.validate(invalidInput, validRules);
  console.log('Invalid input:', invalidErrors ? 'Detected errors correctly' : 'Failed to detect errors');
  if (invalidErrors) console.log(invalidErrors);
}

async function testRequiredIfRule(validator: Validator) {
  // Valid case - condition met and field provided
  const validInput1 = { username: 'test', password: 'password123' };
  const rules = {
    password: {
      required_if: { value: 'username,test', message: 'Password is required if username is test.' }
    }
  };
  
  const validErrors1 = await validator.validate(validInput1, rules);
  console.log('Valid input (condition met, field provided):', validErrors1 ? 'Failed' : 'Passed');

  // Valid case - condition not met
  const validInput2 = { username: 'other' };
  const validErrors2 = await validator.validate(validInput2, rules);
  console.log('Valid input (condition not met):', validErrors2 ? 'Failed' : 'Passed');

  // Invalid case - condition met but field not provided
  const invalidInput = { username: 'test' };
  const invalidErrors = await validator.validate(invalidInput, rules);
  console.log('Invalid input:', invalidErrors ? 'Detected errors correctly' : 'Failed to detect errors');
  if (invalidErrors) console.log(invalidErrors);
}

async function testRequiredUnlessRule(validator: Validator) {
  // Valid case - condition met (field not required)
  const validInput1 = { plan: 'free' };
  const rules = {
    creditCard: {
      required_unless: { value: 'plan,free', message: 'Credit card is required unless plan is free.' }
    }
  };
  
  const validErrors1 = await validator.validate(validInput1, rules);
  console.log('Valid input (condition met):', validErrors1 ? 'Failed' : 'Passed');

  // Valid case - condition not met but field provided
  const validInput2 = { plan: 'premium', creditCard: '4111111111111111' };
  const validErrors2 = await validator.validate(validInput2, rules);
  console.log('Valid input (condition not met, field provided):', validErrors2 ? 'Failed' : 'Passed');

  // Invalid case - condition not met and field not provided
  const invalidInput = { plan: 'premium' };
  const invalidErrors = await validator.validate(invalidInput, rules);
  console.log('Invalid input:', invalidErrors ? 'Detected errors correctly' : 'Failed to detect errors');
  if (invalidErrors) console.log(invalidErrors);
}

async function testRequiredWithRule(validator: Validator) {
  // Valid case - other field not present
  const validInput1 = { username: 'testuser' };
  const rules = {
    password: {
      required_with: { value: 'email', message: 'Password is required when email is present.' }
    }
  };
  
  const validErrors1 = await validator.validate(validInput1, rules);
  console.log('Valid input (other field not present):', validErrors1 ? 'Failed' : 'Passed');

  // Valid case - other field present and this field provided
  const validInput2 = { username: 'testuser', email: 'test@example.com', password: 'password123' };
  const validErrors2 = await validator.validate(validInput2, rules);
  console.log('Valid input (other field present, this field provided):', validErrors2 ? 'Failed' : 'Passed');

  // Invalid case - other field present but this field not provided
  const invalidInput = { username: 'testuser', email: 'test@example.com' };
  const invalidErrors = await validator.validate(invalidInput, rules);
  console.log('Invalid input:', invalidErrors ? 'Detected errors correctly' : 'Failed to detect errors');
  if (invalidErrors) console.log(invalidErrors);
}

async function testRequiredWithoutRule(validator: Validator) {
  // Valid case - other field present
  const validInput1 = { username: 'testuser', email: 'test@example.com' };
  const rules = {
    phone: {
      required_without: { value: 'email', message: 'Phone is required when email is not present.' }
    }
  };
  
  const validErrors1 = await validator.validate(validInput1, rules);
  console.log('Valid input (other field present):', validErrors1 ? 'Failed' : 'Passed');

  // Valid case - other field not present but this field provided
  const validInput2 = { username: 'testuser', phone: '1234567890' };
  const validErrors2 = await validator.validate(validInput2, rules);
  console.log('Valid input (other field not present, this field provided):', validErrors2 ? 'Failed' : 'Passed');

  // Invalid case - other field not present and this field not provided
  const invalidInput = { username: 'testuser' };
  const invalidErrors = await validator.validate(invalidInput, rules);
  console.log('Invalid input:', invalidErrors ? 'Detected errors correctly' : 'Failed to detect errors');
  if (invalidErrors) console.log(invalidErrors);
}

async function testRequiredWithAllRule(validator: Validator) {
  // Valid case - not all other fields present
  const validInput1 = { username: 'testuser', email: 'test@example.com' };
  const rules = {
    password: {
      required_with_all: { value: 'email,phone', message: 'Password is required when both email and phone are present.' }
    }
  };
  
  const validErrors1 = await validator.validate(validInput1, rules);
  console.log('Valid input (not all other fields present):', validErrors1 ? 'Failed' : 'Passed');

  // Valid case - all other fields present and this field provided
  const validInput2 = { username: 'testuser', email: 'test@example.com', phone: '1234567890', password: 'password123' };
  const validErrors2 = await validator.validate(validInput2, rules);
  console.log('Valid input (all other fields present, this field provided):', validErrors2 ? 'Failed' : 'Passed');

  // Invalid case - all other fields present but this field not provided
  const invalidInput = { username: 'testuser', email: 'test@example.com', phone: '1234567890' };
  const invalidErrors = await validator.validate(invalidInput, rules);
  console.log('Invalid input:', invalidErrors ? 'Detected errors correctly' : 'Failed to detect errors');
  if (invalidErrors) console.log(invalidErrors);
}

async function testRequiredWithoutAllRule(validator: Validator) {
  // Valid case - some other fields present
  const validInput1 = { username: 'testuser', email: 'test@example.com' };
  const rules = {
    phone: {
      required_without_all: { value: 'email,address', message: 'Phone is required when both email and address are not present.' }
    }
  };
  
  const validErrors1 = await validator.validate(validInput1, rules);
  console.log('Valid input (some other fields present):', validErrors1 ? 'Failed' : 'Passed');

  // Valid case - no other fields present but this field provided
  const validInput2 = { username: 'testuser', phone: '1234567890' };
  const validErrors2 = await validator.validate(validInput2, rules);
  console.log('Valid input (no other fields present, this field provided):', validErrors2 ? 'Failed' : 'Passed');

  // Invalid case - no other fields present and this field not provided
  const invalidInput = { username: 'testuser' };
  const invalidErrors = await validator.validate(invalidInput, rules);
  console.log('Invalid input:', invalidErrors ? 'Detected errors correctly' : 'Failed to detect errors');
  if (invalidErrors) console.log(invalidErrors);
}

async function testUppercaseRule(validator: Validator) {
  // Valid case
  const validInput = { code: 'ABC123' };
  const validRules = {
    code: {
      uppercase: { value: true, message: 'Code must be uppercase.' }
    }
  };
  
  const validErrors = await validator.validate(validInput, validRules);
  console.log('Valid input:', validErrors ? 'Failed' : 'Passed');

  // Invalid case
  const invalidInput = { code: 'abc123' };
  const invalidErrors = await validator.validate(invalidInput, validRules);
  console.log('Invalid input:', invalidErrors ? 'Detected errors correctly' : 'Failed to detect errors');
  if (invalidErrors) console.log(invalidErrors);
}

async function testLowercaseRule(validator: Validator) {
  // Valid case
  const validInput = { username: 'testuser' };
  const validRules = {
    username: {
      lowercase: { value: true, message: 'Username must be lowercase.' }
    }
  };
  
  const validErrors = await validator.validate(validInput, validRules);
  console.log('Valid input:', validErrors ? 'Failed' : 'Passed');

  // Invalid case
  const invalidInput = { username: 'TestUser' };
  const invalidErrors = await validator.validate(invalidInput, validRules);
  console.log('Invalid input:', invalidErrors ? 'Detected errors correctly' : 'Failed to detect errors');
  if (invalidErrors) console.log(invalidErrors);
}

async function testJsonRule(validator: Validator) {
  // Valid case
  const validInput = { data: '{"name":"John","age":30}' };
  const validRules = {
    data: {
      json: { value: true, message: 'Data must be a valid JSON string.' }
    }
  };
  
  const validErrors = await validator.validate(validInput, validRules);
  console.log('Valid input:', validErrors ? 'Failed' : 'Passed');

  // Invalid case
  const invalidInput = { data: '{name:John,age:30}' };
  const invalidErrors = await validator.validate(invalidInput, validRules);
  console.log('Invalid input:', invalidErrors ? 'Detected errors correctly' : 'Failed to detect errors');
  if (invalidErrors) console.log(invalidErrors);
}

async function testAlphaRule(validator: Validator) {
  // Valid case
  const validInput = { name: 'John' };
  const validRules = {
    name: {
      alpha: { value: true, message: 'Name must contain only alphabetic characters.' }
    }
  };
  
  const validErrors = await validator.validate(validInput, validRules);
  console.log('Valid input:', validErrors ? 'Failed' : 'Passed');

  // Invalid case
  const invalidInput = { name: 'John123' };
  const invalidErrors = await validator.validate(invalidInput, validRules);
  console.log('Invalid input:', invalidErrors ? 'Detected errors correctly' : 'Failed to detect errors');
  if (invalidErrors) console.log(invalidErrors);
}

async function testInRule(validator: Validator) {
  // Valid case
  const validInput = { role: 'admin' };
  const validRules = {
    role: {
      in: { value: ['admin', 'user', 'guest'], message: 'Role must be one of: admin, user, guest.' }
    }
  };
  
  const validErrors = await validator.validate(validInput, validRules);
  console.log('Valid input:', validErrors ? 'Failed' : 'Passed');

  // Invalid case
  const invalidInput = { role: 'superuser' };
  const invalidErrors = await validator.validate(invalidInput, validRules);
  console.log('Invalid input:', invalidErrors ? 'Detected errors correctly' : 'Failed to detect errors');
  if (invalidErrors) console.log(invalidErrors);
}

async function testNotInRule(validator: Validator) {
  // Valid case
  const validInput = { username: 'testuser' };
  const validRules = {
    username: {
      not_in: { value: ['admin', 'root', 'superuser'], message: 'Username cannot be a reserved name.' }
    }
  };
  
  const validErrors = await validator.validate(validInput, validRules);
  console.log('Valid input:', validErrors ? 'Failed' : 'Passed');

  // Invalid case
  const invalidInput = { username: 'admin' };
  const invalidErrors = await validator.validate(invalidInput, validRules);
  console.log('Invalid input:', invalidErrors ? 'Detected errors correctly' : 'Failed to detect errors');
  if (invalidErrors) console.log(invalidErrors);
}

// اجرای تمام تست‌ها
testAllValidationRules();
