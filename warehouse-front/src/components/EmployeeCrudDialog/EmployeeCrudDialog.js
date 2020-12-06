import React from "react";
import { Dialog, DialogTitle, DialogActions, Button } from "@material-ui/core";

const EmployeeCrudDialog = ({ open, handleCancel, handleAccept, submitting }) => (
  <Dialog open={open} onClose={handleCancel}>
    <DialogTitle>Are you sure that you want to perform this action?</DialogTitle>
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

export default EmployeeCrudDialog;
