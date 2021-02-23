import ContextMenu from '../ContextMenu/ContextMenu';
import CustomLink from '../CustomLink/CustomLink';
import styles from './SpeechBubble.module.css';

const SpeechBubble = props => {
	// Temporary menuItems array for testing only.
	const menuItems = ['Delete Message', 'Delete for Both', 'Star Message'];

	const bubbleAlignment = props.bubbleAlignRight
		? styles.AlignRight
		: styles.AlignLeft;

	return (
		<div className={bubbleAlignment}>
			<div>
				<p>{props.senderName}</p>
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
							cssForCustLnk={['Text-Dark', 'Text-Medium']}
							text={item}
						/>
					))}
				/>
			</div>
		</div>
	);
};

export default SpeechBubble;