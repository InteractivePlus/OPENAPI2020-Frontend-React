import { createAction } from 'redux-actions';
import {WebAPI} from '../utils/webAPI';


import {
    ACTIONTYPES
} from '../config/config.js';

export const setVerifyPage = createAction(ACTIONTYPES.SET_VERIFY_PAGE);
export const submitVerify = createAction(ACTIONTYPES.SUBMIT_VERIFY, WebAPI.verifyAccount);
