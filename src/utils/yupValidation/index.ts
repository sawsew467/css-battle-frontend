import * as Yup from "yup";

export const Validationschema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required!!!")
    .min(8, "Your password must be at least 8 characters!!!")
    .matches(/^[a-zA-Z0-9]*$/, "Your username should not have special characters!!!"),
  password: Yup.string()
    .required("Password is required!!!")
    .min(8, "Your password must be at least 8 characters!!!"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password")],
    "Passwords must match!!!"
  ),
});