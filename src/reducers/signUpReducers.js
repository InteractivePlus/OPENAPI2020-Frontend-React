import { handleActions } from 'redux-actions';
import { UserSignUpState } from '../models/models.js';

import {
    ACTIONTYPES
} from '../config/config.js';

const signUpReducers = handleActions({
  // [ACTIONTYPES.SET_SIGNUP_PAGE]: (state) => (
  //     state.merge({
  //         page: state.get('page')
  //     })
  // ),
    [ACTIONTYPES.SET_SIGNUP_PAGE_START]: (state) => (
        state.merge({
          page: 1
        })
    ),
    [ACTIONTYPES.SET_SIGNUP_PAGE]: (state, {payload}) => (
        state.set('page', payload.value)
    ),
    // [ACTIONTYPES.SET_SIGNUP_FORM]: (state, {payload}) => (
    //     state.set([form.payload.key], { payload.value })
    // ),

    
}, UserSignUpState);

export default signUpReducers;