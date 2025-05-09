# Mobkit TypeScript

A lightweight, flexible validation library for TypeScript applications with customizable rules and multilingual support.

## Installation

```bash
npm install mobkit-typescript
```

## Basic Usage

```typescript
import { Validator } from 'mobkit-typescript';

// Create a validator instance (default locale is 'en')
const validator = new Validator();

// Define your inputs
const inputs = {
  username: 'johndoe',
  email: 'john@example.com',
  password: 'secret123',
  confirmPassword: 'secret123',
  age: 25
};

// Define validation rules
const rules = {
  username: {
    required: { value: true, message: 'Username is required' },
    minLen: { value: 3, message: 'Username must be at least 3 characters' }
  },
  email: {
    required: { value: true, message: 'Email is required' },
    email: { value: true, message: 'Please enter a valid email address' }
  },
  password: {
    required: { value: true, message: 'Password is required' },
    minLen: { value: 8, message: 'Password must be at least 8 characters' }
  },
  confirmPassword: {
    required: { value: true, message: 'Please confirm your password' },
    same: { value: 'password', message: 'Passwords do not match' }
  },
  age: {
    required: { value: true, message: 'Age is required' },
    numeric: { value: true, message: 'Age must be a number' },
    min: { value: 18, message: 'You must be at least 18 years old' }
  }
};

// Validate inputs
async function validateForm() {
  const result = await validator.validate(inputs, rules);
  
  if (result === true) {
    console.log('Validation passed!');
  } else {
    console.log('Validation failed:', result);
    // result will contain error messages for each field that failed validation
  }
}

validateForm();
```

## Available Validation Rules

- `required`: Checks if the field is not empty
- `min`: Validates minimum numeric value
- `max`: Validates maximum numeric value
- `minLen`: Validates minimum string length
- `maxLen`: Validates maximum string length
- `email`: Validates email format
- `regex`: Validates against a regular expression
- `same`: Checks if the field matches another field
- `numeric`: Checks if the field is a number

## Multilingual Support

Rakit TypeScript supports multiple languages for error messages:

```typescript
// Create a validator with a specific locale
const validator = new Validator('fr');

// Or change the locale after creation
validator.setLocale('es');
```

## Custom Error Messages

You can provide custom error messages for each rule:

```typescript
const rules = {
  username: {
    required: { 
      value: true, 
      message: 'Please enter your username' // Custom message
    }
  }
};
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
