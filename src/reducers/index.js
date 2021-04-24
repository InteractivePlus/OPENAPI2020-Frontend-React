import { combineReducers } from 'redux-immutable';
import user from './userReducers';
import ui from './uiReducers';

const rootReducer = combineReducers({
    user,
    ui,
});

export default rootReducer;