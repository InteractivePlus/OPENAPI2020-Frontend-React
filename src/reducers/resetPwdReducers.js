import { handleActions } from 'redux-actions';
import { UserResetPwdState } from '../models/models.js';

import {
    ACTIONTYPES
} from '../config/config.js';

const resetPwdReducers = handleActions({
    [ACTIONTYPES.SET_RESETPWD_PAGE]: (state, {payload}) => (
        state.set('page', payload.value)
    ),

}, UserResetPwdState);

export default resetPwdReducers;