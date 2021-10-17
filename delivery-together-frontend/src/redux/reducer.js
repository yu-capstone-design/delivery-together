import { combineReducers } from 'redux';

/* state(상태) */
const authState = {
  user: {},
  error: '',
  isLoading: false,
  isLoggedIn: false,
};

/* reducer 함수 */
const auth = (state = authState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return { ...state, error: '', isLoading: true, isLoggedIn: false };

    case 'LOGIN_SUCCESS':
      return { ...state, error: '', isLoading: false, isLoggedIn: true };

    case 'LOGIN_FAILURE':
      const error = action.payload;
      return { ...state, error: error, isLoading: false, isLoggedIn: false };

    case 'LOGOUT_REQUEST':
      return { ...state, user: {}, error: '', isLoading: false, isLoggedIn: false };

    case 'USER_DATA_REQUEST':
      return { ...state, user: action.payload, error: '', isLoading: false, isLoggedIn: true };

    default:
      return state;
  }
};

const rootReducer = combineReducers({ auth });

export default rootReducer;
