import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './NavItem.module.css';

const navItem = props => {
	const navItemStyle =
		props.navItemStyle === 'toolbarNavItems'
			? styles.ToolbarNavItem
			: styles.SideDrawerNavItem;

	return (
		<li className={navItemStyle}>
			<NavLink
				to={props.link}
				exact={props.exact}
				activeClassName={styles.active}>
				{props.children}
			</NavLink>
		</li>
	);
};

export default navItem;
