import React from 'react';
import { Grid, Button, Toolbar, IconButton, AppBar } from '@material-ui/core';
import useStyles from './styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useAuth } from '../../services/Auth.js';

const MainPage = () => {
	const classes = useStyles();
	const auth = useAuth();

	const logout = async () => {
		await auth.logout();
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
						<Button className={classes.paper}>ZAMÓWIENIA</Button>
					</Grid>
					<Grid item xs={12}>
						<Button className={classes.paper}>ZADANIA</Button>
					</Grid>
				</Grid>
			</div>
		</div>
	);
};
export default MainPage;
