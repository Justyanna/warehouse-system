import React from 'react';
import { Grid, Button, Toolbar, IconButton, AppBar } from '@material-ui/core';
import useStyles from './styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useAuth } from '../../services/Auth.js';
import { useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import useFetch from '../../utils/useFetch';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

const AddOrders = () => {
	const history = useHistory();
	const classes = useStyles();
	const auth = useAuth();
	const [ checked, setChecked ] = React.useState([]);
	const { data: orders, refetch: refetchOrders } = useFetch('/orders');
	const { data: ordersForSeek, refetch: refetchOrdersForSeek } = useFetch('/seeks');
	const [ left, setLeft ] = React.useState(null);
	const [ right, setRight ] = React.useState(null);

	const leftChecked = intersection(checked, left);
	const rightChecked = intersection(checked, right);

	const logout = async () => {
		await auth.logout();
	};

	const undo = () => {
		history.push('/main');
	};

	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [ ...checked ];
		console.log(orders.filter((order) => order.id === value).splice(0, 1));

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	const handleAllRight = () => {
		setRight(right.concat(left));
		setLeft([]);
	};

	function not(a, b) {
		return a.filter((value) => b && b.indexOf(value) === -1);
	}

	function intersection(a, b) {
		return a.filter((value) => b && b.indexOf(value) !== -1);
	}

	const handleCheckedRight = () => {
		setRight(right.concat(leftChecked));
		setLeft(not(left, leftChecked));
		setChecked(not(checked, leftChecked));
	};

	const handleCheckedLeft = () => {
		setLeft(left.concat(rightChecked));
		setRight(not(right, rightChecked));
		setChecked(not(checked, rightChecked));
	};

	const handleAllLeft = () => {
		setLeft(left.concat(right));
		setRight([]);
	};

	const customList = (items) => (
		<Paper className={classes.paper}>
			<List dense component="div" role="list">
				{items.map((value) => {
					const labelId = `transfer-list-item-${value}-label`;

					return (
						<ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
							<ListItemIcon>
								<Checkbox
									checked={checked.indexOf(value) !== -1}
									tabIndex={-1}
									disableRipple
									inputProps={{ 'aria-labelledby': labelId }}
								/>
							</ListItemIcon>
							<ListItemText id={labelId} primary={value} />
						</ListItem>
					);
				})}
				<ListItem />
			</List>
		</Paper>
	);

	if (!Boolean(orders)) {
		return <CircularProgress />;
	} else {
		if (left === null) {
			var ids = new Array();
			orders.map(({ id }) => ids.push(id));
			setLeft(ids.splice(1, orders.length));
			setRight(ids.splice(0, 1));
			refetchOrders();
		}
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
					/>
				</Toolbar>
			</AppBar>

			<div className={classes.box}>
				<Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
					<Grid item>{customList(left)}</Grid>
					<Grid item>
						<Grid container direction="column" alignItems="center">
							<Button
								variant="outlined"
								size="small"
								className={classes.button}
								onClick={handleAllRight}
								disabled={left.length === 0}
								aria-label="move all right"
							>
								≫
							</Button>
							<Button
								variant="outlined"
								size="small"
								className={classes.button}
								onClick={handleCheckedRight}
								disabled={leftChecked.length === 0}
								aria-label="move selected right"
							>
								&gt;
							</Button>
							<Button
								variant="outlined"
								size="small"
								className={classes.button}
								onClick={handleCheckedLeft}
								disabled={rightChecked.length === 0}
								aria-label="move selected left"
							>
								&lt;
							</Button>
							<Button
								variant="outlined"
								size="small"
								className={classes.button}
								onClick={handleAllLeft}
								disabled={right.length === 0}
								aria-label="move all left"
							>
								≪
							</Button>
						</Grid>
					</Grid>
					<Grid item>{customList(right)}</Grid>
				</Grid>
			</div>
		</div>
	);
};

export default AddOrders;
