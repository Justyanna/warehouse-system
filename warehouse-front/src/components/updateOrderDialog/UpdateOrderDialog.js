import React from 'react';
import { Dialog, DialogTitle, DialogActions, Button, TextField } from '@material-ui/core';

const UpdateOrderDialog = ({
	customer,
	totalPrice,
	status,
	newAddress,
	setNewAddress,
	newEmail,
	setNewEmail,
	phone,
	setPhone,
	newname,
	setName,
	price,
	setPrice,
	newstatus,
	setNewStatus,
	submitting,
	handleChange,
	handleAccept,
	handleCancelUpdate,
	isUpdateDialogOpen
}) => (
	<Dialog open={isUpdateDialogOpen} onClose={handleCancelUpdate}>
		<DialogTitle> Uaktualnij zamówienie</DialogTitle>

		<TextField
			id="filled-basic-e"
			label={customer.customerName}
			variant="filled"
			value={newname}
			onChange={handleChange(setName)}
		/>

		<TextField
			id="filled-basic-fn"
			label={customer.address}
			variant="filled"
			value={newAddress}
			onChange={handleChange(setNewAddress)}
		/>

		<TextField
			id="filled-basic-ln"
			label={customer.email}
			variant="filled"
			value={newEmail}
			helperText={
				newEmail.indexOf('@') === -1 ? (
					'Brakuje "@" '
				) : '' || newEmail.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/) ? (
					''
				) : (
					'Niepoprawny mail'
				)
			}
			onChange={handleChange(setNewEmail)}
		/>

		<TextField
			id="filled-basic-pn"
			label={customer.phoneNumber}
			variant="filled"
			value={phone}
			helperText={phone.length !== 9 ? 'Niepoprawny numer telefonu' : ''}
			onChange={handleChange(setPhone)}
		/>

		<TextField
			id="filled-basic-s"
			label={totalPrice}
			variant="filled"
			value={price}
			onChange={handleChange(setPrice)}
		/>

		<TextField
			id="filled-basic-p"
			label={status}
			variant="filled"
			value={newstatus}
			onChange={handleChange(setNewStatus)}
		/>

		<DialogActions>
			<Button onClick={handleCancelUpdate} color="secondary">
				Cancel
			</Button>
			{newAddress || newEmail || phone || newname || price || status ? (
				<Button onClick={handleAccept} color="primary" autoFocus disabled={submitting}>
					Confirm
				</Button>
			) : (
				<Button onClick={handleAccept} color="primary" autoFocus disabled={true}>
					Confirm
				</Button>
			)}
		</DialogActions>
	</Dialog>
);

export default UpdateOrderDialog;
