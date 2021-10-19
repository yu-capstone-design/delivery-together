import { combineReducers } from 'redux';

/* state(상태) */
const authState = {
  user: {},
  joinError: '',
  loginError: '',
  isLoading: false,
};

/* reducer 함수 */
const auth = (state = authState, action) => {
  switch (action.type) {
    case 'JOIN_REQUEST':
      return { ...state, joinError: '', isLoading: true };

    case 'JOIN_SUCCESS':
      return { ...state, joinError: '', isLoading: false };

    case 'JOIN_FAILURE':
      const joinError = action.payload;
      return { ...state, joinError: joinError, isLoading: false };

    case 'LOGIN_REQUEST':
      return { ...state, loginError: '', isLoading: true };

    case 'LOGIN_SUCCESS':
      return { ...state, loginError: '', isLoading: false };

    case 'LOGIN_FAILURE':
      const loginError = action.payload;
      return { ...state, loginError: loginError, isLoading: false };

    case 'LOGOUT_REQUEST':
      return { ...state, user: {}, isLoading: false };

    case 'USER_DATA_REQUEST':
      return { ...state, user: action.payload, isLoading: false };

    default:
      return state;
  }
};

const rootReducer = combineReducers({ auth });

export default rootReducer;
