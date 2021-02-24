import React, { useState } from 'react';

import Tooltip from '../Tooltip/Tooltip';
import styles from './ContextMenu.module.css';

const ContextMenu = props => {
	const [menuVisible, setMenuVisible] = useState(false);

	const menuBtnClasses = menuVisible
		? [styles.MenuBtn, styles.MenuBtnActive]
		: [styles.MenuBtn];

	if (props.menuStyle === 'Dots') {
		return (
			<React.Fragment>
				<div
					className={menuBtnClasses.join(' ')}
					onClick={() => setMenuVisible(() => !menuVisible)}>
					<div className={styles.Dot}></div>
					<div className={styles.Dot}></div>
					<div className={styles.Dot}></div>
					<div className={styles.DotMenu}>
						<Tooltip
							cssForContent={['Context-Menu-Style']}
							visible={menuVisible}>
							{props.menuItems}
						</Tooltip>
					</div>
				</div>
			</React.Fragment>
		);
	} else if (props.menuStyle === 'Arrow') {
		return (
			<React.Fragment>
				<div
					className={menuBtnClasses.join(' ')}
					onClick={() => setMenuVisible(!menuVisible)}>
					<div className={styles.LineLeft}></div>
					<div className={styles.LineRight}></div>
					<br />
					<div className={styles.ArrowMenu}>
						<Tooltip
							cssForContent={['Context-Menu-Style']}
							visible={menuVisible}>
							{props.menuItems}
						</Tooltip>
					</div>
				</div>
			</React.Fragment>
		);
	}
};

export default ContextMenu;
