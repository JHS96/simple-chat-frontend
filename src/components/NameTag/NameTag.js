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
		<div className={styles.MenuBtn}>
			<div className={styles.Dot}></div>
			<div className={styles.Dot}></div>
			<div className={styles.Dot}></div>
		</div>
	</div>
);

export default NameTag;
