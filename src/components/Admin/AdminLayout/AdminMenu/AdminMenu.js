import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import "./AdminMenu.scss";
import { useNavigate } from "react-router-dom";

export const AdminMenu = () => {
  const navigate = useNavigate();

  return (
    <Menu fluid vertical icon text className='admin-menu'>
      <Menu.Item>
        <Icon name='user outline'>
          <span onClick={() => navigate("/admin/users")}>Usuarios</span>
        </Icon>
      </Menu.Item>
    </Menu>
  );
};
