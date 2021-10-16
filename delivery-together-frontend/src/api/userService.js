import axios from 'axios';

const getToken = () => {
  return localStorage.getItem('USER_KEY');
};

/* 로그인 요청 */
export const userLogin = (user) => {
  return axios({
    method: 'POST',
    url: 'http://localhost:8080/auth/login',
    data: user,
  });
};

/* 사용자 정보 로드 */
export const loadUerData = () => {
  return axios({
    method: 'GET',
    url: 'http://localhost:8080/auth/userinfo',
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  });
};
