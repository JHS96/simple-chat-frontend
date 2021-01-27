import styles from './Backdrop.module.css';

const Backdrop = props => {
	const classes = [styles.Backdrop];
	if (props.visible) {
		classes.push(styles.Visible);
	}

	return <div className={classes.join(' ')} onClick={props.clicked}></div>;
};

export default Backdrop;
