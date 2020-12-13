import React from "react";
import { Grid, Button, Toolbar, IconButton, AppBar } from "@material-ui/core";
import useStyles from "./styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {useAuth} from "../../services/Auth.js";
import { useHistory } from "react-router-dom";
import { ToastContainer} from 'react-toastify';

const AdminPanel = () => {
  const history = useHistory();
  const classes = useStyles();
  const auth = useAuth();
   
    const logout = async () => {
      await auth.logout();
    };

    const callEmployeeCrudPane = () => {
      history.push("/employees");
    }
  
    return(
        <div className={classes.content}>
          <ToastContainer></ToastContainer>
        <AppBar position="static" className={classes.bar}>
          <Toolbar>
            <IconButton
              edge="end"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={logout}
            >
              <ExitToAppIcon fontSize="large" />
            </IconButton>
          </Toolbar>
        </AppBar>

        <div className={classes.box}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Button className={classes.paper} onClick={callEmployeeCrudPane}>ZARZĄDZAJ PRACOWNIKAMI</Button>
            </Grid>
            <Grid item xs={6}>
              <Button className={classes.paper}>ZARZĄDZAJ KLIENTAMI</Button>
            </Grid>
            <Grid item xs={6}>
              <Button className={classes.paper}>ZARZĄDZAJ ZAMÓWIENIAMI</Button>
            </Grid>
            <Grid item xs={6}>
              <Button className={classes.paper}>ZARZĄDZAJ ASORTYMENTEM</Button>
            </Grid>
            <Grid item xs={6}>
              <Button className={classes.paper}>USTAL GRAFIKI</Button>
            </Grid>
            <Grid item xs={6}>
              <Button className={classes.paper}>DODAJ KLIENTA</Button>
            </Grid>
          </Grid>
        </div>
      </div>
    );
}

export default AdminPanel;