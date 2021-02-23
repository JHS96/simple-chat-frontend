import ContextMenu from '../UI/ContextMenu/ContextMenu';
import styles from './NameTag.module.css';

const NameTag = props => (
	<div className={styles.Container}>
		<div className={styles.Tag} onClick={props.clicked}>
			<img
				src={props.contactAvatarUrl}
				alt='avatar'
				className={styles.Avatar}
			/>
			<p className={styles.Name}>{props.name}</p>
		</div>
		<ContextMenu menuStyle='Dots' />
	</div>
);

export default NameTag;
