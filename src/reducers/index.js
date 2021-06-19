import { combineReducers } from 'redux-immutable';
import user from './userReducers';
import ui from './uiReducers';
import userSignUp from './signUpReducers'
import userSignIn from './signInReducers'

const rootReducer = combineReducers({
    user,
    ui,
    userSignUp,
    userSignIn
});

export default rootReducer;
