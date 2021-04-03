import * as actionTypes from '../actionTypes';

const loginStart = (jwt, jwtExpireTime, id, name, email, url) => {
	return dispatch => {
		dispatch(checkAuthTimeout(jwtExpireTime - Date.now()));
		dispatch(login(jwt, jwtExpireTime, id, name, email, url));
	};
};

const login = (jwt, jwtExpireTime, id, name, email, url) => {
	localStorage.setItem('token', jwt);
	localStorage.setItem('jwtExpireTime', jwtExpireTime);
	localStorage.setItem(
		'data',
		JSON.stringify({
			id: id,
			name: name,
			email: email,
			avatarUrl: url
		})
	);
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

const logout = () => {
	localStorage.removeItem('data');
	localStorage.removeItem('token');
	localStorage.removeItem('jwtExpireTime');
	return { type: actionTypes.LOGOUT };
};

const checkAuthTimeout = expireTime => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expireTime);
	};
};

const updateAvatarUrl = url => {
	return {
		type: actionTypes.UPDATE_AVATAR_URL,
		avatarUrl: url
	};
};

const userAcions = {
	loginStart,
	login,
	logout,
	checkAuthTimeout,
	updateAvatarUrl
};

export default userAcions;
