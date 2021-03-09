import * as actionTypes from '../actionTypes';

const initialState = {
	conversations: [],
	selectedConversationId: null,
	msgReceiverId: null,
	receiverConversationId: null,
	contactName: null,
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
				msgReceiverId: action.msgReceiverId,
				receiverConversationId: action.receiverConversationId,
				contactName: action.contactName,
				thread: action.thread
			};
		case actionTypes.UPDATE_THREAD:
			return {
				...state,
				thread: action.thread
			};
		case actionTypes.ADD_MSG_TO_THREAD:
			return {
				...state,
				thread: [...state.thread, action.msg]
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
