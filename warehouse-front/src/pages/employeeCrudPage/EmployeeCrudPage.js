import React from "react"
import Employee from "./../../components/Employee"
import useFetch from "./../../utils/useFetch"
import {MenuItem, TextField, Toolbar, IconButton, AppBar} from "@material-ui/core";
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
  const [field, setFiled] = React.useState("lastName");

  const fields = [
    {
      value: "firstName",
      label: "Imię",
    },
    {
      value: "lastName",
      label: "Nazwisko",
    },
    {
      value: "email",
      label: "Email",
    },
    {
      value: "position",
      label: "Stanowisko",
    },
    {
      value: "phoneNumber",
      label: "Numer telefonu",
    },
  ];

  const logout = async () => {
    await auth.logout();
  };

  const handleChange = (event) => {
    setFiled(event.target.value);
  };

  const undo = () => {
    history.push("/adminPanel");
  };

  const employeesArray = employees ? employees : [
    { lastName: "Doe"},]

  const flatProps = {
    options: employeesArray.map((option) => option[field]),
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
      <div  className={classes.root}>
        <div  className={classes.search}>
          <TextField
              className={classes.textField}
              id="filled-field-serach"
              select
              label="Wybierz pole po którym chcesz wyszukać"
              value={field}
              onChange={handleChange}
              variant="outlined"
            >
              {fields.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
              </TextField>
            <Autocomplete
            className={classes.textField}
            {...flatProps}
            onChange={(event, newInputValue) => {
              setValue(newInputValue);
            }}
            value={value}
            getOptionSelected={(option, value) => option.name === value.name}
            renderInput={(params) => (
              <TextField 
                key={params.id}
                {...params}
                label="Znajdź pracownika"
                variant="outlined"
              />
            )}
          />
        </div>
          <div className={classes.main}>
          { field && value ? employees.filter(employee => employee[field] === value).map(({_id: id, firstName, lastName, email, phoneNumber, salary, position}) => (
                <Employee key={email} {...{ id, firstName, lastName, email, phoneNumber, salary, position }} />
            )):
            employees.map(({_id: id, firstName, lastName, email, phoneNumber, salary, position}) => (
                <Employee key={email} {...{ id, firstName, lastName, email, phoneNumber, salary, position }} />
            ))
          }
          </div>
        </div>
    </div>
  );
    
}

export default EmployeeCrudPage;