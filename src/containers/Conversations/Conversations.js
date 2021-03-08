import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import openSocket from 'socket.io-client';

import { useHttpClient } from '../../custom_hooks/http-hook';
import Modal from '../../components/Modal/Modal';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import LoadingIndicator from '../../components/UI/LoadingIndicator/LoadingIndicator';
import AutoLogoutTime from '../../components/UI/AutoLogoutTime/AutoLogoutTime';
import NameTag from '../../components/NameTag/NameTag';
import DefaultAvatar from '../../assets/images/default-avatar.png';
import Thread from '../../components/Thread/Thread';
import styles from './Conversations.module.css';
import allActions from '../../redux/actions';

const Conversations = () => {
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);
	const conversations = useSelector(state => state.conversations);
	const { sendRequest, isLoading, error, clearError } = useHttpClient();
	const [userInput, setUserInput] = useState('');
	const [chatSelected, setChatSelected] = useState(false);
	// Below state prevents unneccesary extra renders of sent message caused by
	// potatntial extra rerender cycles.
	const [messageSent, setMessageSent] = useState(false);
	// Below state and helper function are only a utilitarian to prevent
	// the LoadingIndicator from being displayed every time a message is sent.
	const [loaderToDisplay, setLoaderToDisplay] = useState(true);
	const displayLoadingIndicator = () => {
		if (loaderToDisplay && isLoading) {
			return true;
		}
		return false;
	};

	// Automatically scroll to bottom of conversation thread after set time (500ms in this case);
	const scrollTimer = setTimeout(() => {
		const msgAreaDiv = document.getElementById('msgArea');
		if (msgAreaDiv) {
			msgAreaDiv.scrollTop = msgAreaDiv.scrollHeight;
		}
	}, 250);

	useEffect(() => {
		return clearTimeout(scrollTimer);
	}, [scrollTimer]);

	useEffect(() => {
		const getConversations = async () => {
			try {
				const response = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/messages/get-all-conversations`,
					'GET',
					null,
					{ Authorization: `Bearer ${user.token}` }
				);
				dispatch(
					allActions.conversationActions.setConversations(
						response.conversations
					)
				);
				setLoaderToDisplay(false);
			} catch (err) {
				console.log(err);
			}
		};
		getConversations();
	}, [sendRequest, user.token, dispatch]);

	const conversationHandler = async conversationId => {
		try {
			setChatSelected(true);

			// Establish and handle socket.io connection.
			const socket = openSocket(
				`${process.env.REACT_APP_BACKEND_URL}?chatId=${conversationId}`
			);
			socket.on('new-message', data => {
				if (!messageSent) {
					dispatch(allActions.conversationActions.addMsgToThread(data.message));
				}
				setMessageSent(true);
			});

			// Get details of selected conversation.
			const response = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/messages/get-conversation/${conversationId}`,
				'GET',
				null,
				{ Authorization: `Bearer ${user.token}` }
			);
			dispatch(
				allActions.conversationActions.selectConversation(
					conversationId,
					response.conversation.contactId,
					response.conversation.contactsConversationId,
					response.conversation.thread
				)
			);
		} catch (err) {
			console.log(err);
		}
	};

	const sendMessageHandler = async (
		msgReceiverId,
		receiverConversationId,
		conversationId
	) => {
		const body = JSON.stringify({
			msgReceiverId: msgReceiverId,
			receiverConversationId: receiverConversationId,
			senderConversationId: conversationId,
			msgBody: userInput
		});
		try {
			await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/messages/send-message`,
				'POST',
				body,
				{
					'Content-Type': 'application/json',
					Authorization: `Bearer ${user.token}`
				}
			);
		} catch (err) {
			console.log(err);
		}
		setUserInput('');
	};

	return (
		<div className={styles.MainArea}>
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
					{conversations.conversations.map(chat => (
						<NameTag
							key={chat._id}
							name={chat.contactName}
							contactAvatarUrl={
								chat.contactAvatarUrl ===
									process.env.REACT_APP_DEFAULT_AVATAR || !chat.contactAvatarUrl
									? DefaultAvatar
									: chat.contactAvatarUrl
							}
							clicked={() => conversationHandler(chat._id)}
						/>
					))}
				</div>
				<div className={styles.MsgArea} id='msgArea'>
					{displayLoadingIndicator() ? (
						<LoadingIndicator size='LoaderLarge' />
					) : (
						<Thread
							msgArr={conversations.thread}
							sendMsgHandler={sendMessageHandler}
							setUserInput={setUserInput}
							conversationId={conversations.selectedConversationId}
							msgReceiverId={conversations.msgReceiverId}
							receiverConversationId={conversations.receiverConversationId}
							userInput={userInput}
							userName={user.userName}
							conversationSelected={chatSelected}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default Conversations;
