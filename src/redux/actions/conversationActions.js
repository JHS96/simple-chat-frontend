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
	contactName,
	thread
) => {
	return {
		type: actionTypes.SELECT_CONVERSATION,
		selectedConversationId: conversationId,
		msgReceiverId: msgReceiverId,
		receiverConversationId: receiverConversationId,
		contactName: contactName,
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

const deleteMessage = msgId => {
	return {
		type: actionTypes.DELETE_MESSAGE,
		msgId: msgId
	};
};

const updateMessage = (msgId, alteredMsg) => {
	return {
		type: actionTypes.UPDATE_MESSAGE,
		msgId: msgId,
		alteredMsg: alteredMsg
	};
};

const conversationActions = {
	setConversations,
	selectConversation,
	updateThread,
	addMsgToThread,
	deleteMessage,
	updateMessage
};

export default conversationActions;
