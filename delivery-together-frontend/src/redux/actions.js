//==============================회원가입==============================
/* 회원가입 요청에 대한 액션 */
export const joinRequest = () => {
  return {
    type: 'JOIN_REQUEST',
  };
};

/* 회원가입 성공에 대한 액션 */
export const joinSuccess = () => {
  return {
    type: 'JOIN_SUCCESS',
  };
};

/* 회원가입 실패에 대한 액션 */
export const joinFailure = (error) => {
  return {
    type: 'JOIN_FAILURE',
    payload: error,
  };
};

//==============================로그인==============================
/* 로그인 요청에 대한 액션 */
export const loginRequest = () => {
  return {
    type: 'LOGIN_REQUEST',
  };
};

/* 로그인 인증 성공에 대한 액션 */
export const loginSuccess = (content) => {
  localStorage.setItem('USER_KEY', content.token);
  return {
    type: 'LOGIN_SUCCESS',
  };
};

/* 로그인 인증 실패에 대한 액션 */
export const loginFailure = (error) => {
  return {
    type: 'LOGIN_FAILURE',
    payload: error,
  };
};

//==============================로그아웃==============================
/* 로그아웃에 대한 액션 */
export const logoutRequest = () => {
  return {
    type: 'LOGOUT_REQUEST',
  };
};

//==============================사용자 정보==============================
/* 사용자 정보 요청에 대한 액션 */
export const userDataRequest = (content) => {
  return {
    type: 'USER_DATA_REQUEST',
    payload: content,
  };
};
