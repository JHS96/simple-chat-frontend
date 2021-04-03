import * as actionTypes from '../actionTypes';

const initialState = {
	isAuth: false,
	token: '',
	jwtExpireTime: '',
	userId: '',
	userName: '',
	userEmail: '',
	avatarUrl: ''
};

const user = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.LOGIN:
			return {
				...state,
				isAuth: true,
				token: action.token,
				jwtExpireTime: action.expTime,
				userId: action.userId,
				userName: action.userName,
				userEmail: action.userEmail,
				avatarUrl: action.avatarUrl
			};
		case actionTypes.LOGOUT:
			return {
				...state,
				token: '',
				isAuth: false,
				jwtExpireTime: '',
				userId: '',
				userName: '',
				userEmail: '',
				avatarUrl: ''
			};
		case actionTypes.UPDATE_AVATAR_URL:
			return {
				...state,
				avatarUrl: action.avatarUrl
			};
		default:
			return state;
	}
};

export default user;
