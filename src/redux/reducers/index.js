import { combineReducers } from 'redux';

import userReducer from './userReducer';
// At least 1 more reducer to follow...

const rootReducer = combineReducers({ user: userReducer });

export default rootReducer;
