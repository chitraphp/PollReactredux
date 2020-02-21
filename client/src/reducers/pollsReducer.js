import { SET_POLLS,GET_POLL, SET_CURRENT_POLL } from '../actions/actionTypes';
const initialState = {
  poll:{},
  polls:[]
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POLL:
      return {
        ...state,
        poll:action.payload};
    case SET_CURRENT_POLL:
      return {
        ...state,
        poll:action.payload
      }        
    default:
      return state;
  }
};
/********* 
export const currentPoll = (state = {}, action) => {
  switch (action.type) {
    case SET_CURRENT_POLL:
      return action.poll;
    default:
      return state;
  }
};********/