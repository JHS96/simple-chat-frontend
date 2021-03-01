import React from 'react';

import SpeechBubble from '../UI/SpeechBubble/SpeechBubble';
import Button from '../UI/Button/Button';
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

	if (props.msgArr.length > 0) {
		return (
			<React.Fragment>
				{props.msgArr.map(msg => (
					<SpeechBubble
						key={msg._id}
						bubbleAlignRight={msg.senderName === 'Me' ? true : false}
						senderName={msg.senderName}
						date={new Date(msg.createdAt).toLocaleDateString()}
						time={new Date(msg.createdAt).toLocaleTimeString()}>
						{msg.message}
					</SpeechBubble>
				))}
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
						<Button cssForButton={['Btn-Safe', 'Btn-Medium']} value='Send' />
					</form>
				</div>
			</React.Fragment>
		);
	} else return null;
};

export default Thread;
