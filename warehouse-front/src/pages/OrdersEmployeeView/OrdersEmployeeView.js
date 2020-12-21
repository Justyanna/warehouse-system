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
import Pagination from '../../components/pagination';
import BookOrder from './../../components/BookOrder';

const OrderEmployeeView = () => {
	const history = useHistory();
	const classes = useStyles();
	const auth = useAuth();
	const { data: orders, refetch: refetchOrders } = useFetch('/seeks');
	const [ currentPage, setCurrentPage ] = React.useState(1);
	const [ postsPerPage ] = React.useState(8);
	const indexOfLastEmployees = currentPage * postsPerPage;
	const indexOfFirstEmployees = indexOfLastEmployees - postsPerPage;
	const currentOrders = orders && orders.slice(indexOfFirstEmployees, indexOfLastEmployees);
	const paginate = (pageNumber) => setCurrentPage(pageNumber);
	const avaible = orders && orders.filter((order) => order.orderModel.tasks === null);

	const logout = async () => {
		await auth.logout();
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
				</Toolbar>
			</AppBar>
			<div className={classes.rooot}>
				<div className={classes.main}>
					{avaible &&
						avaible.map(({ orderModel }) => {
							return (
								<BookOrder
									key={orderModel.id}
									{...{
										orderModel,
										refetchOrders
									}}
								/>
							);
						})}
				</div>
			</div>
			<ToastContainer />
			<Pagination employeesPerPage={postsPerPage} total={avaible && avaible.length} paginate={paginate} />
		</div>
	);
};

export default OrderEmployeeView;
