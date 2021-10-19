import axios from 'axios';

/* 매칭 등록 요청 */
export const createMatching = (matching) => {
  return axios({
    method: 'POST',
    url: 'http://localhost:8080/matching',
    data: matching,
  });
};

/* 매칭 목록 조회 요청 */
export const readMatchingList = () => {
  return axios({
    method: 'GET',
    url: 'http://localhost:8080/matching',
  });
};

/* 매칭 상세 조회 요청 */
export const readMatchingDetail = (username) => {
  return axios({
    method: 'GET',
    url: 'http://localhost:8080/matching/' + username,
  });
};

/* 매칭 수정 요청 */
export const updateMatching = (username, matching) => {
  return axios({
    method: 'PUT',
    url: 'http://localhost:8080/matching/' + username,
    data: matching,
  });
};

/* 매칭 삭제 요청 */
export const deleteMatching = (username) => {
  return axios({
    method: 'DELETE',
    url: 'http://localhost:8080/matching/' + username,
  });
};
