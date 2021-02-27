import React from 'react';

import SpeechBubble from '../UI/SpeechBubble/SpeechBubble';
import Button from '../UI/Button/Button';
import styles from './Thread.module.css';

const Thread = props => {
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
				<div className={styles.MsgInputContainer}>
					<input
						type='textarea'
						className={styles.MsgInput}
						placeholder='Write a message here...'
						value={props.userInput}
						onChange={event => props.setUserInput(event.target.value)}
					/>
					<Button
						cssForButton={['Btn-Safe', 'Btn-Medium']}
						value='Send'
						clicked={() =>
							props.sendMsgHandler(
								props.msgReceiverId,
								props.receiverConversationId,
								props.conversationId
							)
						}
					/>
				</div>
			</React.Fragment>
		);
	} else return null;
};

export default Thread;
