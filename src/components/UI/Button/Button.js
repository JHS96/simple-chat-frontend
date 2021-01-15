import styles from './Button.module.css';

const button = props => {
	const buttonClasses = [];
	if (props.cssForButton) {
		for (const cssClass of props.cssForButton)
			buttonClasses.push(styles[cssClass]);
	}

	return (
		<input
			className={buttonClasses.join(' ')}
			type='submit'
			value={props.value}
			onClick={props.clicked}
		/>
	);
};

export default button;
