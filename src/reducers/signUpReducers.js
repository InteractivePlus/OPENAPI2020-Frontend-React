import { handleActions } from 'redux-actions';
import { UiState } from '../models/models.js';

import {
    ACTIONTYPES
} from '../config/config.js';


const uiReducers = handleActions({
    [ACTIONTYPES.SHOW_SPINNER]: (state) => (
      state.set( 'spinnerVisible', true )
    ),
    [ACTIONTYPES.HIDE_SPINNER]: (state) => (
      state.set('spinnerVisible', false)
    ),
    [ACTIONTYPES.SHOW_LOADING]: (state) => (
        state.set('loadingVisible', true)
    ),
    [ACTIONTYPES.HIDE_LOADING]: (state) => (
        state.set('loadingVisible', false)
    ),
    [ACTIONTYPES.SET_UI]: (state, { payload }) => (
      state.set(payload.key, payload.value)
    ),
  }, UiState);

export default uiReducers;