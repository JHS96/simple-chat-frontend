import styles from './Tooltip.module.css';

const Tooltip = props => {
	// Add classes to the outer div based on props.cssTooltip (array)
	const tooltipClasses = [styles.Tooltip];
	if (props.cssForTooltip) {
		for (const cssClass of props.cssForTooltip) {
			tooltipClasses.push(styles[cssClass]);
		}
	}

	// Set visibility/invisibility based on props.visible
	const contentClasses = [];
	if (props.visible) {
		contentClasses.push(styles.TooltipVisible);
	}
	// Add classes to the inner (Content) span based on props.cssContent (array)
	if (props.cssForContent) {
		for (const cssClass of props.cssForContent) {
			contentClasses.push(styles[cssClass]);
		}
	}

	// Tooltip can also be used as a context/dropdown menu as it accepts props.children (menu items)
	return (
		<div className={tooltipClasses.join(' ')}>
			{props.optionalElement}
			<span className={contentClasses.join(' ')}>
				{props.text}
				{props.children}
			</span>
		</div>
	);
};

export default Tooltip;
