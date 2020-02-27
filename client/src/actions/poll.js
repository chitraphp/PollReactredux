import axios from 'axios';
import { GET_POLL,GET_POLLS, SET_POLLS,SET_CURRENT_POLL} from './actionTypes';


export const setPolls = polls => ({
  type: SET_POLLS,
  polls,
});

export const setCurrentPoll = poll => ({
  type: SET_CURRENT_POLL,
  poll
});
// ACTION TO GET A SINGLE POLL FROM DATABASE
export const getPoll = () => async dispatch => {
  const response =await axios.get(`/api/poll/`);
  if(response.data !== null ){
    dispatch({type: GET_POLL,payload: response.data})
  }
  else{
    dispatch({type:GET_POLL, payload:null})
  }
};

export const getPolls = () => async dispatch => {
  const response =await axios.get(`/api/poll/all`);
  if(response.data !== null ){
    dispatch({type: GET_POLLS,payload: response.data})
  }
  else{
    dispatch({type:GET_POLLS, payload:null})
  }
};


export const vote = (id,data) => async dispatch => {
  /**const response = await axios.post('/api/poll/vote/${id}',data);
  if(response.data !== null){
    dispatch({type:SET_CURRENT_POLL,payload:response.data})
  }
  else{
    dispatch({type:GET_POLL, payload:null})
  }***/
  await axios.post(`/api/poll/vote/${id}`,data)
  .then(res=>
    dispatch({
      type:SET_CURRENT_POLL,
      payload:res.data
    }))
    .catch(err=>
      dispatch({
      type:SET_CURRENT_POLL,
      payload:null
      }))
}

