import React from 'react';

import NavItem from './NavItem/NavItem';
import classes from './NavigationItems.module.css';

const NavigationItems = props => {
	return (
		<ul className={classes.NavigationItems}>
			<NavItem link='conversations' exact={true}>
				Chats
			</NavItem>
			<NavItem link='sent-requests' exact={true}>
				Sent Requests
			</NavItem>
			<NavItem link='received-requests' exact={true}>
				Received Requests
			</NavItem>
			<NavItem link='search-users' exact={true}>
				Search Users
			</NavItem>
			<NavItem link='profile' exact={true}>
				Profile
			</NavItem>
			<NavItem link='logout' exact={true}>
				Log Out
			</NavItem>
		</ul>
	);
};

export default NavigationItems;
