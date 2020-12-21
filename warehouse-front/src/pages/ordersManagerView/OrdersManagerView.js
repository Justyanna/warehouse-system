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

const OrderManagerView = () => {
	const history = useHistory();
	const classes = useStyles();
	const auth = useAuth();
	const { data: orders, refetch: refetchOrders } = useFetch('/orders');
	const [ currentPage, setCurrentPage ] = React.useState(1);
	const [ postsPerPage ] = React.useState(8);
	const indexOfLastEmployees = currentPage * postsPerPage;
	const indexOfFirstEmployees = indexOfLastEmployees - postsPerPage;
	const currentOrders = orders && orders.slice(indexOfFirstEmployees, indexOfLastEmployees);
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	const logout = async () => {
		await auth.logout();
	};

	const undo = () => {
		history.push('/main');
	};

	if (!Boolean(orders)) {
		return <CircularProgress className={classes.loader} />;
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
				</Toolbar>
			</AppBar>
			<div className={classes.rooot}>
				<div className={classes.main}>
					{currentOrders.map(({ id, customer, totalPrice, items, delivery, map, tasks, status }) => (
						<Order
							boolean={null}
							key={id}
							{...{ id, customer, totalPrice, map, items, delivery, tasks, status, refetchOrders }}
						/>
					))}
				</div>
			</div>
			<ToastContainer />
			<Pagination employeesPerPage={postsPerPage} total={orders && orders.length} paginate={paginate} />
		</div>
	);
};

export default OrderManagerView;
