import * as yup from 'yup';

// Initializing validation schema for signup form
const signupSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required().min(4),
  cpassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
  // cpassword: yup.string().required().min(4)
});

export default signupSchema;
