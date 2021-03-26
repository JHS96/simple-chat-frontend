import { useEffect } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Layout from './hoc/Layout';
import LogoutPage from './components/LogoutPage/LogoutPage';
import Auth from './containers/Auth/Auth';
import Conversations from './containers/Conversations/Conversations';
import EmailConfirmStatus from './components/EmailConfirmStatus/EmailConfirmStatus';
import SentRequests from './containers/SentRequests/SentRequests';
import ReceivedRequests from './containers/ReceivedRequests/ReceivedRequests';
import SearchUsers from './containers/SearchUsers/SearchUsers';
import allActions from './redux/actions/';

import './App.css';

const App = () => {
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);
	let isAuth = user.isAuth;
	useEffect(() => {
		// Check if valid (non-expired) token & data exists in localStorage. Auto-login (or not) based on that
		const token = localStorage.getItem('token');
		const jwtExpTime = localStorage.getItem('jwtExpireTime');
		const data = JSON.parse(localStorage.getItem('data'));
		if (token && jwtExpTime && jwtExpTime > Date.now() && data) {
			dispatch(
				allActions.userActions.login(
					token,
					jwtExpTime,
					data.id,
					data.name,
					data.email,
					data.avatarUrl
				)
			);
			dispatch(
				allActions.userActions.checkAuthTimeout(jwtExpTime - Date.now())
			);
		} else if (jwtExpTime && jwtExpTime < Date.now()) {
			dispatch(allActions.userActions.logout());
		}
	}, [dispatch]);

	let routes = (
		<Switch>
			<Route path='/auth' exact component={Auth} />
			<Route path='/logout' exact component={LogoutPage} />
			<Route
				path='/auth/confirm/:userId/:token'
				component={EmailConfirmStatus}
			/>
			<Redirect to='/auth' />
		</Switch>
	);

	if (isAuth) {
		routes = (
			<Switch>
				<Route path='/conversations' exact component={Conversations} />
				<Route path='/sent-requests' exact component={SentRequests} />
				<Route path='/received-requests' exact component={ReceivedRequests} />
				<Route path='/search-users' exact component={SearchUsers} />
				<Route path='/logout' exact component={LogoutPage} />
				<Redirect to='/conversations' />
			</Switch>
		);
	}

	return (
		<div>
			<Layout isAuth={isAuth}>{routes}</Layout>
		</div>
	);
};

export default withRouter(App);
