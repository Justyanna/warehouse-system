import React from 'react';
import useFetch from '../../utils/useFetch';
import { Typography, Toolbar, IconButton, AppBar } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './styles';
import { useAuth } from '../../services/Auth.js';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import UndoRoundedIcon from '@material-ui/icons/UndoRounded';
import { useHistory } from 'react-router-dom';
import Pagination from '../../components/pagination';
import { ToastContainer } from 'react-toastify';
import Task from './../../components/Task';

const TasksPage = () => {
	const history = useHistory();
	const classes = useStyles();
	const auth = useAuth();
	const { data: tasks } = useFetch('/tasks');
	const [ currentPage, setCurrentPage ] = React.useState(1);
	const [ postsPerPage ] = React.useState(8);
	const indexOfLastEmployees = currentPage * postsPerPage;
	const indexOfFirstEmployees = indexOfLastEmployees - postsPerPage;
	const currenttasks = tasks && tasks.slice(indexOfFirstEmployees, indexOfLastEmployees);
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	const logout = async () => {
		await auth.logout();
	};

	const undo = () => {
		history.push('/main');
	};

	if (!Boolean(tasks)) {
		return <CircularProgress size="4rem" className={classes.loader} />;
	}

	if (tasks && tasks.length === 0) {
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
						<Typography className={classes.empty} variant="h4" component="h4" gutterBottom>
							Brak zadań
						</Typography>
					</div>
				</div>
				<ToastContainer />
			</div>
		);
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
					{currenttasks.map(({ id, orderModel, employeeModel, type, refetchTasks }) => (
						<Task key={id} {...{ id, orderModel, employeeModel, type, refetchTasks }} />
					))}
				</div>
			</div>
			<ToastContainer />
			<Pagination employeesPerPage={postsPerPage} total={tasks && tasks.length} paginate={paginate} />
		</div>
	);
};

export default TasksPage;
