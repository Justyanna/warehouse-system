import React from 'react';
import { Dialog, DialogTitle, DialogActions, Button, TextField } from "@material-ui/core";



const UpdateEmployeeDialog = (
    {id, firstName, lastName, email, password, phoneNumber, salary, position,
        newFistName, newLastName, newEmail, newPassword, newPasswordRepeat,newPhone, newSalary, newPosition, 
        setNewFirstName, setNewLastName, setNewPassword,setPasswordRepeat, setNewEmail, setNewPhone, setSalary, setPosition,
        open, handleCancel, handleAccept, handleChange, submitting }) => (

    
  
        <Dialog open={open} onClose={handleCancel}>
            <DialogTitle> Uaktualnij dane pracownika</DialogTitle>
            <TextField id="filled-basic-fn" 
            label={firstName} 
            variant="filled"
            value={newFistName}
            onChange={handleChange(setNewFirstName)} />

            <TextField id="filled-basic-ln" 
            label={lastName}
            variant="filled" 
            value={newLastName}
            onChange={handleChange(setNewLastName)}/>

            <TextField id="filled-basic-e" 
            label={email} 
            variant="filled" 
            value={newEmail}
            helperText={
                newEmail.indexOf("@") === -1
                  ? 'Brakuje "@" '
                  : "" || newEmail.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
                  ? ""
                  : "Niepoprawny mail"
              }
            onChange={handleChange(setNewEmail)}/>

            <TextField id="filled-basic-pass" 
            label="Hasło"
            type="password"
            variant="filled" 
            value={newPassword}
            onChange={handleChange(setNewPassword)}/>

            <TextField id="filled-basic-repeat" 
            label="Powtórz hasło"
            type="password"
            variant="filled" 
            helperText={newPassword !== newPasswordRepeat ? "Hasła musza być identyczne" : ""}
            value={newPasswordRepeat}
            onChange={handleChange(setPasswordRepeat)}/>

            <TextField id="filled-basic-pn" 
            label={phoneNumber}
            variant="filled" 
            value={newPhone}
            helperText={newPhone.length !== 9 ? "Niepoprawny numer telefonu" : ""}
            onChange={handleChange(setNewPhone)} />

            <TextField id="filled-basic-s" 
            label={salary}
            variant="filled"
            value={newSalary}
            onChange={handleChange(setSalary)} />

            <TextField id="filled-basic-p" 
            label={position} 
            variant="filled" 
            value={newPosition}
            onChange={handleChange(setPosition)}/>

            <DialogActions>
                <Button onClick={handleCancel} color="secondary">
                Cancel
                </Button>
                <Button onClick={handleAccept} color="primary" autoFocus disabled={submitting}>
                Confirm
                </Button>
            </DialogActions>
        </Dialog>
   
);

export default UpdateEmployeeDialog;