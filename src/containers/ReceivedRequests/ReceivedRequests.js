import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Modal from '../../components/Modal/Modal';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import LoadingIndicator from '../../components/UI/LoadingIndicator/LoadingIndicator';
import Card from '../../components/Card/Card';
import CustomLink from '../../components/UI/CustomLink/CustomLink';
import Button from '../../components/UI/Button/Button';
import { useHttpClient } from '../../custom_hooks/http-hook';
import DefaultAvatar from '../../assets/images/default-avatar.png';
import styles from './ReceivedRequests.module.css';

const ReceivedRequests = () => {
	const [results, setResults] = useState([]);
	const user = useSelector(state => state.user);
	const { sendRequest, isLoading, error, clearError } = useHttpClient();

	useEffect(() => {
		const getReceivedRequests = async () => {
			try {
				const response = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/contact/received-requests`,
					'GET',
					null,
					{ Authorization: `Bearer ${user.token}` }
				);
				setResults(response.receivedRequests);
			} catch (err) {
				console.log(err);
			}
		};
		getReceivedRequests();
	}, [sendRequest, user.token]);

	const acceptRequestHandler = async (e, id) => {
		e.preventDefault();
		try {
			const body = JSON.stringify({ requestSenderId: id });
			await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/contact/add-contact`,
				'POST',
				body,
				{
					Authorization: `Bearer ${user.token}`,
					'Content-Type': 'application/json'
				}
			);
			const updatedReceivedRequests = results.filter(res => res.id !== id);
			setResults(updatedReceivedRequests);
		} catch (err) {
			console.log(err);
		}
	};

	const rejectReceivedRequestHandler = async (e, id) => {
		e.preventDefault();
		try {
			const body = JSON.stringify({ requestSenderId: id });
			await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/contact/delete-received-request`,
				'DELETE',
				body,
				{
					Authorization: `Bearer ${user.token}`,
					'Content-Type': 'application/json'
				}
			);
			const updatedReceivedRequests = results.filter(res => res.id !== id);
			setResults(updatedReceivedRequests);
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
			<h1 className={styles.Heading}>Received Requests</h1>
			<div className={styles.Container}>
				<div className={styles.ReceivedRequests}>
					{!isLoading && !results.length && (
						<p className={styles.Notice}>No received requests to display...</p>
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
							<div className={styles.RejectLink}>
								<CustomLink
									cssForCustLnk={['Text-Centered', 'Text-Normal', 'Text-Red']}
									text='Reject Request'
									clicked={e => rejectReceivedRequestHandler(e, res.id)}
								/>
							</div>
							<Button
								value='Accept Request'
								cssForButton={['Btn-Dark', 'Btn-Wide']}
								clicked={e => acceptRequestHandler(e, res.id)}
							/>
						</Card>
					))}
				</div>
				{isLoading && <LoadingIndicator size='LoaderLarge' />}
			</div>
		</React.Fragment>
	);
};

export default ReceivedRequests;
