import React from 'react';
import { Button, Card, CardHeader, CardContent, CardActions } from '@material-ui/core';
import useStyles from './styles';
import EmployeeCrudDialog from './../EmployeeCrudDialog';
import api from './../../services/Api';
import { toast } from 'react-toastify';
const Task = ({ id, orderModel, employeeModel, type, refetchTasks }) => {
	const classes = useStyles();
	const [ submitting, setSubmitting ] = React.useState(false);
	const [ isConfirmationDialogOpen, setIsConfirmationDialogOpen ] = React.useState(false);

	const handleDelete = async () => {
		setSubmitting(true);
		try {
			const token = localStorage.getItem('token');
			await api.delete(`tasks/${id}`, {
				headers: { Authorization: `Bearer ${token}` }
			});
			toast.success('Zadanie usunięte!');
			refetchTasks();
			setSubmitting(false);
		} catch (ex) {
			toast.error('Przepraszamy, coś nie pykło!');
		}
	};

	return (
		<div>
			<div>
				<Card key={id} className={classes.rooot}>
					<CardHeader title={id} />
					<CardContent>
						Pracownik: {employeeModel.firstName} {employeeModel.lastName} <br />
						Zamówienie nr: {orderModel.id}
						<br />
						Status zamówienia : {orderModel.status}
						<br />
						Typ zadania: {type === 'seeker' ? 'przygotowywanie' : 'pakowanie'}
					</CardContent>
					<CardActions disableSpacing>
						<div className={classes.buttonBox}>
							<Button
								className={classes.buttonDelete}
								onClick={() => setIsConfirmationDialogOpen(true)}
								color="secondary"
								variant="contained"
							>
								Usuń
							</Button>
						</div>
					</CardActions>
				</Card>
				<EmployeeCrudDialog
					submitting={submitting}
					open={isConfirmationDialogOpen}
					handleAccept={handleDelete}
					handleCancel={() => setIsConfirmationDialogOpen(false)}
				/>
			</div>
		</div>
	);
};
export default Task;
