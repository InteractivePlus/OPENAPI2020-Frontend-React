import { handleActions } from 'redux-actions';
import { UserState } from '../models/models.js';

import {
    ACTIONTYPES,
    SIGNUPPAGE
} from '../config/config.js';

const userReducers = handleActions({
    [ACTIONTYPES.CLEAR_CAPTCHA]: (state) => (
        state.merge({
          captchaId: '',
          captchaImgBase64: ''
        })
    ),
    [ACTIONTYPES.GET_CAPTCHA]: (state) => (
        state.merge({
          captchaId: state.get('captchaId'),
          captchaImgBase64: state.get('captchaImgBase64')
        })
    ),
    [ACTIONTYPES.AUTH_START]: (state) => (
        state.merge({
          isAuthorized: false,
        })
    ),
    [ACTIONTYPES.AUTH_COMPLETE]: (state) => (
        state.merge({
          email: '',
          password: '',
          isAuthorized: true,
        })
    ),
    [ACTIONTYPES.AUTH_ERROR]: (state) => (
        state.merge({
          username: '',
          email: '',
          password: '',
          isAuthorized: false,
        })
    ),
    [ACTIONTYPES.START_LOGOUT]: (state) => (
        state.merge({
          isAuthorized: false,
        })
    ),
    [ACTIONTYPES.CHECK_AUTH]: (state) => (
        state.set('isAuthorized', true)
    ),
    [ACTIONTYPES.SET_USER]: (state, { payload }) => (
        state.set(payload.key, payload.value)
    ),


    
}, UserState);

export default userReducers;