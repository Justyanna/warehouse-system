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
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import api from './../../services/Api';

const AddOrders = () => {
	const history = useHistory();
	const classes = useStyles();
	const auth = useAuth();
	const [ checked, setChecked ] = React.useState([]);
	const { data: orders, refetch: refetchOrders } = useFetch('/orders');
	const { data: ordersForSeek, refetch: refetchOrdersForSeek } = useFetch('/seeks');
	const [ left, setLeft ] = React.useState(null);
	const [ right, setRight ] = React.useState(null);
	const intersectionList = orders && ordersForSeek && orders.filter((order) => !ordersForSeek.includes(order));

	const leftChecked = intersection(checked, left);
	const rightChecked = intersection(checked, right);

	const logout = async () => {
		await auth.logout();
	};

	const undo = () => {
		history.push('/main');
	};

	const numberOfChecked = (items) => intersection(checked, items).length;

	const handleToggleAll = (items) => () => {
		if (numberOfChecked(items) === items.length) {
			setChecked(not(checked, items));
		} else {
			setChecked(union(checked, items));
		}
	};

	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [ ...checked ];

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

	function union(a, b) {
		return [ ...a, ...not(b, a) ];
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

	const handleSave = async () => {
		console.log(ordersForSeek);
		const orderId = right[right.length - 1];
		const order = orders.filter((order) => order.id === orderId && !ordersForSeek.includes(order))[0];
		const token = localStorage.getItem('token');
		try {
			if (order) {
				api.post(`/seeks`, order, {
					headers: { Authorization: `Bearer ${token}` }
				});
			}

			refetchOrders();
			refetchOrdersForSeek();
		} catch (ex) {}
	};

	const customListRight = (title, items) => (
		<Card>
			<CardHeader className={classes.cardHeader} title={title} />
			<Divider />
			<List className={classes.list} dense component="div" role="list">
				{items &&
					items.map((value) => {
						const labelId = `transfer-list-all-item-${value}-label1`;
						return (
							<ListItem key={value} role="listitem">
								<ListItemIcon />
								<ListItemText id={labelId} primary={value} />
							</ListItem>
						);
					})}
				<ListItem />
			</List>
		</Card>
	);

	const customList = (title, items) => (
		<Card>
			<CardHeader
				className={classes.cardHeader}
				avatar={
					<Checkbox
						onClick={handleToggleAll(items)}
						checked={items && numberOfChecked(items) === items.length && items.length !== 0}
						indeterminate={items && numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
						disabled={items && items.length === 0}
						inputProps={{ 'aria-label': 'all items selected' }}
					/>
				}
				title={title}
				subheader={items && `${numberOfChecked(items)}/${items.length} wybranych`}
			/>
			<Divider />
			<List className={classes.list} dense component="div" role="list">
				{items &&
					items.map((value) => {
						const labelId = `transfer-list-all-item-${value}-label`;

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
		</Card>
	);

	if (!Boolean(orders)) {
		return <CircularProgress />;
	} else {
		if (left === null) {
			var ids = new Array();
			intersectionList.map(({ id }) => ids.push(id));
			var ids2 = new Array();
			ordersForSeek.map(({ orderModel }) => ids2.push(orderModel.id));
			setLeft(ids);
			setRight(ids2);
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
				<Grid container spacing={2} justify="center" alignItems="center">
					<Grid item>{customList('Wszystkie zamówienia', left)}</Grid>
					<Grid item>
						<Grid container direction="column" alignItems="center">
							<Button
								className={classes.button}
								variant="outlined"
								size="small"
								className={classes.button}
								onClick={handleAllRight}
								disabled={left && left.length === 0}
								aria-label="move all right"
							>
								≫
							</Button>
							<Button
								className={classes.button}
								variant="outlined"
								size="small"
								className={classes.button}
								onClick={handleCheckedRight}
								disabled={leftChecked && leftChecked.length === 0}
								aria-label="move selected right"
							>
								&gt;
							</Button>

							<Button className={classes.save} onClick={handleSave}>
								Zapisz
							</Button>
						</Grid>
					</Grid>

					<Grid item>{customListRight('Zamówienia do realizacji', right)}</Grid>
				</Grid>
			</div>
		</div>
	);
};

export default AddOrders;