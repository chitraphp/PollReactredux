import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorsReducer from './errorsReducer';
import pollsReducer from './pollsReducer';

export default combineReducers({
  errors:errorsReducer,
  poll:pollsReducer,
  auth:authReducer
});