import React from 'react';
import useFetch from '../../utils/useFetch';
import { TextField, Toolbar, IconButton, AppBar } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './styles';
import { useAuth } from '../../services/Auth.js';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import UndoRoundedIcon from '@material-ui/icons/UndoRounded';
import { useHistory } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Pagination from '../../components/pagination';
import { ToastContainer } from 'react-toastify';
import Order from './../../components/Order';

const OrdersCrudPage = () => {
	const history = useHistory();
	const classes = useStyles();
	const auth = useAuth();
	const { data: orders, refetch: refetchOrders } = useFetch('/orders');
	const [ currentPage, setCurrentPage ] = React.useState(1);
	const [ postsPerPage ] = React.useState(10);
	const indexOfLastEmployees = currentPage * postsPerPage;
	const indexOfFirstEmployees = indexOfLastEmployees - postsPerPage;
	const currentOrders = orders && orders.slice(indexOfFirstEmployees, indexOfLastEmployees);
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	const [ value, setValue ] = React.useState('');

	const logout = async () => {
		await auth.logout();
	};

	const undo = () => {
		history.push('/main');
	};

	const flatProps = {
		options: orders && orders.map((option) => option.id)
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
				</Toolbar>
			</AppBar>
			<div className={classes.rooot}>
				<div className={classes.search}>
					<Autocomplete
						className={classes.textField}
						{...flatProps}
						onChange={(event, newInputValue) => {
							setValue(newInputValue);
						}}
						value={value}
						getOptionSelected={(option, value) => option.name === value.name}
						renderInput={(params) => (
							<TextField key={params.id} {...params} label="Znajdź zamówienie" variant="outlined" />
						)}
					/>
				</div>
				<div className={classes.main}>
					{value ? (
						orders
							.filter((order) => order.id === value)
							.map(({ id, customer, totalPrice, items, delivery, tasks, status }) => (
								<Order
									boolean={true}
									key={id}
									{...{ id, customer, totalPrice, items, delivery, tasks, status }}
								/>
							))
					) : (
						currentOrders.map(({ id, customer, totalPrice, items, delivery, map, tasks, status }) => (
							<Order
								boolean={true}
								key={id}
								{...{ id, customer, totalPrice, map, items, delivery, tasks, status, refetchOrders }}
							/>
						))
					)}
				</div>
			</div>
			<ToastContainer />
			{!value && (
				<Pagination employeesPerPage={postsPerPage} total={orders && orders.length} paginate={paginate} />
			)}
		</div>
	);
};

export default OrdersCrudPage;
