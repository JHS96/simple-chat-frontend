import styles from './LoadingIndicator.module.css';

const LoadingIndicator = props => (
	<div className={styles[props.size]}>Loading...</div>
);

export default LoadingIndicator;
