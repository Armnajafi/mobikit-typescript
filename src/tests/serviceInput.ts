import { Validator } from '../Validator';

async function validateInputs() {
  const validator = new Validator('en');

  // ورودی‌ها
  const inputs = {
    username: 'test',
    password: 'password123',
    confirmPassword: 'password12',
    age: '25',
  };

  const rules = {
    username: {
      minLength: { value: 5, message: 'Username must have at least 5 characters.' },
    },
    password: {
      minLength: { value: 8, message: 'Password must have at least 8 characters.' },
    },
    confirmPassword: {
      same: { value: 'password', message: 'Password and confirm password must match.' },
    },
    age: {
      numeric: { value: true, message: 'Age must be a number.' },
    },
  };


  const errors = await validator.validate(inputs, rules);

  console.log(errors);
}

// اجرای تست
validateInputs();
