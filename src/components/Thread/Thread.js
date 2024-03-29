import React from 'react';

import SpeechBubble from '../UI/SpeechBubble/SpeechBubble';
import Button from '../UI/Button/Button';
import LoadingIndicator from '../UI/LoadingIndicator/LoadingIndicator';
import styles from './Thread.module.css';

const Thread = props => {
	const submitMsgHandler = event => {
		if (event) {
			event.preventDefault();
		}
		props.sendMsgHandler(
			props.msgReceiverId,
			props.receiverConversationId,
			props.conversationId
		);
	};

	const btn = props.isLoading ? (
		<LoadingIndicator size='LoaderMedium' />
	) : (
		<Button cssForButton={['Btn-Safe', 'Btn-Medium']} value='Send' />
	);

	return (
		<React.Fragment>
			{!props.conversationSelected && <h3>No chat selected...</h3>}
			{props.conversationSelected && <h3>Chat with: {props.contactName}</h3>}
			{props.conversationSelected && props.msgArr.length === 0 && (
				<h5>No messages to display...</h5>
			)}
			{props.msgArr.length > 0 && (
				<div>
					{props.msgArr.map(msg => (
						<SpeechBubble
							key={msg._id}
							msgId={msg._id}
							bubbleAlignRight={msg.senderId === props.userId ? true : false}
							senderName={msg.senderId === props.userId ? 'Me' : msg.senderName}
							date={new Date(msg.createdAt).toLocaleDateString()}
							time={new Date(msg.createdAt).toLocaleTimeString()}
							timeInMilliSeconds={new Date(msg.createdAt).getTime()}
							conversationId={props.conversationId}
							isStarred={msg.isStarred}
							setOpenContextMenuId={props.setOpenContextMenuId}
							shouldCloseMenu={props.shouldCloseMenu}
							deleteMsgHandler={props.deleteMsgHandler}
							deleteMsgForBothHandler={props.deleteMsgForBothHandler}
							starUnstarHandler={props.starUnstarHandler}>
							{msg.isStarred ? <div className={styles.Star}></div> : null}
							<p>{msg.message}</p>
						</SpeechBubble>
					))}
				</div>
			)}
			{props.conversationSelected && (
				<div>
					<form
						className={styles.MsgInputForm}
						onSubmit={event => submitMsgHandler(event)}>
						<input
							type='textarea'
							className={styles.MsgInput}
							placeholder='Write a message here...'
							value={props.userInput}
							onChange={event => props.setUserInput(event.target.value)}
						/>
						{btn}
					</form>
				</div>
			)}
		</React.Fragment>
	);
};

export default Thread;
