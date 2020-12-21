import React from 'react';
import useFetch from '../../utils/useFetch';
import { Button, TextField, Toolbar, IconButton, AppBar } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './styles';
import { useAuth } from '../../services/Auth.js';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import UndoRoundedIcon from '@material-ui/icons/UndoRounded';
import { useHistory } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Pagination from '../../components/pagination';
import { ToastContainer } from 'react-toastify';
import Item from './../../components/Item';
import AddItemDialog from './../../components/AddItemDialog';
import { toast } from 'react-toastify';
import api from './../../services/Api';

const InventoryPage = () => {
	const history = useHistory();
	const classes = useStyles();
	const auth = useAuth();
	const { data: items, refetch: refetchItems } = useFetch('/items');
	const [ currentPage, setCurrentPage ] = React.useState(1);
	const [ postsPerPage ] = React.useState(8);
	const indexOfLastEmployees = currentPage * postsPerPage;
	const indexOfFirstEmployees = indexOfLastEmployees - postsPerPage;
	const currentitems = items && items.slice(indexOfFirstEmployees, indexOfLastEmployees);
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	const [ , setSubmitting ] = React.useState(false);
	const [ newName, setNewName ] = React.useState('');
	const [ newPrice, setNewPrice ] = React.useState('');
	const [ newDesccription, setNewDescription ] = React.useState('');
	const [ newProducer, setNewProducer ] = React.useState('');
	const [ isAddDialogOpen, setIsAddDialogOpen ] = React.useState(false);

	const handleAccept = async () => {
		const item = {
			name: newName,
			price: newPrice,
			description: newDesccription,
			producer: newProducer
		};

		setSubmitting(true);
		if (newName && newPrice && newDesccription && newProducer) {
			try {
				const token = localStorage.getItem('token');
				await api.post(`items`, item, {
					headers: { Authorization: `Bearer ${token}` }
				});
				toast.success('Dodano przedmiot!');
				refetchItems();
				setNewName('');
				setNewPrice('');
				setNewProducer('');
				setNewDescription('');
			} catch (ex) {
				toast.error('Przepraszamy, coś nie pykło!');
			}
		}
		setSubmitting(false);
	};

	const handleCancelUpdate = () => {
		setIsAddDialogOpen(false);
	};

	const handleChange = (setter) => (event) => {
		setter(event.target.value);
	};

	const [ value, setValue ] = React.useState('');

	const logout = async () => {
		await auth.logout();
	};

	const undo = () => {
		history.push('/main');
	};

	const flatProps = {
		options: items && items.map((option) => option.name)
	};

	if (!Boolean(items)) {
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
					<Button className={classes.add} onClick={() => setIsAddDialogOpen(true)}>
						Dodaj produkt
					</Button>
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
							<TextField key={params.id} {...params} label="Znajdź produkt" variant="outlined" />
						)}
					/>
				</div>
				<div className={classes.main}>
					{value ? (
						items
							.filter((order) => order.name === value)
							.map(({ id, name, price, description, producer }) => (
								<Item
									boolean={true}
									key={id}
									{...{ id, name, price, description, producer, refetchItems }}
								/>
							))
					) : (
						currentitems.map(({ id, name, price, description, producer }) => (
							<Item
								boolean={true}
								key={id}
								{...{ id, name, price, description, producer, refetchItems }}
							/>
						))
					)}
				</div>
			</div>
			<ToastContainer />
			{!value && <Pagination employeesPerPage={postsPerPage} total={items && items.length} paginate={paginate} />}
			<AddItemDialog
				{...{
					newName,
					setNewName,
					newPrice,
					setNewPrice,
					newDesccription,
					setNewDescription,
					newProducer,
					setNewProducer,
					handleChange,
					handleAccept,
					handleCancelUpdate,
					isUpdateDialogOpen: isAddDialogOpen,
					refetchItems
				}}
			/>
		</div>
	);
};

export default InventoryPage;
