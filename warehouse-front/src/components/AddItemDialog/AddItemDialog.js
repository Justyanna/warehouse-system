import React from 'react';
import { Dialog, DialogTitle, DialogActions, Button, TextField } from '@material-ui/core';

const AddOrderDialog = ({
	newName,
	setNewName,
	newPrice,
	setNewPrice,
	newDesccription,
	setNewDescription,
	newProducer,
	setNewProducer,
	handleChange,
	handleAccept,
	handleCancelUpdate,
	isUpdateDialogOpen,
	submitting
}) => (
	<Dialog open={isUpdateDialogOpen} onClose={handleCancelUpdate}>
		<DialogTitle> Dodaj nowy przedmiot</DialogTitle>

		<TextField
			id="filled-basic-e"
			label={'Nazwa'}
			variant="filled"
			value={newName}
			onChange={handleChange(setNewName)}
		/>

		<TextField
			id="filled-basic-fn"
			label={'Cena'}
			variant="filled"
			value={newPrice}
			onChange={handleChange(setNewPrice)}
		/>

		<TextField
			id="standard-multiline-static"
			variant="filled"
			label={'Opis'}
			multiline
			rows={4}
			value={newDesccription}
			onChange={handleChange(setNewDescription)}
		/>

		<TextField
			id="filled-basic-pn"
			label={'Producent'}
			variant="filled"
			value={newProducer}
			onChange={handleChange(setNewProducer)}
		/>

		<DialogActions>
			<Button onClick={handleCancelUpdate} color="secondary">
				Cancel
			</Button>
			{newName && newPrice && newDesccription && newProducer ? (
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

export default AddOrderDialog;
