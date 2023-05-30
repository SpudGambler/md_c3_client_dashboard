import React, { useEffect, useState } from "react";
import { Auth } from "../../../../api";
import { Form, Dropdown } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const authController = new Auth();

export const CreateUser = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState("");
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://www.datos.gov.co/resource/xdk5-pm3f.json"
        );
        const data = await response.json();
        const departamentos = Array.from(
          new Set(data.map((municipio) => municipio.departamento))
        ).map((departamento) => ({
          key: departamento,
          value: departamento,
          text: departamento,
        }));
        departamentos.sort((a, b) => a.text.localeCompare(b.text));

        setDepartamentos(departamentos);
      } catch (error) {
        console.error("Error al obtener los departamentos:", error);
      }
    };
    fetchData();
  }, []);

  const fetchMunicipios = async (departamento) => {
    try {
      const response = await fetch(
        `https://www.datos.gov.co/resource/xdk5-pm3f.json?departamento=${departamento}`
      );
      const data = await response.json();

      if (
        Array.isArray(data) &&
        data.length > 0 &&
        data[0].c_digo_dane_del_municipio
      ) {
        const municipios = data.map((municipio) => ({
          key: municipio.c_digo_dane_del_municipio,
          value: municipio.c_digo_dane_del_municipio,
          text: municipio.municipio,
        }));
        municipios.sort((a, b) => a.text.localeCompare(b.text));
        setMunicipios(municipios);
      } else {
        console.error(
          "Error: Los datos de municipios no tienen la estructura esperada"
        );
        setMunicipios([]);
      }
    } catch (error) {
      console.error("Error al obtener los municipios:", error);
      setMunicipios([]);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      new_password: "",
      confirmPassword: "",
      /* department: "",
      municipality: "", */
      privacyPolicy: false,
    },
    /* Validaciones de error */
    validationSchema: Yup.object({
      firstname: Yup.string().required("El nombre es requerido"),
      lastname: Yup.string().required("El apellido requerido"),
      email: Yup.string()
        .email("El correo no es válido")
        .required("Campo requerido"),
      new_password: Yup.string().required("Campo requerido"),
      confirmPassword: Yup.string()
        .required("Campo requerido")
        .oneOf([Yup.ref("new_password")], "Las contraseñas no coinciden."),
      /* department: Yup.string().required("Departamento requerido"),
      municipality: Yup.string().required("Municipio requerido"), */
      privacyPolicy: Yup.bool().isTrue(true),
    }),
    /* Sólo validamos cuando enviemos el formulario, no mientras se escribe */
    validateOnChange: false,
    validateOnBlur: false,

    onSubmit: async (formValue) => {
      //console.log(formValue);
      try {
        setError("");
        await authController.register(formValue);
        navigate("/admin/users");
      } catch (error) {
        setError("Error en el servidor");
      }
    },
  });
  return (
    <div>
      <h1>Registrar Usuario</h1>
      <Form className='register-form' onSubmit={formik.handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Input
            fluid
            name='firstname'
            label='Nombre(s)'
            placeholder='First name'
            autoComplete='firstname'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.firstname}
            error={formik.errors.firstname}
          />
          <Form.Input
            fluid
            name='lastname'
            label='Apellido(s)'
            placeholder='Last name'
            autoComplete='lastname'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.lastname}
            error={formik.errors.lastname}
          />
        </Form.Group>
        <Form.Input
          name='email'
          label='Correo'
          placeholder='Correo electrónico'
          autoComplete='email'
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
        />
        <Form.Input
          name='new_password'
          label='Contraseña'
          type='password'
          autoComplete='new_password'
          placeholder='Contraseña'
          onChange={formik.handleChange}
          value={formik.values.new_password}
          error={formik.errors.new_password}
        />
        <Form.Input
          name='confirmPassword'
          label='Repetir contraseña'
          type='password'
          autoComplete='confirmPassword'
          placeholder='Repetir contraseña'
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          error={formik.errors.confirmPassword}
        />
        <Form.Group widths='equal'>
          <Form.Field error={formik.errors.departament}>
            <label>Selecciona un departamento:</label>
            <Dropdown
              placeholder='Seleccionar'
              selection
              options={departamentos}
              value={formik.values.departament}
              onChange={(_, { value }) => {
                setDepartamentoSeleccionado(value);
                formik.values.departament = value;
                fetchMunicipios(value);
              }}
            />
          </Form.Field>
          <Form.Field>
            <label>Selecciona un municipio:</label>
            <Dropdown
              placeholder='Seleccionar'
              selection
              options={municipios}
              value={formik.values.municipality}
              onChange={(_, { value }) => {
                setMunicipioSeleccionado(value);
                formik.values.municipality = municipioSeleccionado;
                formik.values.municipality = value;
              }}
              disabled={!departamentoSeleccionado} // Deshabilitar el dropdown de municipios si no se ha seleccionado un departamento
            />
          </Form.Field>
        </Form.Group>

        <Form.Checkbox
          name='privacyPolicy'
          label='He leído y acepto las politicas de privacidad'
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
        {error && <p className='register-form__error'>{error}</p>}
      </Form>
    </div>
  );
};
