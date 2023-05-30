import React, { useEffect, useState } from "react";
import { Auth } from "../../../api";
import Table from "react-bootstrap/Table";
import "./Users.scss";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const authController = new Auth();

export const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([{}]);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async function () {
    const token = authController.getAccessToken();
    await fetch("http://localhost:3200/api/v1/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then(async (response) => {
      const data = await response.json();
      setUsers(data);
    });
  };

  const deleteUser = async function (id) {
    const token = authController.getAccessToken();
    await fetch(`http://localhost:3200/api/v1/users/` + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then(async (response) => {
      if (response.ok) {
        getUsers();
      }
    });
  };
  return (
    <div>
      <h2>Gestión de Usuarios</h2>
      <div>
        <Button onClick={() => navigate("/admin/users/create")}>
          Crear nuevo usuario
        </Button>
      </div>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              const active = user.active;
              return (
                <tr key={user._id}>
                  <td>{index}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  {active === true ? <td>Active</td> : <td>Deactivated</td>}
                  <td>
                    <Button onClick={() => deleteUser(user._id)}>Delete</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
