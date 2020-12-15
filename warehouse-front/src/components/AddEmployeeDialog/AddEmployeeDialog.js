import React from 'react';
import { MenuItem, Dialog, DialogTitle, DialogActions, Button, TextField } from '@material-ui/core';

const AddEmployeeDialog = ({
	firstName,
	setFirstName,
	lastName,
	setLastName,
	email,
	setEmail,
	password,
	setPassword,
	passwordRe,
	setPasswordRe,
	phoneNumber,
	setPhoneNumber,
	salary,
	setSalary,
	position,
	setPosition,
	roles,
	role,
	setRole,
	isDialogOpen,
	handleCancel,
	handleAccept,
	handleChange,
	submitting,
	flatPropsRole,
	classes
}) => (
	<Dialog open={isDialogOpen} onClose={handleCancel}>
		<DialogTitle>Podaj dane nowego pracownika</DialogTitle>
		<TextField
			id="filled-basic-fn"
			label="Imię"
			variant="filled"
			value={firstName}
			onChange={handleChange(setFirstName)}
		/>

		<TextField
			id="filled-basic-ln"
			label="Nazwisko"
			variant="filled"
			value={lastName}
			onChange={handleChange(setLastName)}
		/>

		<TextField
			id="filled-basic-e"
			label="Email"
			variant="filled"
			value={email}
			helperText={
				email.indexOf('@') === -1 ? (
					'Brakuje "@" '
				) : '' || email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/) ? (
					''
				) : (
					'Niepoprawny mail'
				)
			}
			onChange={handleChange(setEmail)}
		/>

		<TextField
			id="filled-basic-pass"
			label="Hasło"
			type="password"
			variant="filled"
			value={password}
			onChange={handleChange(setPassword)}
		/>

		<TextField
			id="filled-basic-repeat"
			label="Powtórz hasło"
			type="password"
			variant="filled"
			helperText={password !== passwordRe ? 'Hasła musza być identyczne' : ''}
			value={passwordRe}
			onChange={handleChange(setPasswordRe)}
		/>

		<TextField
			id="filled-basic-pn"
			label="Numer telefonu"
			variant="filled"
			value={phoneNumber}
			helperText={phoneNumber.length !== 9 ? 'Niepoprawny numer telefonu' : ''}
			onChange={handleChange(setPhoneNumber)}
		/>

		<TextField
			id="filled-basic-s"
			label="Płaca"
			variant="filled"
			value={salary}
			onChange={handleChange(setSalary)}
		/>

		<TextField
			id="filled-basic-p"
			label="Stanowisko"
			variant="filled"
			value={position}
			onChange={handleChange(setPosition)}
		/>

		<TextField
			className={classes.role}
			id="filled-field-serach"
			select
			label="Rola"
			value={role}
			onChange={handleChange(setRole)}
			variant="outlined"
			helperText={
				firstName &&
				lastName &&
				email &&
				password &&
				passwordRe &&
				phoneNumber &&
				salary &&
				position &&
				role ? (
					''
				) : (
					'Wypęłnij wszystkie pola'
				)
			}
		>
			{roles.map((option) => (
				<MenuItem key={option.value} value={option.value}>
					{option.label}
				</MenuItem>
			))}
		</TextField>

		<DialogActions>
			<Button onClick={handleCancel} color="secondary">
				Cancel
			</Button>
			{firstName && lastName && email && password && passwordRe && phoneNumber && salary && position && role ? (
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

export default AddEmployeeDialog;
