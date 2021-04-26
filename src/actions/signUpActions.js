import { createAction } from 'redux-actions';
import WebAPI from '../helpers/webAPI.js';

import {
    ACTIONTYPES
} from '../config/config.js';
import webAPI from '../helpers/webAPI.js';


export const setPage = createAction(ACTIONTYPES.SET_PAGE);
export const setSignUpForm = createAction(ACTIONTYPES.SET_SIGNUP_FORM);
export const startSignUp = createAction(ACTIONTYPES.START_SIGNUP, webAPI.startSignUp);
