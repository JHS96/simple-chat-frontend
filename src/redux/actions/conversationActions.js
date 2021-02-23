import * as actionTypes from '../actionTypes';

const setConversations = conversations => {
	return {
		type: actionTypes.SET_CONVERSATIONS,
		conversations: conversations
	};
};

const selectConversation = (conversationId, thread) => {
	return {
		type: actionTypes.SELECT_CONVERSATION,
		conversationId: conversationId,
		thread: thread
	};
};

const conversationActions = {
	setConversations,
	selectConversation
};

export default conversationActions;
