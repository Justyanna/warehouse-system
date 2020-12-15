import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import EmployeeCrudDialog from './../EmployeeCrudDialog';
import UpdateEmployeeDialog from './../updateEmployeeDialog';
import { Button } from '@material-ui/core';
import useStyles from './styles';
import api from './../../services/Api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Employee = ({ id, firstName, lastName, email, password, phoneNumber, salary, position, refetchEmployees }) => {
	const classes = useStyles();
	const [ isConfirmationDialogOpen, setIsConfirmationDialogOpen ] = React.useState(false);
	const [ isUpdateDialogOpen, setIsUpdateDialogOpen ] = React.useState(false);

	const [ submitting, setSubmitting ] = React.useState(false);
	const [ submitting1, setSubmitting1 ] = React.useState(false);
	const [ newFistName, setNewFirstName ] = React.useState('');
	const [ newLastName, setNewLastName ] = React.useState('');
	const [ newEmail, setNewEmail ] = React.useState('');
	const [ newPhone, setNewPhone ] = React.useState('');
	const [ newSalary, setSalary ] = React.useState('');
	const [ newPosition, setPosition ] = React.useState('');
	const [ newPassword, setNewPassword ] = React.useState('');
	const [ newPasswordRepeat, setPasswordRepeat ] = React.useState('');

	const handleAccept = async () => {
		const employee = {
			id: id,
			firstName: newFistName ? newFistName : firstName,
			lastName: newLastName ? newLastName : lastName,
			email: newEmail ? newEmail : email,
			password: newPassword ? newPassword : password,
			phoneNumber: newPhone ? newPhone : phoneNumber,
			salary: newSalary ? newSalary : salary,
			position: newPosition ? newPosition : position
		};

		setSubmitting1(true);
		if (newFistName || newLastName || newEmail || newPassword || newPhone || newSalary || newPosition) {
			try {
				const token = localStorage.getItem('token');
				await api.put(`employee/${id}`, employee, {
					headers: { Authorization: `Bearer ${token}` }
				});
				toast.success('Dane pracownika uaktualnione!');
				refetchEmployees();
				setIsUpdateDialogOpen(false);
				setSubmitting1(false);
				setNewFirstName('');
				setNewLastName('');
				setNewEmail('');
				setNewPhone('');
				setSalary('');
				setPosition('');
				setNewPassword('');
				setPasswordRepeat('');
			} catch (ex) {
				toast.error('Przepraszamy, coś nie pykło!');
			}
		}
		setSubmitting1(false);
	};

	const handleCancelUpdate = () => {
		setIsUpdateDialogOpen(false);
	};

	const handleChange = (setter) => (event) => {
		setter(event.target.value);
	};

	const handleDelete = async () => {
		setSubmitting(true);
		try {
			const token = localStorage.getItem('token');
			await api.delete(`employee/${id}`, {
				headers: { Authorization: `Bearer ${token}` }
			});
			toast.success('Pracownik usunięty!');
			refetchEmployees();
			setSubmitting(false);
		} catch (ex) {
			toast.error('Przepraszamy, coś nie pykło!');
		}
	};

	return (
		<div>
			<Card className={classes.rooot}>
				<CardHeader title={firstName + ' ' + lastName} subheader={email} />
				<CardContent>
					<div>
						Numer telefonu: {phoneNumber}
						<br />
						Płaca: {salary}
						<br />
						Stanowisko: {position}
					</div>
				</CardContent>
				<CardActions disableSpacing>
					<div className={classes.buttonBox}>
						<Button
							className={classes.buttonUpdate}
							color="secondary"
							onClick={() => setIsUpdateDialogOpen(true)}
						>
							Popraw
						</Button>
						<Button
							className={classes.buttonDelete}
							color="secondary"
							onClick={() => setIsConfirmationDialogOpen(true)}
							variant="contained"
						>
							Usuń
						</Button>
					</div>
				</CardActions>
			</Card>

			<UpdateEmployeeDialog
				id={id}
				firstName={firstName}
				lastName={lastName}
				email={email}
				phoneNumber={phoneNumber}
				salary={salary}
				position={position}
				newFistName={newFistName}
				newLastName={newLastName}
				newEmail={newEmail}
				password={password}
				newPassword={newPassword}
				newPhone={newPhone}
				newSalary={newSalary}
				newPosition={newPosition}
				setNewPassword={setNewPassword}
				newPasswordRepeat={newPasswordRepeat}
				setPasswordRepeat={setPasswordRepeat}
				setNewFirstName={setNewFirstName}
				setNewLastName={setNewLastName}
				setNewEmail={setNewEmail}
				setNewPhone={setNewPhone}
				setSalary={setSalary}
				setPosition={setPosition}
				open={isUpdateDialogOpen}
				submitting={submitting1}
				handleAccept={handleAccept}
				handleCancel={handleCancelUpdate}
				handleChange={handleChange}
			/>
			<EmployeeCrudDialog
				submitting={submitting}
				open={isConfirmationDialogOpen}
				handleAccept={handleDelete}
				handleCancel={() => setIsConfirmationDialogOpen(false)}
			/>
		</div>
	);
};

export default Employee;
