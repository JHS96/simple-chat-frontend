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
	const threadCopy = [...state.thread];

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
			if (msgToUpdateIdx >= 0) {
				threadCopy[msgToUpdateIdx].message = action.alteredMsg;
			}
			return {
				...state,
				thread: threadCopy
			};

		case actionTypes.STAR_UNSTAR_MESSAGE:
			const msgToStarOrUnstar = state.thread.findIndex(
				msg => msg._id === action.msgId
			);
			if (msgToStarOrUnstar >= 0) {
				threadCopy[msgToStarOrUnstar].isStarred = !threadCopy[msgToStarOrUnstar]
					.isStarred;
			}
			return {
				...state,
				thread: threadCopy
			};
		default:
			return state;
	}
};

export default conversations;
