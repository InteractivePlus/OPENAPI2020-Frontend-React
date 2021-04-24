import { createAction } from 'redux-actions';

import {
    ACTIONTYPES
} from '../config/config.js';


export const showSpinner = createAction(ACTIONTYPES.SHOW_SPINNER);
export const hideSpinner = createAction(ACTIONTYPES.HIDE_SPINNER);
export const showLoading = createAction(ACTIONTYPES.SHOW_LOADING);
export const hideLoading = createAction(ACTIONTYPES.HIDE_LOADING);
export const setUi = createAction(ACTIONTYPES.SET_UI);
