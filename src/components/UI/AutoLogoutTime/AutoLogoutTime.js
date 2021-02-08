import styles from './AutoLogoutTime.module.css';

const AutoLogoutTime = props => (
	<p className={styles.AutoLogoutTime}>
		For security reasons, you will automatically be logged out on:{' '}
		<span className={styles.Time}>
			{new Date(parseInt(props.time)).toLocaleString()}
		</span>
	</p>
);

export default AutoLogoutTime;
