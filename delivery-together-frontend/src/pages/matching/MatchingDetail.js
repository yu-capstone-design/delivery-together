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

  console.log(matching);

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
        <br />
        <br />
        <hr />
        <Button variant="primary">수정</Button> <Button variant="danger">삭제</Button>
      </div>
    </Container>
  );
};

export default MatchingDetail;
