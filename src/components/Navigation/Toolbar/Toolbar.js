import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Toolbar.module.css';

const Toolbar = () => (
	<header className={classes.Toolbar}>
		<div className={classes.Logo}>
			<Logo />
		</div>
		<nav>
			<NavigationItems />
		</nav>
	</header>
);

export default Toolbar;
