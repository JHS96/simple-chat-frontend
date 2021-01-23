import React from 'react';

import NavItem from './NavItem/NavItem';
import classes from './NavigationItems.module.css';

const NavigationItems = props => {
	return (
		<ul className={classes.NavigationItems}>
			<NavItem link='page1' exact={true}>
				Page 1
			</NavItem>
			<NavItem link='page2' exact={true}>
				Page 2
			</NavItem>
			<NavItem link='logout' exact={true}>
				Log Out
			</NavItem>
		</ul>
	);
};

export default NavigationItems;
