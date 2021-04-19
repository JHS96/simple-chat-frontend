import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import CustomLink from '../UI/CustomLink/CustomLink';
import Logo from '../Logo/Logo';
import allActions from '../../redux/actions';
import styles from './LogoutPage.module.css';

const LogoutPage = props => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(allActions.userActions.logout());
	}, [dispatch]);

	return (
		<div className={styles.Container}>
			<div className={styles.Logo}>
				<Logo />
			</div>
			<h1 className={styles.Heading}>You are logged out.</h1>
			<h4 className={styles.LoginLink}>
				<CustomLink
					cssForCustLnk={['Text-Blue']}
					text='Log In'
					clicked={() => props.history.push('/auth')}
				/>
			</h4>
		</div>
	);
};

export default LogoutPage;
