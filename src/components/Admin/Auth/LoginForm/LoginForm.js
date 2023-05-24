import React, { useState } from "react";
import "./LoginForm.scss";
import { Auth } from "../../../../api";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./LoginForm.form";
import { useAuth } from "../../../../hooks";

const authController = new Auth();

export const LoginForm = () => {
  const { login } = useAuth();
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    validateOnBlur: false,

    onSubmit: async (formValue) => {
      try {
        setError("");
        const response = await authController.login(formValue);
        login(response.access);
        console.log(response);
      } catch (error) {
        setError("Error en el servidor");
      }
    },
  });
  return (
    <Form className='login-form' onSubmit={formik.handleSubmit}>
      <Form.Input
        name='email'
        placeholder='Correo Electronico'
        autoComplete='email'
        onChange={formik.handleChange}
        value={formik.values.email}
        error={formik.errors.email}
      />
      <Form.Input
        name='new_password'
        type='password'
        autoComplete='new_password'
        placeholder='Contraseña'
        onChange={formik.handleChange}
        value={formik.values.new_password}
        error={formik.errors.new_password}
      />
      <Form.Button
        type='submit'
        primary
        fluid
        content='Iniciar sesion'
        loading={formik.isSubmitting}
      />
      {error && <p className='login-form__error'>{error}</p>}
    </Form>
  );
};
