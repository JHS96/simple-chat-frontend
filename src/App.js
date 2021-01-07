import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout';
import Auth from './containers/Signup/Auth';

import './App.css';

let isAuth = false; // Auth status will be handled in state later (probably Redux)

let routes = (
	<Switch>
		<Route path='/auth' exact component={Auth} />
		<Redirect to='/auth' />
	</Switch>
);

if (isAuth) {
	routes = <Switch></Switch>; // Different/more routes will be available for authenticated users later
}

const App = () => {
	return (
		<div>
			<Layout isAuth={isAuth}>{routes}</Layout>
		</div>
	);
};

export default App;
