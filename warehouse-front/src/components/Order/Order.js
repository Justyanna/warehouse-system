import React from 'react';
import { Button, Card, CardHeader, CardContent, CardActions } from '@material-ui/core';
import useStyles from './styles';
import EmployeeCrudDialog from './../EmployeeCrudDialog';
import api from './../../services/Api';
import { toast } from 'react-toastify';
import UpdateOrderDialog from './../updateOrderDialog';
import Switch from '@material-ui/core/Switch';

const Order = ({ id, customer, totalPrice, items, map, tasks, status, delivery, refetchOrders, boolean }) => {
	const [ submitting, setSubmitting ] = React.useState(false);
	const [ isConfirmationDialogOpen, setIsConfirmationDialogOpen ] = React.useState(false);
	const [ isUpdateDialogOpen, setIsUpdateDialogOpen ] = React.useState(false);
	const [ newAddress, setNewAddres ] = React.useState('');
	const [ newEmail, setNewEmail ] = React.useState('');
	const [ phone, setPhone ] = React.useState('');
	const [ price, setPrice ] = React.useState('');
	const [ newstatus, setNewStatus ] = React.useState('');
	const [ newname, setName ] = React.useState('');

	const [ state, setState ] = React.useState({
		checkedA: false
	});

	const handleChangeSwitch = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};

	const handleDelete = async () => {
		setSubmitting(true);
		try {
			const token = localStorage.getItem('token');
			await api.delete(`orders/${id}`, {
				headers: { Authorization: `Bearer ${token}` }
			});
			toast.success('Zamówienie usunięte!');
			refetchOrders();
			setSubmitting(false);
		} catch (ex) {
			toast.error('Przepraszamy, coś nie pykło!');
		}
	};

	const handleChange = (setter) => (event) => {
		setter(event.target.value);
	};

	const handleCancelUpdate = () => {
		setIsUpdateDialogOpen(false);
	};

	const handleAccept = async () => {
		setSubmitting(true);
		const newCustomer = {
			id: customer.id,
			customerName: newname ? newname : customer.customerName,
			address: newAddress ? newAddress : customer.address,
			email: newEmail ? newEmail : customer.email,
			phoneNumber: phone ? phone : customer.phoneNumber
		};

		const order = {
			id: id,
			customer: newCustomer,
			totalPrice: price ? price : totalPrice,
			items: items,
			map: map,
			tasks: tasks,
			status: newstatus ? newstatus : status
		};
		try {
			const token = localStorage.getItem('token');
			await api.put(`customer/${customer.id}`, newCustomer, {
				headers: { Authorization: `Bearer ${token}` }
			});

			await api.put(`orders/${id}`, order, {
				headers: { Authorization: `Bearer ${token}` }
			});
			toast.success('Zamówienie zmodyfikowane!');
			refetchOrders();
			setSubmitting(false);
		} catch (ex) {
			toast.error('Przepraszamy, coś nie pykło!');
		}
	};

	const classes = useStyles();
	return (
		<div>
			<div>
				{state.checkedA ? (
					<Card key={id} className={classes.rooot}>
						<Switch
							checked={state.checkedA}
							onChange={handleChangeSwitch}
							name="checkedA"
							inputProps={{ 'aria-label': 'secondary checkbox' }}
						/>
						<CardContent>
							Kwota do zapłaty: {totalPrice}$<br />
							Staus: {status} <br />
							Dostawa: {delivery} <br />
							Zamówienie: <br />
							{items.map((item) => {
								return (
									<div>
										{item.name} x {map[item.id]} | cena: {map[item.id] * item.price} $
										<br />
									</div>
								);
							})}
						</CardContent>
					</Card>
				) : (
					<Card key={customer.email} className={classes.rooot}>
						<Switch
							checked={state.checkedA}
							onChange={handleChangeSwitch}
							name="checkedA"
							inputProps={{ 'aria-label': 'secondary checkbox' }}
						/>
						<CardHeader
							title={id}
							subheader={
								<div>
									{customer.customerName}
									<br />
									{customer.address}
									<br />
									{customer.email}
									<br />
									{customer.phoneNumber}
								</div>
							}
						/>

						<CardActions disableSpacing>
							{boolean && (
								<div className={classes.buttonBox}>
									<Button
										className={classes.buttonUpdate}
										variant="contained"
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
							)}
						</CardActions>
					</Card>
				)}
			</div>
			<EmployeeCrudDialog
				submitting={submitting}
				open={isConfirmationDialogOpen}
				handleAccept={handleDelete}
				handleCancel={() => setIsConfirmationDialogOpen(false)}
			/>
			<UpdateOrderDialog
				{...{
					customer,
					totalPrice,
					status,
					newAddress,
					setNewAddres,
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
				}}
			/>
		</div>
	);
};

export default Order;
