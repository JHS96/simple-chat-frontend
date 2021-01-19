import * as actionTypes from '../actionTypes';

const login = (jwt, jwtExpireTime, id, name, email, url) => {
	return {
		type: actionTypes.LOGIN,
		token: jwt,
		expTime: jwtExpireTime,
		userId: id,
		userName: name,
		userEmail: email,
		avatarUrl: url
	};
};

const userAcions = {
	login
};

export default userAcions;
