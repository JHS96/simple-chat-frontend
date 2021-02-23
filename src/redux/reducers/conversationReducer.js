import * as actionTypes from '../actionTypes';

const initialState = {
	conversations: [],
	selectedConversationId: null,
	thread: []
};

const conversations = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_CONVERSATIONS:
			return {
				...state,
				conversations: action.conversations
			};
		case actionTypes.SELECT_CONVERSATION:
			return {
				...state,
				selectedConversationId: action.selectedConversationId,
				thread: action.thread
			};
		case actionTypes.DELETE_MESSAGE ||
			actionTypes.DELETE_MESSAGE_FOR_BOTH ||
			actionTypes.STAR_MESSAGE:
			return {
				...state,
				thread: action.thread
			};
		default:
			return state;
	}
};

export default conversations;
