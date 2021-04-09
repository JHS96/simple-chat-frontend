import ContextMenu from '../UI/ContextMenu/ContextMenu';
import CustomLink from '../UI/CustomLink/CustomLink';
import styles from './NameTag.module.css';

const NameTag = props => {
	const menuItems = [
		{
			text: 'Download Conversation',
			handler: props.downloadConversationHandler
		},
		{ text: 'Delete Conversation', handler: props.deleteConversationHandler },
		{ text: 'Delete All Messages', handler: props.deleteAllMsgHandler },
		{
			text: 'Delete All Messages Except Sarred',
			handler: props.deleteAllButStarredHandler
		}
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
				id={props.nameTagId}
				setOpenContextMenuId={props.setOpenContextMenuId}
				shouldCloseMenu={props.shouldCloseMenu}
				menuStyle='Dots'
				menuItems={menuItems.map(item => (
					<CustomLink
						key={item.text + props.nameTagId}
						cssForCustLnk={['Text-Dark', 'Text-Medium']}
						text={item.text}
						clicked={()=>item.handler(props.nameTagId)}
					/>
				))}
			/>
		</div>
	);
};

export default NameTag;
