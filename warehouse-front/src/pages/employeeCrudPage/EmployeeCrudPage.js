import React from "react"
import Employee from "./../../components/Employee"
import useFetch from "./../../utils/useFetch"
import {TextField, Toolbar, IconButton, AppBar} from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from "./styles"
import { useAuth } from "../../services/Auth.js";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import UndoRoundedIcon from '@material-ui/icons/UndoRounded';
import { useHistory } from "react-router-dom";
import Autocomplete from "@material-ui/lab/Autocomplete";

const EmployeeCrudPage = () =>
{
  const history = useHistory();
  const classes = useStyles();
  const auth = useAuth();

    const { data: employees } = useFetch("/employee");
      const [value, setValue] = React.useState("");
    const logout = async () => {
      await auth.logout();
    };

    const undo = () => {
      history.push("/adminPanel");
    };

    const employeesArray = [
      { lastName: "Doe"},
      { lastName: "Doe"},
      { lastName: "Doe"},
      { lastName: "Doe"},
      { lastName: "Doe"},
      { lastName: "Doe"},]

    const flatProps = {
      options: employeesArray.map((option) => option.lastName),
    };
  

    if (!Boolean(employees)) {
      return  <CircularProgress />;
    }

    return(
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
            <IconButton
              edge="end"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={undo}
            >
              
             <UndoRoundedIcon/>
            </IconButton>
          </Toolbar>
        </AppBar>
      <div  className={classes.search}>
        <Autocomplete
        {...flatProps}
        onChange={(event, newInputValue) => {
          setValue(newInputValue);
        }}
        className={classes.textField}
        value={value}
        renderInput={(params) => (
          <TextField 
            {...params}
            fullWidth
            label="Znajdź pracownika"
            variant="outlined"
          />
        )}
      />
      </div>
        <div  className={classes.root}>
          <div className={classes.main}>
          { 
            employees.map(({_id: id, firstName, lastName, email, phoneNumber, salary, position}) => (
            
                <Employee {...{ id, firstName, lastName, email, phoneNumber, salary, position }} />
            ))
          }
          </div>
        </div>
       
      </div>
    );
    
}

export default EmployeeCrudPage;