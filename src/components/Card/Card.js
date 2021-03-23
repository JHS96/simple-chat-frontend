import styles from './Card.module.css';

const Card = props => (
	<div className={styles.Container}>
		<div className={styles.ImageContainer}>
			<img className={styles.AvatarImg} src={props.avatarUrl} alt='avatar' />
		</div>
		<p className={styles.UserName}>{props.userName}</p>
		{props.children}
	</div>
);

export default Card;
