import { handleActions } from 'redux-actions';
import { UserSignInState } from '../models/models.js';

import {
    ACTIONTYPES
} from '../config/config.js';

const signInReducers = handleActions({
    [ACTIONTYPES.SET_SIGNIN_PAGE_START]: (state) => (
        state.merge({
          page: 1
        })
    ),
    [ACTIONTYPES.SET_SIGNIN_PAGE]: (state, {payload}) => (
        state.set('page', payload.value)
    ),

}, UserSignInState);

export default signInReducers;