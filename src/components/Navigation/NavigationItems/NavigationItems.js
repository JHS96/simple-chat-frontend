import React from 'react';

import NavItem from './NavItem/NavItem';
import classes from './NavigationItems.module.css';

const navigationItems = props => (
	<ul className={classes.NavigationItems}>
		<NavItem link='page1' exact={true}>Page 1</NavItem>
		<NavItem link='page2' exact={true}>Page 2</NavItem>
	</ul>
);

export default navigationItems;
