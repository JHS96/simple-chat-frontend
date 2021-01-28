import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import CustomLink from '../UI/CustomLink/CustomLink';
import allActions from '../../redux/actions';

const LogoutPage = props => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(allActions.userActions.logout());
	}, [dispatch]);

	return (
		<React.Fragment>
			<h1>You are logged out.</h1>
			<h4>
				<CustomLink
					cssForCustLnk={['Text-Blue']}
					text='Log In'
					clicked={() => props.history.push('/auth')}
				/>
			</h4>
		</React.Fragment>
	);
};

export default LogoutPage;
