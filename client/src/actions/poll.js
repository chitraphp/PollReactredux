import axios from 'axios';
import { GET_POLL } from './actionTypes';

export const getPoll = () => async dispatch => {
  console.log("q1");
  await axios
    .get(`/api/poll/`)
    .then(res =>
      dispatch({
        type: GET_POLL,
        payload: res.data
      }))
    .catch(err =>
      dispatch({
        type: GET_POLL,
        payload: null
      })
    );
  
};