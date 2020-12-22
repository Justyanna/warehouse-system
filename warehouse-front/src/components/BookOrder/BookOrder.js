import React from 'react';
import { Button, Card, CardHeader, CardContent, CardActions } from '@material-ui/core';
import useStyles from './styles';
import { toast } from 'react-toastify';
import api from './../../services/Api';
import Switch from '@material-ui/core/Switch';

const BookOrder = ({ orderModel, refetchOrders, boolean }) => {
	const classes = useStyles();
	const [ state, setState ] = React.useState({
		checkedA: false
	});

	const handleChangeSwitch = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};

	const addToMyOrders = async () => {
		try {
			const token = localStorage.getItem('token');
			const data = {
				id: orderModel.id,
				token: token
			};
			await api.post(`/api/auth/seeks`, data, {
				headers: { Authorization: `Bearer ${token}` }
			});
			toast.success('Dodano do twoich zadań!');
		} catch (ex) {
			toast.error('Przepraszamy, coś nie pykło!');
		}

		refetchOrders();
	};

	return (
		<div key="order-div">
			<div key="card-div">
				{state.checkedA ? (
					<Card className={classes.rooot} key="card-swtich">
						<Switch
							checked={state.checkedA}
							onChange={handleChangeSwitch}
							name="checkedA"
							inputProps={{ 'aria-label': 'secondary checkbox' }}
						/>
						<CardContent>
							Kwota do zapłaty: {orderModel.totalPrice}$<br />
							Staus: {orderModel.status} <br />
							Dostawa: {orderModel.delivery} <br />
							Zamówienie: <br />
							{orderModel.items.map((item) => {
								return (
									<div key={item.id}>
										{item.name} x {orderModel.map[item.id]} | cena:{' '}
										{orderModel.map[item.id] * item.price} $
										<br />
									</div>
								);
							})}
						</CardContent>
					</Card>
				) : (
					<Card className={classes.rooot} key="card-normal">
						<Switch
							checked={state.checkedA}
							onChange={handleChangeSwitch}
							name="checkedA"
							inputProps={{ 'aria-label': 'secondary checkbox' }}
						/>
						<CardHeader
							title={orderModel.id}
							subheader={
								<div>
									{orderModel.customer.customerName}
									<br />
									{orderModel.customer.address}
									<br />
									{orderModel.customer.email}
									<br />
									{orderModel.customer.phoneNumber}
								</div>
							}
						/>

						<CardActions>
							<div className={classes.buttonBox}>
								<Button className={classes.buttonAdd} onClick={addToMyOrders}>
									Dodaj do zadań
								</Button>
							</div>
						</CardActions>
					</Card>
				)}
			</div>
		</div>
	);
};

export default BookOrder;
