import styles from './CustomLink.module.css';

const CustomLink = props => {
	const customLinkClasses = [styles.CustomLink];

	if (props.cssForCustLnk) {
		for (const cssClass of props.cssForCustLnk) {
			customLinkClasses.push(styles[cssClass]);
		}
	}

	return (
		<p className={customLinkClasses.join(' ')} onClick={props.clicked}>
			{props.text}
		</p>
	);
};

export default CustomLink;
