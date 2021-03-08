import * as actionTypes from '../actionTypes';

const setConversations = conversations => {
	return {
		type: actionTypes.SET_CONVERSATIONS,
		conversations: conversations
	};
};

const selectConversation = (
	conversationId,
	msgReceiverId,
	receiverConversationId,
	thread
) => {
	return {
		type: actionTypes.SELECT_CONVERSATION,
		selectedConversationId: conversationId,
		msgReceiverId: msgReceiverId,
		receiverConversationId: receiverConversationId,
		thread: thread
	};
};

const updateThread = thread => {
	return {
		type: actionTypes.UPDATE_THREAD,
		thread: thread
	};
};

const addMsgToThread = msg => {
	return {
		type: actionTypes.ADD_MSG_TO_THREAD,
		msg: msg
	};
};

const conversationActions = {
	setConversations,
	selectConversation,
	updateThread,
	addMsgToThread
};

export default conversationActions;
