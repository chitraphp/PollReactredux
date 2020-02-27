import { GET_POLLS,GET_POLL, SET_CURRENT_POLL } from '../actions/actionTypes';
const initialState = {
  poll:{},
  polls:[]
}
// Reducer that filters for one poll at a time
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
    case GET_POLLS:
      return {
        ...state,
        polls:action.payload
      }          
    default:
      return state;
  }
};

