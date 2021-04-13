import React, { useState } from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import SideDrawer from '../SideDrawer/SideDrawer';
import styles from './Toolbar.module.css';

const Toolbar = () => {
	const [isSideDrawerVisible, setIsSideDrawerVisible] = useState(false);

	const hamburgerBtnClickHandler = () => {
		setIsSideDrawerVisible(!isSideDrawerVisible);
	};

	return (
		<header className={styles.Toolbar}>
			<div className={styles.Logo}>
				<Logo />
			</div>
			<div className={styles.HamburgerBtn} onClick={hamburgerBtnClickHandler}>
				&#x2630;
			</div>
			<SideDrawer
				visible={isSideDrawerVisible}
				setVisible={setIsSideDrawerVisible}>
				<NavigationItems navItemStyle='sideDrawerNavItems' />
			</SideDrawer>
			<nav className={styles.NavItems}>
				<NavigationItems navItemStyle='toolbarNavItems' />
			</nav>
		</header>
	);
};

export default Toolbar;
