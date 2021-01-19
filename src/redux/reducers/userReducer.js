import * as actionTypes from '../actionTypes';

const initialState = {
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
				token: action.token,
				jwtExpireTime: action.expTime,
				userId: action.userId,
				userName: action.userName,
				userEmail: action.userEmail,
				avatarUrl: action.avatarUrl
			};
		default:
			return state;
	}
};

export default user;
