import React from 'react';

import Toolbar from '../components/Navigation/Toolbar/Toolbar';
import styles from './Layout.module.css';

const Layout = props => {
	return (
		<React.Fragment>
			{props.isAuth && <Toolbar />}
			<main className={props.isAuth ? styles.MainArea : null}>
				{props.children}
			</main>
		</React.Fragment>
	);
};

export default Layout;
