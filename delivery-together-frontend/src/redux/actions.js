/* 로그인 요청에 대한 액션 */
export const authRequest = () => {
  return {
    type: 'AUTH_REQUEST',
  };
};

/* 로그인 인증 성공에 대한 액션 */
export const authSuccess = (content) => {
  localStorage.setItem('USER_KEY', content.token);
  return {
    type: 'AUTH_SUCCESS',
    payload: content,
  };
};

/* 로그인 인증 실패에 대한 액션 */
export const authFailure = (error) => {
  return {
    type: 'AUTH_FAILURE',
    payload: error,
  };
};
