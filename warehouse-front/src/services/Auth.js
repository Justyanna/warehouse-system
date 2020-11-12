import React from "react";
import { useHistory } from "react-router-dom";
import api from "./Api";

const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const history = useHistory();
  const [authorized, setAuthorized] = React.useState(false);

  const initialize = async () => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await api.post("/api/auth/verify", { token });
      data.valid && setAuthorized(true);
    } catch (ex) {}
  };

  const login = async (email, password) => {
    const body = {
      email,
      password,
    };

    console.log(body);
    try {
      const {
        data: { user, token },
      } = await api.post("/api/auth/login", body);

      if (user && token) {
        localStorage.setItem("token", token);
        setAuthorized(true);
        history.push("/");
        console.log("Log in");
      } else {
      }
    } catch (ex) {
      console.log(ex);
      console.log("Bad username or password");
    }
  };

  const logout = () => {
    setAuthorized(false);
    localStorage.removeItem("token");
    history.push("/");
  };

  return (
    <AuthContext.Provider
      value={{ initialize, login, logout, authorized }}
      {...props}
    />
  );
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
