import * as Yup from "yup";
export const initialValues = () => {
  return {
    firstname: "",
    lastname: "",
    email: "",
    new_password: "",
    confirmPassword: "",
    privacyPolicy: false,
  };
};

export function validationSchema() {
  return Yup.object({
    firstname: Yup.string().required("Firstname is required"),
    lastname: Yup.string().required("Lastname is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    new_password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .required("Password is required")
      .oneOf([Yup.ref("new_password")], "Passwords are diferent"),
    privacyPolicy: Yup.bool().isTrue(true),
  });
}
