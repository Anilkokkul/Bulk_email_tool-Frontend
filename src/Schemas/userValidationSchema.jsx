import * as Yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const registerSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("Please enter the name"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter the email"),
  mobileNumber: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Please enter mobile number"),
  password: Yup.string()
    .min(6)
    .matches(passwordRules, "Please create a strong password")
    .required("Please enter password"),
});

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter the email"),
  password: Yup.string()
    .min(6)
    .matches(passwordRules, "Enter a valid password")
    .required("Please enter password"),
});

export const ChangePasswordSchema = Yup.object({
  password: Yup.string()
    .min(6)
    .matches(passwordRules, "Please create a strong password")
    .required("Please enter password"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});
