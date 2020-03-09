import {GET_ERRORS, SET_CURRENT_USER,SIGNED_IN,SIGNED_OUT} from './actionTypes';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

//Register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err => 
      dispatch(
        {
          type: GET_ERRORS,
          payload: err.response.data
        }
      ));
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
     // Save to localStorage
      const { token } = res.data;
    // Set token to ls
    localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
//google authentication  chitra
// export const googleLogin = (data) => async dispatch => {
//   console.log('token',data);
//   const res = await axios
//     .get('http://localhost:8000/api/users/google')
//     console.log('response',res)
// };

//udemy google oauth
export const signIn = user => async dispatch=> {
  console.log('userAction', user);
  await axios.post('api/users/gapiuser',user)
  .then(res=>dispatch({
    type: SIGNED_IN,
    payload: user
  }))
  .catch(err=>dispatch({
    type: SIGNED_IN,
    payload: null
  }))
  // return {
  //   type: SIGNED_IN,
  //   payload: user
  // };
};

export const signOut = () => {
  return {
    type: SIGNED_OUT
  };
};

