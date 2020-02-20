import { SET_POLLS,GET_POLL, SET_CURRENT_POLL } from '../actions/actionTypes';
const initialState = {
  poll:{}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POLL:
      return {
        ...state,
        poll:action.payload};
    default:
      return state;
  }
};
