import ContextMenu from '../ContextMenu/ContextMenu';
import CustomLink from '../CustomLink/CustomLink';
import styles from './SpeechBubble.module.css';

const SpeechBubble = props => {
	const menuItems =
		props.timeInMilliSeconds + 1000 * 60 * 60 > Date.now() &&
		props.senderName === 'Me'
			? [
					{ label: 'Delete Message', handler: props.deleteMsgHandler },
					{ label: 'Delete for Both', handler: props.deleteMsgForBothHandler },
					{ label: 'Star Message', handler: props.starMsgHandler }
			  ]
			: [
					{ label: 'Delete Message', handler: props.deleteMsgHandler },
					{ label: 'Star Message', handler: props.starMsgHandler }
			  ];

	const bubbleAlignment = props.bubbleAlignRight
		? styles.AlignRight
		: styles.AlignLeft;

	return (
		<div className={bubbleAlignment}>
			<div className={styles.MsgDetails}>
				<p className={styles.Name}>{props.senderName}</p>
				<p className={styles.TimeDetails}>{props.date}</p>
				<p className={styles.TimeDetails}>{props.time}</p>
			</div>
			<div
				className={
					props.bubbleAlignRight ? styles.BubbleRight : styles.BubbleLeft
				}>
				{props.children}
				<ContextMenu
					menuStyle='Arrow'
					menuItems={menuItems.map(item => (
						<CustomLink
							key={item.label + ' ' + props.msgId}
							cssForCustLnk={['Text-Dark', 'Text-Medium']}
							text={item.label}
							clicked={() => item.handler(props.conversationId, props.msgId)}
						/>
					))}
				/>
			</div>
		</div>
	);
};

export default SpeechBubble;
