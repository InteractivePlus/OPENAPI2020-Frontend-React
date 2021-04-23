import { combineReducers } from 'redux-immutable';
import user from './userReducers';


const rootReducer = combineReducers({
  user,
});

export default rootReducer;