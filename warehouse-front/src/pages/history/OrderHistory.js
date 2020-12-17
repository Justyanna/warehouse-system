import React from 'react';
import useFetch from '../../utils/useFetch';
import { Toolbar, IconButton, AppBar, Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './styles';
import { useAuth } from '../../services/Auth.js';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import UndoRoundedIcon from '@material-ui/icons/UndoRounded';
import { useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Order from '../../components/Order';
import Pagination from '../../components/pagination';
import api from './../../services/Api';

const OrderHistory = () => {
	const history = useHistory();
	const classes = useStyles();
	const auth = useAuth();
	const { data: orders, refetch: refetchOrders } = useFetch('/ordersHistory');
	const [ currentPage, setCurrentPage ] = React.useState(1);
	const [ postsPerPage ] = React.useState(8);
	const indexOfLastEmployees = currentPage * postsPerPage;
	const indexOfFirstEmployees = indexOfLastEmployees - postsPerPage;
	const currentOrders = orders && orders.slice(indexOfFirstEmployees, indexOfLastEmployees);
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	const logout = async () => {
		await auth.logout();
	};

	const deleteAll = async () => {
		const token = localStorage.getItem('token');
		await api.delete('/ordersHistory', {
			headers: { Authorization: `Bearer ${token}` }
		});
		refetchOrders();
	};

	const undo = () => {
		history.push('/main');
	};

	if (!Boolean(orders)) {
		return <CircularProgress />;
	}

	return (
		<div className={classes.content}>
			<AppBar position="static" className={classes.bar}>
				<Toolbar>
					<IconButton
						edge="end"
						className={classes.menuButton}
						color="inherit"
						aria-label="menu"
						onClick={logout}
					>
						<ExitToAppIcon fontSize="large" />
					</IconButton>
					<IconButton
						edge="end"
						className={classes.menuButton}
						color="inherit"
						aria-label="menu"
						onClick={undo}
					>
						<UndoRoundedIcon />
					</IconButton>

					<Button className={classes.add} onClick={deleteAll}>
						Wyczyść historie
					</Button>
				</Toolbar>
			</AppBar>
			<div className={classes.rooot}>
				<div className={classes.main}>
					{currentOrders.map(({ order }) => {
						return (
							<Order
								key={order.id}
								id={order.id}
								customer={order.customer}
								totalPrice={order.totalPrice}
								map={order.map}
								items={order.items}
								tasks={order.tasks}
								status={order.status}
								refetchOrders={refetchOrders}
								boolean={null}
							/>
						);
					})}
				</div>
			</div>
			<ToastContainer />
			<Pagination employeesPerPage={postsPerPage} total={orders && orders.length} paginate={paginate} />
		</div>
	);
};

export default OrderHistory;
