import React from 'react';
import { Grid, Button, Toolbar, IconButton, AppBar } from '@material-ui/core';
import useStyles from './styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useAuth } from '../../services/Auth.js';
import { useHistory } from 'react-router-dom';

const ManagerPanel = () => {
	const classes = useStyles();
	const auth = useAuth();
	const history = useHistory();

	const logout = async () => {
		await auth.logout();
	};

	const callAdd = async () => {
		history.push('/add');
	};

	const callOrderHistory = async () => {
		history.push('/orders');
	};

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
				</Toolbar>
			</AppBar>

			<div className={classes.box}>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<Button className={classes.paper} onClick={callAdd}>
							DODAJ ZAMÓWIENIA DO ZREALIZOWANIA
						</Button>
					</Grid>
					<Grid item xs={12}>
						<Button className={classes.paper} onClick={callOrderHistory}>
							ZAMÓWIENIA
						</Button>
					</Grid>
					<Grid item xs={12}>
						<Button className={classes.paper}>ZADANIA</Button>
					</Grid>
				</Grid>
			</div>
		</div>
	);
};

export default ManagerPanel;
