import React from "react"
import Employee from "../../components/Employee"
import useFetch from "../../utils/useFetch"
import {MenuItem, TextField, Toolbar, IconButton, AppBar, Button} from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from "./styles"
import { useAuth } from "../../services/Auth.js";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import UndoRoundedIcon from '@material-ui/icons/UndoRounded';
import { useHistory } from "react-router-dom";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Pagination from "../../components/pagination"
import { ToastContainer } from 'react-toastify';
import Order from "./../../components/Order";
import { toast } from 'react-toastify';
import api from "../../services/Api";

const OrdersCrudPage = () =>
{
  const history = useHistory();
  const classes = useStyles();
  const auth = useAuth();
  const { data: orders , refetch: refetchOrders} = useFetch("/orders");
  // const [currentPage, setCurrentPage] = React.useState(1);
  // const [postsPerPage] = React.useState(12);
  // const indexOfLastEmployees = currentPage * postsPerPage;
  // const indexOfFirstEmployees = indexOfLastEmployees - postsPerPage;
  // const currentEmployees = orders && orders.slice(indexOfFirstEmployees, indexOfLastEmployees);
  // const paginate = pageNumber => setCurrentPage(pageNumber);
 
  // const [field, setField] = React.useState("id");
  // const [value, setValue] = React.useState("");
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
 

//   const handleAccept = async() => {
     
//       const employee = {
//         "firstName":firstName,
//         "lastName":  lastName,
//         "email": email,
//         "password" : password,
//         "phoneNumber":  phoneNumber,
//         "salary" :  salary,
//         "position":  position,
//         "roles" : new Array(role)
//       } 
  
//       if(firstName && lastName &&email && password && passwordRe && phoneNumber && salary && position && role)
//       { try {
//             const token = localStorage.getItem("token");
//             await api.post(`/api/auth/register`, employee, {
//                 headers: { Authorization: `Bearer ${token}` }});
//                 toast.success("Dodano nowego pracownika!");
//                 setFirstName("");
//                 setLastName("");
//                 setEmail("");
//                 setPassword("");
//                 setPhoneNumber("");
//                 setRole("");
//                 setPasswordRe("");
//                 setSalary("");
               
        
//         } catch (ex) {
//             toast.error("Przepraszamy, coś nie pykło!");
//         }
//       }
//       setSubmitting(false);
     
//   };

  // const handleCancel= () =>{
  //   setIsDialogOpen(false);
  // }
    
  // const fields = [
  //   {
  //     value: "id",
  //     label: "Id",
  //   },
  //   {
  //     value: "CustomerName",
  //     label: "Klient",
  //   },
  //   {
  //     value: "price",
  //     label: "Cena",
  //   },
  //   {
  //     value: "Status",
  //     label: "Stanowisko",
  //   }
  // ];

  const logout = async () => {
    await auth.logout();
  };

  // const handleChange = (setter) => (event) => {
  //   setter(event.target.value);
  //   };

  // const handleChangeFiled = (event) => {
  //   setField(event.target.value);
  // };


  const undo = () => {
    history.push("/main");
  };

  const openAddDialog = () =>{
    setIsDialogOpen(true);
  }

  // const ordersArray = orders ? orders : [null];

  // const flatProps = {
  //   options: orders.map((option) => option[field]),
  // };
  
 
  

  if (!Boolean(orders)) {
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

          <Button className={classes.add} onClick={openAddDialog}>Dodaj zamówienie</Button>
        </Toolbar>
      </AppBar>
      <div  className={classes.rooot}>
        {/* <div  className={classes.search}>
          <TextField
              className={classes.textField}
              id="filled-field-serach"
              select
              label="Wybierz pole po którym chcesz wyszukać"
              value={field}
              onChange={handleChangeFiled}
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
        </div> */}
          <div className={classes.main}>
          {/* { field && value ? orders.filter(order => order[field] === value).map(({id, customer, totalPrice, items, tasks, status}) => (
                <Order key={id} {...{id, customer, totalPrice, items, tasks, status }} />
            )): */}
            {orders.map(({id, customer, totalPrice, items, map, tasks, status}) => (
                <Order key={id} {...{id, customer, totalPrice, map, items, tasks, status, refetchOrders }} />
            ))}
          
          </div>
        </div>
        <ToastContainer />
        {/* {( !value) && <Pagination employeesPerPage={postsPerPage} total ={orders && orders.length} paginate={paginate}></Pagination>} */}

    </div>
  );
    
}

export default OrdersCrudPage;