import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {
	LoginPage,
	MainPage,
	EmployeeCrudPage,
	AdminPanel,
	OrdersCrudPage,
	OrderHistory,
	InventoryPage,
	AddOrders,
	OrderManagerView,
	OrderEmployeeView
} from './pages';
import ManagerPanel from './pages/managerPanel';
import { useAuth } from './services/Auth';

const App = () => {
	const auth = useAuth();
	React.useEffect(
		() => {
			!auth.authorized && auth.initialize();
		},
		[ auth ]
	);

	React.useEffect(
		() => {
			auth.authorized && !auth.isAdmin && auth.checkIfAdmin();
		},
		[ auth ]
	);

	React.useEffect(
		() => {
			auth.authorized && !auth.isManager && auth.checkIfManager();
		},
		[ auth ]
	);

	React.useEffect(
		() => {
			auth.authorized && !auth.isPacker && auth.checkIfPacker();
		},
		[ auth ]
	);

	React.useEffect(
		() => {
			auth.authorized && !auth.isSeeker && auth.checkIfSeeker();
		},
		[ auth ]
	);

	const authorizedRoutes = (
		<Switch>
			<Redirect from="/login" to="/main" />
		</Switch>
	);

	const managerRole = (
		<Switch>
			<Route exact path="/orders" component={OrderManagerView} />
			<Route exact path="/main" component={ManagerPanel} />
			<Route exact path="/add" component={AddOrders} />
		</Switch>
	);

	const packerRole = (
		<Switch>
			<Route exact path="/main" />
		</Switch>
	);

	const seekerRole = (
		<Switch>
			<Route exact path="/orders" component={OrderEmployeeView} />
			<Route exact path="/main" component={MainPage} />
		</Switch>
	);

	const adminRole = (
		<Switch>
			<Route exact path="/inventory" component={InventoryPage} />
			<Route exact path="/ordersHistory" component={OrderHistory} />
			<Route exact path="/orders" component={OrdersCrudPage} />
			<Route exact path="/employees" component={EmployeeCrudPage} />
			<Route exact path="/main" component={AdminPanel} />
		</Switch>
	);

	const unauthorizedRoutes = (
		<Switch>
			<Route exact path="/login" component={LoginPage} />
		</Switch>
	);

	return auth.authorized
		? auth.isAdmin
			? adminRole
			: auth.isManager ? managerRole : auth.isPacker ? packerRole : auth.isSeeker ? seekerRole : authorizedRoutes
		: unauthorizedRoutes;
};

export default App;
