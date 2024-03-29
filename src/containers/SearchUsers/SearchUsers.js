import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Modal from '../../components/Modal/Modal';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import LoadingIndicator from '../../components/UI/LoadingIndicator/LoadingIndicator';
import Button from '../../components/UI/Button/Button';
import Card from '../../components/Card/Card';
import { useHttpClient } from '../../custom_hooks/http-hook';
import DefaultAvatar from '../../assets/images/default-avatar.png';
import styles from './SearchUsers.module.css';

const SearchUsers = () => {
	const [userInput, setUserInput] = useState('');
	const [results, setResults] = useState([]);
	const [reqSentMsg, setReqSentMsg] = useState();
	const user = useSelector(state => state.user);
	const { sendRequest, isLoading, error, clearError } = useHttpClient();

	const searchHandler = async e => {
		const body = JSON.stringify({ searchTerm: userInput });
		e.preventDefault();
		try {
			const response = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/contact/search-users`,
				'POST',
				body,
				{
					Authorization: `Bearer ${user.token}`,
					'Content-Type': 'application/json'
				}
			);
			setResults(response.searchResult);
		} catch (err) {
			console.log(err);
		}
	};

	const requestContactHandler = async (e, id) => {
		e.preventDefault();
		try {
			const body = JSON.stringify({ requestReceiverId: id });
			const response = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/contact/request-contact`,
				'POST',
				body,
				{
					Authorization: `Bearer ${user.token}`,
					'Content-Type': 'application/json'
				}
			);
			setReqSentMsg(response.message);
		} catch (err) {
			console.log(err);
		}
	};

	const clearModalHandler = () => {
		clearError();
		setReqSentMsg(undefined);
	};

	return (
		<React.Fragment>
			{(error || reqSentMsg) && (
				<Modal
					visible={error || reqSentMsg}
					header={error ? 'Whoops...' : 'Success...'}
					btnClicked={clearModalHandler}>
					{error ? error : reqSentMsg}
				</Modal>
			)}
			{(error || reqSentMsg) && (
				<Backdrop visible={error || reqSentMsg} clicked={clearModalHandler} />
			)}
			<h1 className={styles.Heading}>Search Users</h1>
			<div className={styles.Container}>
				{isLoading ? (
					<LoadingIndicator size='LoaderLarge' />
				) : (
					<form className={styles.SearchForm}>
						<input
							className={styles.SearchTermInput}
							type='text'
							placeholder='Type a username here...'
							value={userInput}
							onChange={e => setUserInput(e.target.value)}
						/>
						<Button
							value='Search'
							cssForButton={['Btn-Dark', 'Btn-Medium']}
							clicked={e => searchHandler(e)}
						/>
					</form>
				)}
				<div className={styles.SearchResults}>
					{!isLoading && !results.length && (
						<p className={styles.Notice}>No search results to display...</p>
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
								value='Request Contact'
								cssForButton={['Btn-Dark', 'Btn-Wide']}
								clicked={e => requestContactHandler(e, res.id)}
							/>
						</Card>
					))}
				</div>
			</div>
		</React.Fragment>
	);
};

export default SearchUsers;
