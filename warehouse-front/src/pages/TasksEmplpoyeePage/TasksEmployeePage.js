import React from 'react';
import { Toolbar, IconButton, AppBar, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './styles';
import { useAuth } from '../../services/Auth.js';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import UndoRoundedIcon from '@material-ui/icons/UndoRounded';
import { useHistory } from 'react-router-dom';
import Pagination from '../../components/pagination';
import { ToastContainer } from 'react-toastify';
import EmployeeTask from './../../components/EmployeeTask';
import useFetchTasks from '../../utils/useFetchTasks';

const TasksEmployeePage = () => {
	const history = useHistory();
	const classes = useStyles();
	const auth = useAuth();

	const { data: tasks, refetch: refetchTasks } = useFetchTasks();
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
					{currenttasks.map(({ id, orderModel, employeeModel, type }) => (
						<EmployeeTask key={id} {...{ id, orderModel, employeeModel, type, refetchTasks }} />
					))}
				</div>
			</div>
			<ToastContainer />
			<Pagination employeesPerPage={postsPerPage} total={tasks && tasks.length} paginate={paginate} />
		</div>
	);
};

export default TasksEmployeePage;
