import isEmpty from '../validation/is-empty';

import { SET_CURRENT_USER, SIGNED_IN,SIGNED_OUT } from '../actions/actionTypes';

const initialState = {
  isAuthenticated: false,
  isSignedIn:null,
  user: {}
};


export default function(state = initialState, action) {
  switch(action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
      case SIGNED_IN:
      return {
        ...state,
        isSignedIn:true, user:action.payload
      };
      case SIGNED_OUT:
      return {
        ...state,
        isSignedIn:false, userId:null
      };
     default: 
      return state;
  }
}