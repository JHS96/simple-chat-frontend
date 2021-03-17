import ContextMenu from '../UI/ContextMenu/ContextMenu';
import CustomLink from '../UI/CustomLink/CustomLink';
import styles from './NameTag.module.css';

const NameTag = props => {
	// Temporary menuItems array for testing only.
	const menuItems = [
		'Download Conversation',
		'Delete Conversation',
		'Block User',
		'Unblock User'
	];

	const containerClasses = [styles.Container];
	const tagClasses = [styles.Tag];
	if (props.nameTagId === props.curChatId) {
		containerClasses.push(styles.NameTagActive);
		tagClasses.push(styles.NameTagActive);
	}

	return (
		<div className={containerClasses.join(' ')}>
			<div className={tagClasses.join(' ')} onClick={props.clicked}>
				<img
					src={props.contactAvatarUrl}
					alt='avatar'
					className={styles.Avatar}
				/>
				<p className={styles.Name}>{props.name}</p>
			</div>
			<ContextMenu
				menuStyle='Dots'
				menuItems={menuItems.map(item => (
					<CustomLink
						key={props.name + item} // TODO Create better keys when menuItems are implemented
						cssForCustLnk={['Text-Dark', 'Text-Medium']}
						text={item}
					/>
				))}
			/>
		</div>
	);
};

export default NameTag;
