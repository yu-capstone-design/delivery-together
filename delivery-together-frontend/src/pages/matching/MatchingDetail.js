import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';

const MatchingDetail = (props) => {
  const username = props.match.params.username;

  const [matching, setMatching] = useState({});

  useEffect(() => {
    fetch('http://localhost:8080/matching/' + username)
      .then((res) => res.json())
      .then((res) => {
        setMatching(res);
      });
  }, []);

  const deleteMatching = () => {
    fetch('http://localhost:8080/matching/' + username, {
      method: 'DELETE',
    })
      .then((res) => res.text())
      .then((res) => {
        console.log(res);
        if (res === username + '님의 매칭이 삭제되었습니다.') {
          alert('매칭이 삭제되었습니다.');
          props.history.push('/');
        } else alert('매칭 삭제에 실패하였습니다.');
      });
  };

  const updateMathching = () => {
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
        <Button variant="dark">매칭 신청</Button>{' '}
        <Button variant="primary" onClick={updateMathching}>
          매칭 수정
        </Button>{' '}
        <Button variant="danger" onClick={deleteMatching}>
          매칭 삭제
        </Button>
      </div>
    </Container>
  );
};

export default MatchingDetail;
