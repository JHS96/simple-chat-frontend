import React from 'react';

const Layout = props => {
	return (
		<React.Fragment>
			<h1>Stuff that should be on every page goes here (like navigation).</h1>
			<main>{props.children}</main>
		</React.Fragment>
	);
};

export default Layout;
