import React from 'react';
import { Grid, Button, Toolbar, IconButton, AppBar, Typography } from '@material-ui/core';
import useStyles from './styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useAuth } from '../../services/Auth.js';
import { useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const AdminPanel = () => {
	const history = useHistory();
	const classes = useStyles();
	const auth = useAuth();

	const logout = async () => {
		await auth.logout();
	};

	const callEmployeeCrudPane = () => {
		history.push('/employees');
	};

	const callOrdersCrudPane = () => {
		history.push('/orders');
	};

	const callOrdersHistoryCrudPage = () => {
		history.push('/ordersHistory');
	};

	const callInventoryPage = () => {
		history.push('/inventory');
	};

	return (
		<div className={classes.content}>
			<ToastContainer />
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
					<Typography className={classes.hello}>Witaj, adminie</Typography>
				</Toolbar>
			</AppBar>

			<div className={classes.box}>
				<Grid container spacing={3}>
					<Grid item xs={6}>
						<Button className={classes.paper} onClick={callEmployeeCrudPane}>
							ZARZĄDZAJ PRACOWNIKAMI
						</Button>
					</Grid>
					<Grid item xs={6}>
						<Button className={classes.paper} onClick={callOrdersCrudPane}>
							ZARZĄDZAJ ZAMÓWIENIAMI
						</Button>
					</Grid>
					<Grid item xs={6}>
						<Button className={classes.paper} onClick={callInventoryPage}>
							ZARZĄDZAJ ASORTYMENTEM
						</Button>
					</Grid>
					<Grid item xs={6}>
						<Button className={classes.paper} onClick={callOrdersHistoryCrudPage}>
							HISTORIA ZAMÓWIEŃ
						</Button>
					</Grid>
				</Grid>
			</div>
		</div>
	);
};

export default AdminPanel;
