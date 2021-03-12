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

		case actionTypes.DELETE_MESSAGE:
			return {
				...state,
				thread: state.thread.filter(msg => msg._id !== action.msgId)
			};

		case actionTypes.UPDATE_MESSAGE:
			const msgToUpdateIdx = state.thread.findIndex(
				msg => msg._id === action.msgId
			);
			const updatedThread = [...state.thread];
			if (msgToUpdateIdx >= 0) {
				updatedThread[msgToUpdateIdx].message = action.alteredMsg;
			}
			return {
				...state,
				thread: updatedThread
			};

		case actionTypes.STAR_MESSAGE:
			return {
				...state
			};
		default:
			return state;
	}
};

export default conversations;
