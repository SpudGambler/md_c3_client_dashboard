import React from "react";
import "./AdminLayout.scss";
import { image } from "../../assets";
import { useAuth } from "../../hooks";
import { AdminMenu } from "../../components/Admin/AdminLayout";
import { useNavigate } from "react-router-dom";

export const AdminLayout = (props) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/admin");
  };
  const { children } = props;
  return (
    <div className='admin-layout'>
      <div className='admin-layout__left'>
        <img src={image.logo} alt='' className='logo' />
        <AdminMenu />
      </div>
      <div className='admin-layout__right'>
        <div className='admin-layout__right-header'>
          <span onClick={handleLogout} className='logout'>
            Logout
          </span>
        </div>
        <div className='admin-layout__right-content'>{children}</div>
      </div>
    </div>
  );
};
