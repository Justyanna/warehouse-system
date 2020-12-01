import React from "react";
import { Grid, Button, Toolbar, IconButton, AppBar } from "@material-ui/core";
import useStyles from "./styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useAuth } from "../../services/Auth.js";

const MainPage = () => {
  const classes = useStyles();
  const auth = useAuth();
  const isAdmin = auth.ReturnRole();
  const logout = async () => {
    await auth.logout();
  };

  return isAdmin != null ? (
    isAdmin === true ? (
      <div className={classes.content}>
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
              <Button className={classes.paper}>ZARZĄDZAJ PRACOWNIKAMI</Button>
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
    ) : (
      <div className={classes.content}>
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
              <Button className={classes.paper}>ZAMÓWIENIA</Button>
            </Grid>
            <Grid item xs={6}>
              <Button className={classes.paper}>ZADANIA</Button>
            </Grid>
            <Grid item xs={6}>
              <Button className={classes.paper}>POZYCJE</Button>
            </Grid>
            <Grid item xs={6}>
              <Button className={classes.paper}>WERYFIKACJA</Button>
            </Grid>
            <Grid item xs={6}>
              <Button className={classes.paper}>WYPŁATA</Button>
            </Grid>
            <Grid item xs={6}>
              <Button className={classes.paper}>GRAFIK</Button>
            </Grid>
          </Grid>
        </div>
      </div>
    )
  ) : (
    <div className={classes.content}>
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

      <div className={classes.box}></div>
    </div>
  );
};
export default MainPage;
