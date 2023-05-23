import React, { useState } from "react";
import "./RegisterForm.scss";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./RegisterForm.form";

export const RegisterForm = () => {
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    onSubmit: async (formValue) => {
      try {
        setError("");
        console.log(formValue);
      } catch (error) {
        setError("Error en el servidor");
      }
    },
  });
  const [error, setError] = useState("");
  return (
    <Form className='register-form' onSubmit={formik.handleSubmit}>
      <Form.Group widths={"equal"}>
        <Form.Input
          fluid
          name='firstname'
          label='First Name'
          placeholder='First Name'
          autoComplete='firstname'
          onChange={formik.handleChange}
          value={formik.values.firstname}
          error={formik.errors.firstname}
        />
        <Form.Input
          fluid
          name='lastname'
          label='Last Name'
          placeholder='Last Name'
          autoComplete='lastname'
          onChange={formik.handleChange}
          value={formik.values.lastname}
          error={formik.errors.lastname}
        />
      </Form.Group>
      <Form.Input
        name='email'
        placeholder='User Email'
        autoComplete='email'
        onChange={formik.handleChange}
        value={formik.values.email}
        error={formik.errors.email}
      />
      <Form.Input
        name='new_password'
        type='password'
        autoComplete='new_password'
        placeholder='Password'
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.errors.password}
      />
      <Form.Input
        name='confirmPassword'
        type='password'
        autoComplete='confirmPassword'
        placeholder='Repeat Password'
        onChange={formik.handleChange}
        value={formik.values.confirmPassword}
        error={formik.errors.confirmPassword}
      />
      <Form.Checkbox
        name='privacyPolicy'
        label='I have read and accept privacy policy'
        onChange={(_, data) =>
          formik.setFieldValue("privacyPolicy", data.checked)
        }
        checked={formik.values.privacyPolicy}
        error={formik.errors.privacyPolicy}
      />
      <Form.Button
        type='submit'
        primary
        fluid
        content='Registrarse'
        loading={formik.isSubmitting}
      />
      {error && <p className='register-form_error'>{error}</p>}
    </Form>
  );
};
