import React from 'react';

import Toolbar from '../components/Navigation/Toolbar/Toolbar';

const Layout = props => {
	let toolbar = <Toolbar />;

	if (!props.isAuth) {
		toolbar = null; // Toolbar will be displayed for authenticated users only
	}

	return (
		<React.Fragment>
			{toolbar}
			<main>{props.children}</main>
		</React.Fragment>
	);
};

export default Layout;
