import styles from './Tooltip.module.css';

const Tooltip = props => (
	// Tooltip can also be used as a context/dropdown menu as it accepts props.children (menu items)
	<div className={styles.Tooltip}>
		{props.children}
		<span
			className={
				props.visible
					? `${styles.TooltipText} ${styles.TooltipVisible}`
					: styles.TooltipText
			}>
			{props.text}
		</span>
	</div>
);

export default Tooltip;
