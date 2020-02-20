import { combineReducers } from 'redux';

import errorsReducer from './errorsReducer';
import pollsReducer from './pollsReducer';

export default combineReducers({
  errors:errorsReducer,
  poll:pollsReducer
});