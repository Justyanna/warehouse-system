import React from "react";
import { Box, TextField, Button } from "@material-ui/core";
import useStyles from "./styles";
import { useAuth } from "../../services/Auth.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";

const LoginPage = () => {
  const classes = useStyles();
  const auth = useAuth();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const handlerReset = () => {
    setEmail("");
    setPassword("");
  };

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleSubmit = async () => {
    await auth.login(email, password);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  return (
    <Box className={classes.body}>
      <ToastContainer></ToastContainer>
      <Box className={classes.loginBox}>
        <Box className={classes.fieldBox}>
          <TextField
            className={classes.textField}
            fullWidth
            variant="outlined"
            id="email"
            label="Email"
            value={email}
            onChange={handleChange(setEmail)}
          />
        </Box>

        <Box className={classes.fieldBox}>
          <TextField
            className={classes.textField}
            fullWidth
            variant="outlined"
            id="password"
            label="Password"
            type={values.showPassword ? "text" : "password"}
            value={password}
            onChange={handleChange(setPassword)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box className={classes.buttonBox}>
          <Button className={classes.button} onClick={handlerReset}>
            Reset
          </Button>
          <Button className={classes.button} onClick={handleSubmit}>
            Sign in
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
