import React, { useState } from "react";
import { Tab } from "semantic-ui-react";
//import { image } from "../../../assets";
import { RegisterForm } from "../../../components/Admin/Auth";
import "./Auth.scss";

export const Auth = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  //const openLogin = () => setActiveIndex(0);
  const panels = [
    {
      menuItem: "Ingresar",
      render: () => {
        return (
          <Tab.Pane>
            <h2>Login Form</h2>
          </Tab.Pane>
        );
      },
    },
    {
      menuItem: "Registrarse",
      render: () => {
        return (
          <Tab.Pane>
            <RegisterForm></RegisterForm>
          </Tab.Pane>
        );
      },
    },
  ];
  return (
    <div className='auth'>
      <img
        src={
          new URL(
            "https://pbs.twimg.com/profile_images/662762208837939202/NgRLC9sz_400x400.jpg"
          )
        }
        alt=''
        className='logo'
      />
      <Tab
        panes={panels}
        className='auth__form'
        activeIndex={activeIndex}
        onTabChange={(_, data) => setActiveIndex(data.activeIndex)}
      />
    </div>
  );
};
