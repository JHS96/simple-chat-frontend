import React from 'react';

import SpeechBubble from '../UI/SpeechBubble/SpeechBubble';

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
			</React.Fragment>
		);
	} else return null;
};

export default Thread;
