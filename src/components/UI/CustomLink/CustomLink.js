import styles from './CustomLink.module.css';

const CustomLink = props => {
	let classes = '';

	if (props.danger) {
		classes = styles.CustomLink + ' ' + styles.Danger;
	} else classes = styles.CustomLink;

	return (
		<p className={classes} onClick={props.clicked}>
			{props.text}
		</p>
	);
};

export default CustomLink;
