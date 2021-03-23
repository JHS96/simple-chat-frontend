import React from 'react';

import NavItem from './NavItem/NavItem';
import classes from './NavigationItems.module.css';

const NavigationItems = props => {
	return (
		<ul className={classes.NavigationItems}>
			<NavItem link='conversations' exact={true}>
				Chats
			</NavItem>
			<NavItem link='search-users' exact={true}>
				Search Users
			</NavItem>
			<NavItem link='logout' exact={true}>
				Log Out
			</NavItem>
		</ul>
	);
};

export default NavigationItems;
