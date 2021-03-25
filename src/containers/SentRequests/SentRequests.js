import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Modal from '../../components/Modal/Modal';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import LoadingIndicator from '../../components/UI/LoadingIndicator/LoadingIndicator';
import Card from '../../components/Card/Card';
import Button from '../../components/UI/Button/Button';
import { useHttpClient } from '../../custom_hooks/http-hook';
import DefaultAvatar from '../../assets/images/default-avatar.png';
import styles from './SentRequests.module.css';

const SentRequests = () => {
	const [results, setResults] = useState([]);
	const user = useSelector(state => state.user);
	const { sendRequest, isLoading, error, clearError } = useHttpClient();

	useEffect(() => {
		const getSentRequests = async () => {
			try {
				const response = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/contact/sent-requests`,
					'GET',
					null,
					{ Authorization: `Bearer ${user.token}` }
				);
				setResults(response.sentRequests);
			} catch (err) {
				console.log(err);
			}
		};
		getSentRequests();
	}, [sendRequest, user.token]);

	const deleteSentRequestHandler = async (e, id) => {
		e.preventDefault();
		try {
			const body = JSON.stringify({ requestReceiverId: id });
			await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/contact/delete-sent-request`,
				'DELETE',
				body,
				{
					Authorization: `Bearer ${user.token}`,
					'Content-Type': 'application/json'
				}
			);
			const updatedSentRequests = results.filter(res => res.id !== id);
			setResults(updatedSentRequests);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<React.Fragment>
			{error && (
				<Modal
					visible={error}
					header='Error...'
					btnClicked={() => clearError()}>
					{error}
				</Modal>
			)}
			{error && <Backdrop visible={error} clicked={() => clearError()} />}
			<h1 className={styles.Heading}>Sent Requests</h1>
			<div className={styles.Container}>
				<div className={styles.SentRequests}>
					{!isLoading && !results.length && (
						<p className={styles.Notice}>No sent requests to display...</p>
					)}
					{results.map(res => (
						<Card
							key={res.id}
							userName={res.name}
							userId={res.id}
							avatarUrl={
								res.avatarUrl === process.env.REACT_APP_DEFAULT_AVATAR ||
								!res.avatarUrl
									? DefaultAvatar
									: res.avatarUrl
							}>
							<br />
							<Button
								value='Cancel Request'
								cssForButton={['Btn-Dark', 'Btn-Wide']}
								clicked={e => deleteSentRequestHandler(e, res.id)}
							/>
						</Card>
					))}
				</div>
				{isLoading && <LoadingIndicator size='LoaderLarge' />}
			</div>
		</React.Fragment>
	);
};

export default SentRequests;
