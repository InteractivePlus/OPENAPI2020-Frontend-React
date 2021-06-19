import { createAction } from 'redux-actions';
import WebAPI from '../helpers/webAPI.js';

import {
    ACTIONTYPES
} from '../config/config.js';

export const getCaptcha = createAction(ACTIONTYPES.GET_CAPTCHA, WebAPI.getCaptcha);
export const verifyCaptcha = createAction(ACTIONTYPES.VERIFY_CAPTCHA, WebAPI.verifyCaptcha);

export const authStart = createAction(ACTIONTYPES.AUTH_START, WebAPI.login);
export const authComplete = createAction(ACTIONTYPES.AUTH_COMPLETE);
export const authError = createAction(ACTIONTYPES.AUTH_ERROR);
export const startLogout = createAction(ACTIONTYPES.START_LOGOUT, WebAPI.logout);
export const checkAuth = createAction(ACTIONTYPES.CHECK_AUTH);
export const setUser = createAction(ACTIONTYPES.SET_USER);

//export const setPage = createAction(ACTIONTYPES.SET_PAGE);
//export const setSignUpPage = createAction(ACTIONTYPES.SET_SIGNUP_PAGE);
