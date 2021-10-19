import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { readMatchingDetail } from '../../api/matchingService';
import { deleteMatching } from '../../api/matchingService';

const MatchingDetail = ({ user, ...props }) => {
  const username = props.match.params.username; // 게시글 작성자의 username
  const myUsername = user.username; // 로그인한 사용자의 username

  const [matching, setMatching] = useState({});

  useEffect(() => {
    readMatchingDetail(username)
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        setMatching(res);
      });
  }, []);

  const deleteButton = () => {
    deleteMatching(username)
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        if (res === username + '님의 매칭이 삭제되었습니다.') {
          alert('매칭이 삭제되었습니다.');
          props.history.push('/matching');
        } else alert('매칭 삭제에 실패하였습니다.');
      });
  };

  const updateButton = () => {
    props.history.push('/matchingUpdateForm/' + username);
  };

  return (
    <Container>
      <br />
      <div>
        <h1>{matching.title}</h1>
        <h3>{matching.username}</h3>
        <hr />
        <h5>카테고리 : {matching.category}</h5>
        <h5>최대 지불 가격 : {matching.money}원</h5>
        <hr />
        <h5>{matching.content}</h5>
        <hr />
        {username !== myUsername && <Button variant="success">매칭 신청</Button>}{' '}
        {username === myUsername && (
          <Button variant="primary" onClick={updateButton}>
            매칭 수정
          </Button>
        )}{' '}
        {username === myUsername && (
          <Button variant="danger" onClick={deleteButton}>
            매칭 삭제
          </Button>
        )}
      </div>
    </Container>
  );
};

/* store로부터 state를 가져와서 현재 컴포넌트의 props로 보냄 */
const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user,
  };
};

export default connect(mapStateToProps)(MatchingDetail);
