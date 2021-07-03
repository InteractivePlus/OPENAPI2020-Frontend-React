import { createAction } from 'redux-actions';
import {WebAPI} from '../utils/webAPI';


import {
    ACTIONTYPES
} from '../config/config.js';

export const setResetPwdPage = createAction(ACTIONTYPES.SET_RESETPWD_PAGE);
export const getResetPwdVCode = createAction(ACTIONTYPES.SUBMIT_RESETPWD_VCODE, WebAPI.getResetPwdVCode);
export const submitResetPwd = createAction(ACTIONTYPES.SUBMIT_RESETPWD_NEW, WebAPI.submitResetPwd);
