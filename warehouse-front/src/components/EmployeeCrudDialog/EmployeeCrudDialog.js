import React from "react";
import { Dialog, DialogTitle, DialogActions, Button } from "@material-ui/core";

const EmployeeCrudDialog = ({ open, handleCancel, handleAccept, submitting }) => (
  <Dialog open={open} onClose={handleCancel}>
    <DialogTitle>Czy jesteś pewny, że chcesz usunąć pracownika?</DialogTitle>
    <DialogActions>
      <Button onClick={handleCancel} color="secondary">
       Zakończ
      </Button>
      <Button onClick={handleAccept} color="primary" autoFocus disabled={submitting}>
        Usuń
      </Button>
    </DialogActions>
  </Dialog>
);

export default EmployeeCrudDialog;
