import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useHttpClient } from '../../custom_hooks/http-hook';
import Modal from '../../components/Modal/Modal';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import LoadingIndicator from '../../components/UI/LoadingIndicator/LoadingIndicator';
import AutoLogoutTime from '../../components/UI/AutoLogoutTime/AutoLogoutTime';
import NameTag from '../../components/NameTag/NameTag';
import DefaultAvatar from '../../assets/images/default-avatar.png';
import styles from './Conversations.module.css';

const Conversations = () => {
	const user = useSelector(state => state.user);
	const [conversations, setConversations] = useState([]);
	const { sendRequest, isLoading, error, clearError } = useHttpClient();

	useEffect(() => {
		const getConversations = async () => {
			try {
				const response = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/messages/get-all-conversations`,
					'GET',
					null,
					{ Authorization: `Bearer ${user.token}` }
				);
				setConversations(response.conversations);
				console.log(response);
			} catch (err) {
				console.log(err);
			}
		};
		getConversations();
	}, [sendRequest, user.token]);

	return (
		<div>
			{error ? (
				<Modal
					visible={error}
					header='Error...'
					btnClicked={() => clearError()}>
					{error}
				</Modal>
			) : null}

			{error ? <Backdrop visible={error} clicked={() => clearError()} /> : null}
			<h1 className={styles.Header}>{`Welcome ${user.userName}`}</h1>
			<AutoLogoutTime time={user.jwtExpireTime} />
			{isLoading ? <LoadingIndicator size='LoaderLarge' /> : null}

			{!isLoading ? (
				<React.Fragment>
					<div className={styles.Devider}></div>
					<div className={styles.Container}>
						<div className={styles.NameTagArea}>
							{conversations.map(chat => (
								<NameTag
									key={chat._id}
									name={chat.contactName}
									contactAvatarUrl={
										chat.contactAvatarUrl ===
											process.env.REACT_APP_DEFAULT_AVATAR ||
										!chat.contactAvatarUrl
											? DefaultAvatar
											: chat.contactAvatarUrl
									}
									clicked={() => console.log(chat._id)}
								/>
							))}
						</div>
						<div className={styles.MsgArea}>
							<h2>Messages</h2>
						</div>
					</div>
				</React.Fragment>
			) : null}
		</div>
	);
};

export default Conversations;
