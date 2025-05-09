# Mobkit TypeScript

![npm version](https://img.shields.io/npm/v/mobkit-typescript.svg)
![License](https://img.shields.io/npm/l/mobkit-typescript.svg)
![Downloads](https://img.shields.io/npm/dt/mobkit-typescript.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)

A lightweight, flexible validation library for TypeScript applications with customizable rules and multilingual support.

## 📦 Installation

```bash
npm install mobkit-typescript
```

## 🚀 Basic Usage

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

## 📋 Available Validation Rules

### Basic Rules

| Rule | Description | Example |
|------|-------------|---------|
| `required` | Checks if the field is not empty | `required: { value: true }` |
| `nullable` | Field may be empty | `nullable: { value: true }` |
| `min` | Validates minimum numeric value | `min: { value: 18 }` |
| `max` | Validates maximum numeric value | `max: { value: 100 }` |
| `minLen` | Validates minimum string length | `minLen: { value: 8 }` |
| `maxLen` | Validates maximum string length | `maxLen: { value: 255 }` |
| `email` | Validates email format | `email: { value: true }` |
| `regex` | Validates against a regular expression | `regex: { value: /^[A-Z]+$/ }` |
| `same` | Checks if the field matches another field | `same: { value: 'password' }` |
| `numeric` | Checks if the field is a number | `numeric: { value: true }` |

### Conditional Rules

| Rule | Description | Example |
|------|-------------|---------|
| `required_if` | Required when another field equals any value | `required_if: { value: 'payment_type,credit,paypal' }` |
| `required_unless` | Required unless another field equals any value | `required_unless: { value: 'payment_type,cash' }` |
| `required_with` | Required when any of the other fields are present | `required_with: { value: 'shipping_name,shipping_address' }` |
| `required_with_all` | Required when all of the other fields are present | `required_with_all: { value: 'cc_name,cc_number,cc_expiry' }` |
| `required_without` | Required when any of the other fields are not present | `required_without: { value: 'phone,mobile' }` |
| `required_without_all` | Required when all of the other fields are not present | `required_without_all: { value: 'email,phone,mobile' }` |

### Format Rules

| Rule | Description | Example |
|------|-------------|---------|
| `alpha` | Field must contain only alphabetic characters | `alpha: { value: true }` |
| `uppercase` | Field must be uppercase | `uppercase: { value: true }` |
| `lowercase` | Field must be lowercase | `lowercase: { value: true }` |
| `json` | Field must be a valid JSON string | `json: { value: true }` |

### List Rules

| Rule | Description | Example |
|------|-------------|---------|
| `in` | Field must be included in the given list | `in: { value: 'admin,editor,user' }` |
| `not_in` | Field must not be included in the given list | `not_in: { value: 'admin,root' }` |

## 🌐 Multilingual Support

mobkit TypeScript supports multiple languages for error messages:

```typescript
// Create a validator with a specific locale
const validator = new Validator('fr');

// Or change the locale after creation
validator.setLocale('es');
```

## 💬 Custom Error Messages

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

## 🔍 Detailed Examples

### Basic Validation

```typescript
const inputs = {
  name: 'John Doe',
  email: 'john@example.com',
  age: 25
};

const rules = {
  name: {
    required: { value: true, message: 'Name is required' },
    minLen: { value: 3, message: 'Name must be at least 3 characters' }
  },
  email: {
    required: { value: true, message: 'Email is required' },
    email: { value: true, message: 'Please enter a valid email address' }
  },
  age: {
    required: { value: true, message: 'Age is required' },
    numeric: { value: true, message: 'Age must be a number' },
    min: { value: 18, message: 'You must be at least 18 years old' }
  }
};
```

### Conditional Validation

```typescript
const inputs = {
  payment_type: 'credit',
  credit_card: '4111111111111111',
  paypal_email: ''
};

const rules = {
  credit_card: {
    required_if: { 
      value: 'payment_type,credit', 
      message: 'Credit card number is required when payment type is credit' 
    }
  },
  paypal_email: {
    required_if: { 
      value: 'payment_type,paypal', 
      message: 'PayPal email is required when payment type is paypal' 
    }
  }
};
```

### Format Validation

```typescript
const inputs = {
  username: 'johndoe',
  country_code: 'US',
  config: '{"theme":"dark","notifications":true}'
};

const rules = {
  username: {
    required: { value: true, message: 'Username is required' },
    lowercase: { value: true, message: 'Username must be lowercase' }
  },
  country_code: {
    required: { value: true, message: 'Country code is required' },
    uppercase: { value: true, message: 'Country code must be uppercase' }
  },
  config: {
    json: { value: true, message: 'Configuration must be a valid JSON string' }
  }
};
```

### List Validation

```typescript
const inputs = {
  role: 'editor',
  status: 'active'
};

const rules = {
  role: {
    required: { value: true, message: 'Role is required' },
    in: { value: 'admin,editor,user', message: 'Invalid role selected' }
  },
  status: {
    required: { value: true, message: 'Status is required' },
    not_in: { value: 'banned,suspended', message: 'Status cannot be banned or suspended' }
  }
};
```

### Strict Type Checking with In/Not In Rules

```typescript
const inputs = {
  value: '1',  // string "1", not number 1
};

const rules = {
  value: {
    in: { 
      value: '1,2,3,strict', 
      message: 'Value must be string "1", "2", or "3" (strict type checking)' 
    }
  }
};
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
