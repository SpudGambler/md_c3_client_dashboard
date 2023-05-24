import * as Yup from "yup";
export const initialValues = () => {
  return {
    email: "",
    new_password: "",
  };
};

export function validationSchema() {
  return Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    new_password: Yup.string().required("Password is required"),
  });
}
