import React from 'react';

import NavItem from './NavItem/NavItem';
import styles from './NavigationItems.module.css';

const NavigationItems = props => {
	const navItemStyle =
		props.navItemStyle === 'toolbarNavItems'
			? styles.ToolbarNav
			: styles.SideDrawerNav;

	return (
		<ul className={navItemStyle}>
			<NavItem
				link='conversations'
				exact={true}
				navItemStyle={props.navItemStyle}>
				Chats
			</NavItem>
			<NavItem
				link='sent-requests'
				exact={true}
				navItemStyle={props.navItemStyle}>
				Sent Requests
			</NavItem>
			<NavItem
				link='received-requests'
				exact={true}
				navItemStyle={props.navItemStyle}>
				Received Requests
			</NavItem>
			<NavItem
				link='search-users'
				exact={true}
				navItemStyle={props.navItemStyle}>
				Search Users
			</NavItem>
			<NavItem link='profile' exact={true} navItemStyle={props.navItemStyle}>
				Profile
			</NavItem>

			<a href='mailto:support@simplechat.online' className={styles.Mailto}>
				Support
			</a>

			<NavItem link='logout' exact={true} navItemStyle={props.navItemStyle}>
				Log Out
			</NavItem>
		</ul>
	);
};

export default NavigationItems;
