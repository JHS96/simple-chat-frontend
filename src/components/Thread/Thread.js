import React, { useState } from 'react';

import SpeechBubble from '../UI/SpeechBubble/SpeechBubble';
import Button from '../UI/Button/Button';
import styles from './Thread.module.css';

const Thread = props => {
	const [userInput, setUserInput] = useState('');

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
						value={userInput}
						onChange={event => setUserInput(event.target.value)}
					/>
					<Button
						cssForButton={['Btn-Safe', 'Btn-Medium']}
						value='Send'
						clicked={() => console.log(userInput)}
					/>
				</div>
			</React.Fragment>
		);
	} else return null;
};

export default Thread;
