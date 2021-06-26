import { createAction } from 'redux-actions';
import {WebAPI} from '../utils/webAPI';


import {
    ACTIONTYPES
} from '../config/config.js';

export const setSignInPage = createAction(ACTIONTYPES.SET_SIGNIN_PAGE);
export const submitSignIn = createAction(ACTIONTYPES.SUBMIT_SIGNIN, WebAPI.submitSignIn);
