import { Validator } from '../index';

async function validateInputs() {
  const validator = new Validator('en');

  // ورودی‌ها
  const inputs = {
    username: 'test',
    password: 'password123',
    confirmPassword: 'password123',
    age: '25',
  };

  const rules = {
    username: {
      minLength: { value: 5, message: 'Username must have at least 5 characters.' },
    },
    password: {
      required_if: { value: 'username,test', message: 'Password is required if username is provided.' },
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
  if(errors){
    console.log("errors")
    console.log(errors);
  } else {
    console.log("no errors")
  }
}

// اجرای تست
validateInputs();
