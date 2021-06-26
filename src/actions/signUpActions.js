import { createAction } from 'redux-actions';
import WebAPI from '../utils/webAPI';

import {
    ACTIONTYPES
} from '../config/config.js';

export const setSignUpPage = createAction(ACTIONTYPES.SET_SIGNUP_PAGE);
export const submitSignUp = createAction(ACTIONTYPES.SUBMIT_SIGNUP, WebAPI.submitSignUp);
