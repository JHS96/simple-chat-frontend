import React, { useState, useEffect } from 'react';

import Logo from '../Logo/Logo';
import { useHttpClient } from '../../custom_hooks/http-hook';
import LoadingIndicator from '../UI/LoadingIndicator/LoadingIndicator';
import Backdrop from '../UI/Backdrop/Backdrop';
import Modal from '../Modal/Modal';
import CustomLink from '../UI/CustomLink/CustomLink';
import styles from './EmailConfirmStatus.module.css';

const EmailConfirmStatus = props => {
	const [response, setResponse] = useState();
	const { sendRequest, isLoading, error } = useHttpClient();

	const userId = props.match.params.userId;
	const confirmationToken = props.match.params.token;

	useEffect(() => {
		const confirmEmail = async () => {
			try {
				const response = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/account/confirm-email/${userId}/${confirmationToken}`
				);
				setResponse(response.message);
			} catch (err) {
				setResponse(null);
				console.log(err);
			}
		};
		confirmEmail();
	}, [sendRequest, userId, confirmationToken]);

	const PageContent = () => {
		if (isLoading)
			return (
				<React.Fragment>
					<Logo />
					<LoadingIndicator size='LoaderLarge' />
				</React.Fragment>
			);
		else
			return (
				<div className={styles.Container}>
					<div className={styles.Logo}>
						<Logo />
					</div>
					<h1 className={styles.Heading}>{response}</h1>
					<CustomLink
						cssForCustLnk={['Text-Blue', 'Text-Bold', 'Text-Extra-Large']}
						text='Log In'
						clicked={() => props.history.push('/auth')}
					/>
				</div>
			);
	};

	return (
		<React.Fragment>
			{error ? (
				<Backdrop visible={error} clicked={() => props.history.push('/auth')} />
			) : null}
			{error ? (
				<Modal
					visible={error}
					header='Error...'
					btnClicked={() => props.history.push('/auth')}>
					<p className={styles.ErrorMsg}>{error}</p>
					<br />
					<p className={styles.Suggestion}>
						If you would like for us to resend a verification email to your
						email address, please follow the instrusctions below:
					</p>
					<div className={styles.OrderedList}>
						<ol>
							<li>
								Visit the <strong>"Log In"</strong> page, and switch to{' '}
								<strong>"Sign Up"</strong> mode.
							</li>
							<li>
								Click on the <strong>"Resend confirmation email..."</strong>{' '}
								link at the bottom.
							</li>
							<li>Enter the email address you used to sign up.</li>
							<li>
								Click the <strong>"Send Email"</strong> button.
							</li>
							<li>Check your email.</li>
						</ol>
					</div>
					<CustomLink
						cssForCustLnk={['Text-Blue', 'Text-Bold']}
						text='Back to Log In page...'
						clicked={() => props.history.push('/auth')}
					/>
				</Modal>
			) : null}
			<div className={styles.PageContent}>
				<PageContent />
			</div>
		</React.Fragment>
	);
};

export default EmailConfirmStatus;
