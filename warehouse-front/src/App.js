import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { LoginPage, MainPage, EmployeeCrudPage, AdminPanel, OrdersCrudPage, OrderHistory } from './pages';
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

	const authorizedRoutes = (
		<Switch>
			<Redirect from="/login" to="/main" />
			<Route exact path="/main" component={MainPage} />
		</Switch>
	);

	const adminRole = (
		<Switch>
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

	return auth.authorized ? (auth.isAdmin ? adminRole : authorizedRoutes) : unauthorizedRoutes;
};

export default App;
