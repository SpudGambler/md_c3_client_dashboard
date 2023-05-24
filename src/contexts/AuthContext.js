import { useState, useEffect, createContext } from "react";
import { User } from "../api";

const userController = new User();
export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const { children } = props;
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {}, []);

  const login = async (accessToken) => {
    try {
      const response = await userController.getMe(accessToken);
      delete response.new_password;
      setUser(response);
      setToken(accessToken);
    } catch (error) {
      console.error(error);
    }
  };
  const data = {
    accessToken: token,
    user,
    login,
  };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
