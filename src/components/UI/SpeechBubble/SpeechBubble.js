import ContextMenu from '../ContextMenu/ContextMenu';
import CustomLink from '../CustomLink/CustomLink';
import styles from './SpeechBubble.module.css';

const SpeechBubble = props => {
	const starOrUnstar = props.isStarred ? 'Unstar Message' : 'Star Message';

	const menuItems =
		props.timeInMilliSeconds + 1000 * 60 * 60 > Date.now() &&
		props.senderName === 'Me'
			? [
					{ label: 'Delete Message', handler: props.deleteMsgHandler },
					{ label: 'Delete for Both', handler: props.deleteMsgForBothHandler },
					{ label: starOrUnstar, handler: props.starUnstarHandler }
			  ]
			: [
					{ label: 'Delete Message', handler: props.deleteMsgHandler },
					{ label: starOrUnstar, handler: props.starUnstarHandler }
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
					id={props.msgId}
					setOpenContextMenuId={props.setOpenContextMenuId}
					shouldCloseMenu={props.shouldCloseMenu}
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
