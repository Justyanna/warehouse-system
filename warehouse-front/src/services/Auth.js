import React from 'react';
import { useHistory } from 'react-router-dom';
import api from './Api';
import { toast } from 'react-toastify';

const AuthContext = React.createContext();

const AuthProvider = (props) => {
	const history = useHistory();
	const [ authorized, setAuthorized ] = React.useState(false);
	const [ isAdmin, setIsAdmin ] = React.useState(false);
	const [ isManager, setIsManager ] = React.useState(false);
	const [ isPacker, setIsPacker ] = React.useState(false);
	const [ isSeeker, setIsSeeker ] = React.useState(false);

	const initialize = async () => {
		try {
			const token = localStorage.getItem('token');
			await api.post('/api/auth/verify', token).then((response) => {
				if (response.status === 200) {
					setAuthorized(true);
				}
			});
		} catch (ex) {
			setAuthorized(false);
			localStorage.removeItem('token');
			history.push('/login');
		}
	};

	const login = async (email, password) => {
		localStorage.removeItem('token');
		const body = {
			email,
			password
		};

		try {
			const { data: { user, token } } = await api.post('/api/auth/login', body);

			if (user && token) {
				localStorage.setItem('token', token);
				setAuthorized(true);
				toast.success('Zalogowano!');
				history.push('/main');
			} else {
				toast.error('Przepraszamy, coś nie pykło!');
			}
		} catch (ex) {
			toast.error('Przepraszamy, coś nie pykło!');
		}
	};

	const checkIfAdmin = async () => {
		try {
			const token = localStorage.getItem('token');
			await api
				.post('/api/auth/isAdmin', token, {
					headers: { Authorization: `Bearer ${token}` }
				})
				.then((response) => {
					if (response.status === 200) {
						setIsAdmin(true);
					}
				});
		} catch (ex) {
			setIsAdmin(false);
		}
	};

	const checkIfManager = async () => {
		try {
			const token = localStorage.getItem('token');
			await api
				.post('/api/auth/isManager', token, {
					headers: { Authorization: `Bearer ${token}` }
				})
				.then((response) => {
					if (response.status === 200) {
						setIsManager(true);
					}
				});
		} catch (ex) {
			setIsManager(false);
		}
	};

	const checkIfPacker = async () => {
		try {
			const token = localStorage.getItem('token');
			await api
				.post('/api/auth/isPacker', token, {
					headers: { Authorization: `Bearer ${token}` }
				})
				.then((response) => {
					if (response.status === 200) {
						setIsPacker(true);
					}
				});
		} catch (ex) {
			setIsPacker(false);
		}
	};

	const checkIfSeeker = async () => {
		try {
			const token = localStorage.getItem('token');
			await api
				.post('/api/auth/isSeeker', token, {
					headers: { Authorization: `Bearer ${token}` }
				})
				.then((response) => {
					if (response.status === 200) {
						setIsSeeker(true);
					}
				});
		} catch (ex) {
			setIsSeeker(false);
		}
	};

	const logout = () => {
		setAuthorized(false);
		localStorage.removeItem('token');
		history.push('/login');
		window.location.reload();
	};

	return (
		<AuthContext.Provider
			value={{
				initialize,
				login,
				logout,
				checkIfAdmin,
				checkIfManager,
				checkIfPacker,
				checkIfSeeker,
				authorized,
				isAdmin,
				isManager,
				isPacker,
				isSeeker
			}}
			{...props}
		/>
	);
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
