import { combineReducers } from 'redux';

import userReducer from './userReducer';
import conversationReducer from './conversationReducer';

const rootReducer = combineReducers({
	user: userReducer,
	conversations: conversationReducer
});

export default rootReducer;
