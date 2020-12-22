import React from 'react';
import {
	Button,
	Card,
	CardActions,
	CardHeader,
	CardContent,
	List,
	ListItem,
	ListItemText,
	Checkbox
} from '@material-ui/core';
import useStyles from './styles';
import { toast } from 'react-toastify';
import api from './../../services/Api';

const EmployeeTask = ({ id, orderModel, employeeModel, type, refetchTasks }) => {
	const classes = useStyles();
	const map = new Map();
	const [ allchecked, setAllCheckerd ] = React.useState(false);

	const finish = async () => {
		try {
			const ready = {
				id: orderModel.id,
				customer: orderModel.customer,
				totalPrice: orderModel.totalPrice,
				items: orderModel.items,
				map: orderModel.map,
				status: 'ready',
				delivery: orderModel.delivery,
				timestamp: orderModel.timestamp
			};
			const token = localStorage.getItem('token');
			type === 'seeker'
				? await api.post(`packs`, orderModel, {
						headers: { Authorization: `Bearer ${token}` }
					})
				: await api.put(`orders/${orderModel.id}`, ready, {
						headers: { Authorization: `Bearer ${token}` }
					});
			await api.delete(`tasks/${id}`, {
				headers: { Authorization: `Bearer ${token}` }
			});
			refetchTasks();
		} catch (ex) {}
		toast.success('Ukończono zadanie!');
	};

	const handleToggle = (id, value) => () => {
		map.set(id, value);
		setAllCheckerd(Array.from(map.values()).includes(false) ? false : true);
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
						<br />
						Zamówienie:
						<br />
						<List>
							{orderModel.items.map((item) => {
								map.set(item.id, false);

								const label = `${item.name} (${item.producer}) x ${orderModel.map[item.id]}`;
								return (
									<ListItem key={item.id}>
										<Checkbox
											aria-label="employee-task"
											label="employee-task"
											id="employee-task"
											onClick={handleToggle(item.id, !map.get(item.id))}
										/>

										<ListItemText
											aria-label="employee-task"
											label="employee-task"
											id={orderModel.id}
											primary={label}
										/>
									</ListItem>
								);
							})}
						</List>
					</CardContent>
					<CardActions disableSpacing>
						<div className={classes.buttonBox}>
							<Button
								className={classes.buttonDelete}
								disabled={!allchecked}
								onClick={finish}
								variant="contained"
							>
								Ukończone
							</Button>
						</div>
					</CardActions>
				</Card>
			</div>
		</div>
	);
};

export default EmployeeTask;
