import { useEffect, useState, useRef } from 'react';
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
	const chatId = useRef();
	const [openContextMenuId, setOpenContextMenuId] = useState();
	const [shouldCloseMenu, setShouldCloseMenu] = useState(false);

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
		return () => clearTimeout(scrollTimer);
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

	// Register event listener on window to allow closing of open context menu when
	// user clicks away from menu. Also clean up event listeners as required.
	useEffect(() => {
		window.addEventListener('click', closeContextMenu);
		return () => window.removeEventListener('click', closeContextMenu);
	});

	// If an openContextMenuId is set then a context menu is open. If the next detected
	// click event.target.id doesn't match the openContextMenuId, then let the component
	// know that the menu should be closed.
	// Then setShouldCloseMenu() to false again to reset the logic.
	const closeContextMenu = e => {
		if (openContextMenuId) {
			if (!e.target.id || e.target.id !== openContextMenuId) {
				setShouldCloseMenu(true);
				setOpenContextMenuId(undefined);
			}
		}
		setShouldCloseMenu(false);
	};

	const conversationHandler = async conversationId => {
		chatId.current = conversationId;
		try {
			setChatSelected(true);

			// Establish and handle socket.io connection.
			const socket = openSocket(
				`${process.env.REACT_APP_BACKEND_URL}?chatId=${conversationId}`
			);
			socket.on('new-message', data => {
				if (
					data.message.msgCopyOwner === user.userId &&
					data.message.belongsToConversationId === chatId.current
				) {
					dispatch(allActions.conversationActions.addMsgToThread(data.message));
				}
			});
			socket.on('alter-message', data => {
				if (data.alteredMsg.msgCopyOwner === user.userId) {
					dispatch(
						allActions.conversationActions.updateMessage(
							data.alteredMsg._id,
							'Message deleted my sender...'
						)
					);
				}
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
					response.conversation.contactName,
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
			const response = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/messages/send-message`,
				'POST',
				body,
				{
					'Content-Type': 'application/json',
					Authorization: `Bearer ${user.token}`
				}
			);
			dispatch(
				allActions.conversationActions.addMsgToThread(response.senderMsgCopy)
			);
		} catch (err) {
			console.log(err);
		}
		setUserInput('');
	};

	const deleteMsgHandler = async (conversationId, messageId) => {
		const body = JSON.stringify({
			conversationId: conversationId,
			messageId: messageId
		});
		try {
			await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/messages/delete-message`,
				'DELETE',
				body,
				{
					'Content-Type': 'application/json',
					Authorization: `Bearer ${user.token}`
				}
			);
			dispatch(allActions.conversationActions.deleteMessage(messageId));
		} catch (err) {
			console.log(err);
		}
	};

	const deleteMsgForBothHandler = async (conversationId, messageId) => {
		const body = JSON.stringify({
			conversationId: conversationId,
			messageId: messageId
		});
		try {
			await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/messages/delete-message-for-both`,
				'DELETE',
				body,
				{
					'Content-Type': 'application/json',
					Authorization: `Bearer ${user.token}`
				}
			);
		} catch (err) {
			console.log(err);
		}
		dispatch(allActions.conversationActions.deleteMessage(messageId));
	};

	const starUnstarHandler = async (conversationId, messageId) => {
		const body = JSON.stringify({ messageId: messageId });
		try {
			sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/messages/toggle-star`,
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
		dispatch(allActions.conversationActions.starUnstarMessage(messageId));
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
							nameTagId={chat._id}
							curChatId={chatId.current}
							name={chat.contactName}
							contactAvatarUrl={
								chat.contactAvatarUrl ===
									process.env.REACT_APP_DEFAULT_AVATAR || !chat.contactAvatarUrl
									? DefaultAvatar
									: chat.contactAvatarUrl
							}
							clicked={() => conversationHandler(chat._id)}
							setOpenContextMenuId={setOpenContextMenuId}
							shouldCloseMenu={shouldCloseMenu}
							setShouldCloseMenu={setShouldCloseMenu}
						/>
					))}
				</div>
				<div className={styles.MsgArea} id='msgArea'>
					{displayLoadingIndicator() ? (
						<LoadingIndicator size='LoaderLarge' />
					) : (
						<Thread
							msgArr={conversations.thread}
							isLoading={isLoading}
							sendMsgHandler={sendMessageHandler}
							setUserInput={setUserInput}
							conversationId={conversations.selectedConversationId}
							msgReceiverId={conversations.msgReceiverId}
							receiverConversationId={conversations.receiverConversationId}
							userInput={userInput}
							userName={user.userName}
							conversationSelected={chatSelected}
							contactName={conversations.contactName}
							deleteMsgHandler={deleteMsgHandler}
							deleteMsgForBothHandler={deleteMsgForBothHandler}
							starUnstarHandler={starUnstarHandler}
							setOpenContextMenuId={setOpenContextMenuId}
							shouldCloseMenu={shouldCloseMenu}
							setShouldCloseMenu={setShouldCloseMenu}
						/>
					)}
					<div className={styles.BottomSpacer}></div>
				</div>
			</div>
		</div>
	);
};

export default Conversations;
