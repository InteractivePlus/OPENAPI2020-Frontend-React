import { combineReducers } from 'redux-immutable';
import user from './userReducers';
import ui from './uiReducers';
import userSignUp from './signUpReducers'

const rootReducer = combineReducers({
    user,
    ui,
    userSignUp
});

export default rootReducer;