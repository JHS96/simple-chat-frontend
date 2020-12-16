import React from 'react';

import Toolbar from '../components/Navigation/Toolbar/Toolbar';

const Layout = props => {
	let toolbar = <Toolbar />;

	if (
		window.location.href === 'http://localhost:3000/' ||
		window.location.href === 'http://localhost:3000/signup' ||
		window.location.href === 'http://localhost:3000/login'
	) {
		toolbar = null;
	}

	return (
		<React.Fragment>
			{toolbar}
			<main>{props.children}</main>
		</React.Fragment>
	);
};

export default Layout;
