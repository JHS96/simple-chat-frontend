import styles from './SideDrawer.module.css';

const SideDrawer = props => {
	const classes = [styles.SideDrawer];
	if (props.visible) {
		classes.push(styles.SideDrawerVisible);
	}

	return (
		<div
			className={classes.join(' ')}
			onClick={() => props.setVisible(!props.visible)}>
			<div className={styles.CloseIconContainer}>
				<p className={styles.Close}>Close</p>
			</div>
			<div className={styles.MenuItems}>{props.children}</div>
		</div>
	);
};

export default SideDrawer;
