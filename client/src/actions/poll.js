import axios from 'axios';
import { GET_POLL , SET_POLLS,SET_CURRENT_POLL} from './actionTypes';


export const setPolls = polls => ({
  type: SET_POLLS,
  polls,
});

export const setCurrentPoll = poll => ({
  type: SET_CURRENT_POLL,
  poll,
});

export const getPoll = () => async dispatch => {
  const response =await axios.get(`/api/poll/`)
  if(response.data !== null ){
    dispatch({type: GET_POLL,payload: response.data})
  }
  else{
    dispatch({type:GET_POLL, payload:null})
  }
};
// export const createPoll =  async data => {
//   const poll = await axios.post('/', data);
//   return  dispatch => {
//     try {
//       console.log(poll)
//       dispatch(setCurrentPoll(poll));
//     } catch (err) {
//       const { error } = err.response.data;
//       dispatch(error);
//     }
//   };
// };

