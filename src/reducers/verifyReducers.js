import { handleActions } from 'redux-actions';
import { UserVerifyState } from '../models/models.js';

import {
    ACTIONTYPES
} from '../config/config.js';

const verifyReducers = handleActions({
    [ACTIONTYPES.SET_VERIFY_PAGE]: (state, {payload}) => (
        state.set('page', payload.value)
    ),

}, UserVerifyState);

export default verifyReducers;