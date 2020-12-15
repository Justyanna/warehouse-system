import React from "react";
import {Button, Card, CardHeader, CardContent, CardActions} from "@material-ui/core";
import useStyles from "./styles";
import EmployeeCrudDialog from "./../EmployeeCrudDialog";
import api from "./../../services/Api";
import { toast } from 'react-toastify';
import UpdateOrderDialog from "./../updateOrderDialog";

const Order =  ({id, customer, totalPrice, items, map, tasks, status, refetchOrders }) =>{

    const [submitting, setSubmitting] = React.useState(false);
    const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = React.useState(false);
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = React.useState(false);
    const[newAddress, setNewAddres] =  React.useState("");
    const[newEmail, setNewEmail] =  React.useState("");
    const[phone, setPhone] =  React.useState("");
    const[price, setPrice] =  React.useState("");
    const[newstatus, setNewStatus] =  React.useState("");
    const[newname, setName] =  React.useState("");
   
  
      const handleDelete = async () => {
        setSubmitting(true);
        try {
          const token = localStorage.getItem("token");
          await api.delete(`orders/${id}`, {
            headers: { Authorization: `Bearer ${token}` }});
            toast.success("Zamówienie usunięte!");
          refetchOrders();
          setSubmitting(false);
        } catch (ex) {
          toast.error("Przepraszamy, coś nie pykło!");
        }
      };

    const handleChange = (setter) => (event) => {
      setter(event.target.value);
        };

      const handleCancelUpdate = () =>{
        setIsUpdateDialogOpen(false);
      }
          
    
    const handleAccept = async () => {
      setSubmitting(true);
      const newCustomer = {
        "id" : customer.id,
        "customerName": newname ? newname: customer.customerName,
        "address": newAddress ? newAddress : customer.address,
        "email": newEmail ? newEmail : customer.email,
        "phoneNumber": phone? phone : customer.phoneNumber 
      };

        const order ={
          "id" : id,
          "customer": newCustomer,
          "totalPrice": price? price: totalPrice,
          "items":items,
          "map":map,
          "tasks":tasks,
          "status" : newstatus ? newstatus : status
        }
        try {
          const token = localStorage.getItem("token");
          await api.put(`customer/${customer.id}`, newCustomer, {
            headers: { Authorization: `Bearer ${token}` }});
  
          await api.put(`orders/${id}`, order, {
            headers: { Authorization: `Bearer ${token}` }});
            toast.success("Zamówienie zmodyfikowane!");
          refetchOrders();
          setSubmitting(false);
        } catch (ex) {
          toast.error("Przepraszamy, coś nie pykło!");
        }
      };

    const classes = useStyles();
    return(
        <div>
        <Card className={classes.rooot}>
        <CardHeader
          title={id}
          subheader={<div>{customer.customerName}<br></br>
          {customer.address}<br></br>
          {customer.email}<br></br>
          {customer.phoneNumber}
          </div>}
        />
        <CardContent>
          <div>
        {/* {items.map(({id, name, price, description, producer}) => {<div>{name}<br></br></div>})}  */}
            Kwota do zapłaty: {totalPrice}$<br></br>
            Staus: {status} <br></br>
          </div>
        </CardContent>
        <CardActions disableSpacing>
          <div className={classes.buttonBox}>
          <Button className={classes.buttonUpdate}  variant="contained" onClick={() => setIsUpdateDialogOpen(true)}>Popraw</Button>
          <Button className={classes.buttonDelete} color="secondary"  onClick={() => setIsConfirmationDialogOpen(true)} variant="contained">Usuń</Button>
        </div>
        </CardActions>
      
      </Card>
      <EmployeeCrudDialog 
      submitting={submitting}
      open={isConfirmationDialogOpen}
      handleAccept={handleDelete}
      handleCancel={() => setIsConfirmationDialogOpen(false)}
      />

      <UpdateOrderDialog  {...{customer, totalPrice, status, newAddress, setNewAddres, newEmail, setNewEmail,
    phone, setPhone, newname, setName, price, setPrice, newstatus, setNewStatus, submitting, handleChange, handleAccept, handleCancelUpdate, isUpdateDialogOpen}}
      ></UpdateOrderDialog>
      </div>
    );
}

export default Order;