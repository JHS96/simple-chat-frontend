import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useHttpClient } from '../../custom_hooks/http-hook';
import Modal from '../../components/Modal/Modal';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import LoadingIndicator from '../../components/UI/LoadingIndicator/LoadingIndicator';
import AutoLogoutTime from '../../components/UI/AutoLogoutTime/AutoLogoutTime';
import NameTag from '../../components/NameTag/NameTag';
import DefaultAvatar from '../../assets/images/default-avatar.png';
import Thread from '../../components/Thread/Thread';
import styles from './Conversations.module.css';

const Conversations = () => {
	const user = useSelector(state => state.user);
	const [conversations, setConversations] = useState([]);
	const [selectedConversationId, setSelectedConversationId] = useState();
	const [thread, setThread] = useState([]);
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
			} catch (err) {
				console.log(err);
			}
		};
		getConversations();
	}, [sendRequest, user.token]);

	const getConversationHandler = async conversationId => {
		try {
			const response = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/messages/get-conversation/${conversationId}`,
				'GET',
				null,
				{ Authorization: `Bearer ${user.token}` }
			);
			setThread(response.conversation.thread);
			setSelectedConversationId(conversationId);
		} catch (err) {
			console.log(err);
		}
	};

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
			<div className={styles.Devider}></div>

			<div className={styles.Container} id='container'>
				<div className={styles.NameTagArea}>
					{conversations.map(chat => (
						<NameTag
							key={chat._id}
							name={chat.contactName}
							contactAvatarUrl={
								chat.contactAvatarUrl ===
									process.env.REACT_APP_DEFAULT_AVATAR || !chat.contactAvatarUrl
									? DefaultAvatar
									: chat.contactAvatarUrl
							}
							clicked={() => getConversationHandler(chat._id)}
						/>
					))}
				</div>
				<div className={styles.MsgArea}>
					{isLoading ? (
						<LoadingIndicator size='LoaderLarge' />
					) : (
						<Thread msgArr={thread} conversationId={selectedConversationId} />
					)}
				</div>
			</div>
		</div>
	);
};

export default Conversations;
