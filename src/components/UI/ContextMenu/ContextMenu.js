import React, { useState } from 'react';

import Tooltip from '../Tooltip/Tooltip';
import styles from './ContextMenu.module.css';

const ContextMenu = props => {
	const [menuVisible, setMenuVisible] = useState(false);

	const menuBtnClasses = menuVisible
		? [styles.MenuBtn, styles.MenuBtnActive]
		: [styles.MenuBtn];

	// If any context menu is visible & it should be closed (based on props.shouldCloseMenu)
	// then set menu visibility to false
	if (menuVisible && props.shouldCloseMenu) {
		setMenuVisible(false);
	}

	// If the target menu has an id, set its visibility to true and register the id in conteiner
	// component's state
	const menuVisibilityHandler = e => {
		if (e.target.id && props.setOpenContextMenuId) {
			props.setOpenContextMenuId(e.target.id);
			setMenuVisible(true);
		}
	};

	if (props.menuStyle === 'Dots') {
		return (
			<React.Fragment>
				<div
					id={props.id}
					className={menuBtnClasses.join(' ')}
					onClick={e => menuVisibilityHandler(e)}>
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
					id={props.id}
					className={menuBtnClasses.join(' ')}
					onClick={e => menuVisibilityHandler(e)}>
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
