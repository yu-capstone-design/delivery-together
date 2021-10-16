import { combineReducers } from 'redux';

/* state(상태) */
const authState = {
  user: {},
  error: '',
  loading: false,
};

/* reducer 함수 */
const auth = (state = authState, action) => {
  switch (action.type) {
    case 'AUTH_REQUEST':
      return { ...state, error: '', loading: true };

    case 'AUTH_SUCCESS':
      const data = action.payload;
      return { ...state, error: '', loading: false, user: data };

    case 'AUTH_FAILURE':
      const error = action.payload;
      return { ...state, loading: false, error: error };

    default:
      return state;
  }
};

const rootReducer = combineReducers({ auth });

export default rootReducer;
