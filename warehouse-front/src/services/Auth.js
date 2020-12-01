import React from "react";
import { useHistory } from "react-router-dom";
import api from "./Api";

const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const history = useHistory();
  const [authorized, setAuthorized] = React.useState(false);

  const initialize = async () => {
    try {
      const token = localStorage.getItem("token");
      await api.post("/api/auth/verify", token).then((response) => {
        if (response.status === 200) {
          setAuthorized(true);
          history.push("/main");
        }
      });
    } catch (ex) {
      setAuthorized(false);
      localStorage.removeItem("token");
      history.push("/login");
    }
  };

  const login = async (email, password) => {
    localStorage.removeItem("token");
    const body = {
      email,
      password,
    };

    try {
      const {
        data: { user, token },
      } = await api.post("/api/auth/login", body);

      if (user && token) {
        localStorage.setItem("token", token);
        setAuthorized(true);
        history.push("/main");
      } else {
      }
    } catch (ex) {}
  };

  const ReturnRole = () => {
    const [result, setResult] = React.useState(null);
    React.useEffect(() => {
      (async function () {
        setResult(await checkIfAdmin());
      })();
    });
    return result;
  };

  const checkIfAdmin = async () => {
    var isAdmin = false;
    try {
      const token = localStorage.getItem("token");
      await api
        .post("/api/auth/isAdmin", token, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.status === 200) {
            isAdmin = true;
          }
        });
    } catch (ex) {}
    return isAdmin;
  };

  const logout = () => {
    setAuthorized(false);
    localStorage.removeItem("token");
    history.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        initialize,
        login,
        logout,
        checkIfAdmin,
        ReturnRole,
        authorized,
      }}
      {...props}
    />
  );
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
