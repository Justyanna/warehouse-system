import React from 'react';
import Employee from './../../components/Employee';
import useFetch from './../../utils/useFetch';
import { MenuItem, TextField, Toolbar, IconButton, AppBar, Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './styles';
import { useAuth } from '../../services/Auth.js';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import UndoRoundedIcon from '@material-ui/icons/UndoRounded';
import { useHistory } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Pagination from './../../components/pagination';
import { ToastContainer } from 'react-toastify';
import AddEmployeeDialog from './../../components/AddEmployeeDialog';
import { toast } from 'react-toastify';
import api from './../../services/Api';

const EmployeeCrudPage = () => {
	const history = useHistory();
	const classes = useStyles();
	const auth = useAuth();
	const [ isDialogOpen, setIsDialogOpen ] = React.useState(false);
	const [ submitting, setSubmitting ] = React.useState(false);
	const { data: employees, refetch: refetchEmployees } = useFetch('/employee');
	const [ value, setValue ] = React.useState('');
	const [ field, setField ] = React.useState('lastName');
	const [ currentPage, setCurrentPage ] = React.useState(1);
	const [ postsPerPage ] = React.useState(10);
	const [ firstName, setFirstName ] = React.useState('');
	const [ lastName, setLastName ] = React.useState('');
	const [ email, setEmail ] = React.useState('');
	const [ phoneNumber, setPhoneNumber ] = React.useState('');
	const [ salary, setSalary ] = React.useState('');
	const [ position, setPosition ] = React.useState('');
	const [ password, setPassword ] = React.useState('');
	const [ passwordRe, setPasswordRe ] = React.useState('');
	const [ role, setRole ] = React.useState('');

	const indexOfLastEmployees = currentPage * postsPerPage;
	const indexOfFirstEmployees = indexOfLastEmployees - postsPerPage;
	const currentEmployees = employees && employees.slice(indexOfFirstEmployees, indexOfLastEmployees);
	const paginate = (pageNumber) => setCurrentPage(pageNumber);
	const roles = [
		{
			value: 'EMPLOYEE',
			label: 'Pracownik'
		},
		{
			value: 'ADMIN',
			label: 'Administrator'
		},
		{
			value: 'MANAGER',
			label: 'Kierownik zmiany'
		}
	];

	const handleAccept = async () => {
		setSubmitting(true);
		const employee = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: password,
			phoneNumber: phoneNumber,
			salary: salary,
			position: position,
			roles: new Array(role)
		};

		if (firstName && lastName && email && password && passwordRe && phoneNumber && salary && position && role) {
			try {
				const token = localStorage.getItem('token');
				await api.post(`/api/auth/register`, employee, {
					headers: { Authorization: `Bearer ${token}` }
				});
				toast.success('Dodano nowego pracownika!');
				setFirstName('');
				setLastName('');
				setEmail('');
				setPassword('');
				setPhoneNumber('');
				setRole('');
				setPasswordRe('');
				setSalary('');
			} catch (ex) {
				toast.error('Przepraszamy, coś nie pykło!');
			}
		}
		setSubmitting(false);
	};

	const handleCancel = () => {
		setIsDialogOpen(false);
		setFirstName('');
		setLastName('');
		setEmail('');
		setPassword('');
		setPhoneNumber('');
		setRole('');
		setPasswordRe('');
		setSalary('');
	};

	const fields = [
		{
			value: 'firstName',
			label: 'Imię'
		},
		{
			value: 'lastName',
			label: 'Nazwisko'
		},
		{
			value: 'email',
			label: 'Email'
		},
		{
			value: 'position',
			label: 'Stanowisko'
		},
		{
			value: 'phoneNumber',
			label: 'Numer telefonu'
		}
	];

	const logout = async () => {
		await auth.logout();
	};

	const handleChange = (setter) => (event) => {
		setter(event.target.value);
	};

	const handleChangeFiled = (event) => {
		setField(event.target.value);
	};

	const undo = () => {
		history.push('/main');
	};

	const openAddDialog = () => {
		setIsDialogOpen(true);
	};

	const employeesArray = employees ? employees : [ { lastName: 'Doe' } ];

	const flatProps = {
		options: employeesArray.map((option) => option[field])
	};

	const flatPropsRole = {
		options: roles.map((option) => option.label)
	};

	if (!Boolean(employees)) {
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

					<Button className={classes.add} onClick={openAddDialog}>
						Dodaj pracownika
					</Button>
				</Toolbar>
			</AppBar>
			<div className={classes.rooot}>
				<div className={classes.search}>
					<TextField
						className={classes.textField}
						id="filled-field-serach"
						select
						label="Wybierz pole po którym chcesz wyszukać"
						value={field}
						onChange={handleChangeFiled}
						variant="outlined"
					>
						{fields.map((option) => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
					<Autocomplete
						className={classes.textField}
						{...flatProps}
						onChange={(event, newInputValue) => {
							setValue(newInputValue);
						}}
						value={value}
						getOptionSelected={(option, value) => option.name === value.name}
						renderInput={(params) => (
							<TextField key={params.id} {...params} label="Znajdź pracownika" variant="outlined" />
						)}
					/>
				</div>
				<div className={classes.main}>
					{field && value ? (
						employees
							.filter((employee) => employee[field] === value)
							.map(
								({
									id,
									firstName,
									lastName,
									email,
									password,
									phoneNumber,
									salary,
									position,
									roles
								}) => (
									<Employee
										key={email}
										{...{
											id,
											firstName,
											lastName,
											email,
											password,
											phoneNumber,
											salary,
											position,
											roles,
											refetchEmployees
										}}
									/>
								)
							)
					) : (
						currentEmployees.map(
							({ id, firstName, lastName, email, password, phoneNumber, salary, position, roles }) => (
								<Employee
									key={email}
									{...{
										id,
										firstName,
										lastName,
										email,
										password,
										phoneNumber,
										salary,
										position,
										roles,
										refetchEmployees
									}}
								/>
							)
						)
					)}
				</div>
			</div>
			<ToastContainer />
			{!value && (
				<Pagination employeesPerPage={postsPerPage} total={employees && employees.length} paginate={paginate} />
			)}
			<AddEmployeeDialog
				{...{
					firstName,
					setFirstName,
					lastName,
					setLastName,
					email,
					setEmail,
					password,
					setPassword,
					passwordRe,
					setPasswordRe,
					phoneNumber,
					setPhoneNumber,
					salary,
					setSalary,
					position,
					setPosition,
					roles,
					role,
					setRole,
					isDialogOpen,
					handleCancel,
					handleAccept,
					handleChange,
					submitting,
					flatPropsRole,
					classes
				}}
			/>
		</div>
	);
};

export default EmployeeCrudPage;
