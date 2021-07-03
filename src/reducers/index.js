import { combineReducers } from 'redux-immutable';
import user from './userReducers';
import ui from './uiReducers';
import userSignUp from './signUpReducers'
import userSignIn from './signInReducers'
import userVerify from './verifyReducers'
import userResetPwd from './resetPwdReducers'


const rootReducer = combineReducers({
    user,
    ui,
    userSignUp,
    userSignIn,
    userVerify,
    userResetPwd
});

export default rootReducer;
