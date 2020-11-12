import React from "react";
import {
  FormGroup,
  FormLabel,
  FormControl,
  Typography,
  Button,
} from "@material-ui/core";
import "./style.css";
import { useAuth } from "../../services/Auth";

const LoginPage = () => {
  const auth = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleSubmit = () => {
    auth.login(email, password);
  };

  const handleReset = () => {
    setEmail("");
    setPassword("");
  };

  const formIsValid = email.length > 2 && password.length > 4;

  return (
    <div className="content">
      <div className="paper">
        <FormControl fullWidth component="fieldset">
          <FormLabel component="legend">
            <Typography
              color="textPrimary"
              align="center"
              variant="h4"
              component="h1"
              paragraph
            >
              Login using your company email and password
            </Typography>
          </FormLabel>
          <FormGroup>
            <input
              label="Username"
              margin="normal"
              value={email}
              onChange={handleChange(setEmail)}
            />
            <input
              label="Password"
              type="password"
              margin="normal"
              value={password}
              onChange={handleChange(setPassword)}
            />
          </FormGroup>
        </FormControl>
        <div>
          <Button onClick={handleReset} variant="contained">
            Reset
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!formIsValid}
            variant="contained"
          >
            Log in
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
