import React, { useEffect, useState } from 'react';
import { Form, Col, Button, Row, Container } from 'react-bootstrap';

const MatchingUpdateForm = (props) => {
  const username = props.match.params.username;

  const [matching, setMatching] = useState({});

  useEffect(() => {
    fetch('http://localhost:8080/matching/' + username)
      .then((res) => res.json())
      .then((res) => {
        setMatching(res);
      });
  }, []);

  const changeValue = (e) => {
    setMatching({
      ...matching,
      [e.target.name]: e.target.value,
    });
  };

  const submitMatching = (e) => {
    e.preventDefault();

    fetch('http://localhost:8080/matching/' + username, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(matching),
    })
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          return res.text();
        } else {
          return null;
        }
      })
      .then((res) => {
        if (res != null) {
          alert('매칭 정보 수정이 완료되었습니다.');
          props.history.push('/matching/' + username);
        } else {
          alert('매칭 정보 수정에 실패하였습니다.');
        }
      });
  };

  return (
    <Container>
      <Form onSubmit={submitMatching}>
        <br />
        {/* 사용자 이름 */}
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            사용자 이름
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="사용자 이름을 입력해주세요."
              onChange={changeValue}
              name="username"
              value={matching.username}
              readOnly={true}
            />
          </Col>
        </Form.Group>
        {/* 제목 */}
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            제목
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="제목을 입력해주세요."
              onChange={changeValue}
              name="title"
              value={matching.title}
            />
          </Col>
        </Form.Group>
        {/* 카테고리 */}
        <fieldset>
          <Form.Group as={Row} className="mb-3" onChange={changeValue}>
            <Form.Label as="legend" column sm={2}>
              카테고리
            </Form.Label>

            <Col sm={3}>
              <Form.Check type="radio" label="한식" name="category" value="한식" />
              <Form.Check type="radio" label="분식" name="category" value="분식" />
              <Form.Check type="radio" label="디저트" name="category" value="디저트" />
            </Col>
            <Col sm={3}>
              <Form.Check type="radio" label="일식" name="category" value="일식" />
              <Form.Check type="radio" label="치킨" name="category" value="치킨" />
              <Form.Check type="radio" label="중식" name="category" value="중식" />
            </Col>
            <Col sm={3}>
              <Form.Check type="radio" label="피자" name="category" value="피자" />
              <Form.Check type="radio" label="양식" name="category" value="양식" />
              <Form.Check type="radio" label="야식" name="category" value="야식" />
            </Col>
            <Col sm={10}></Col>
          </Form.Group>
        </fieldset>
        {/* 최대 지불가격 */}
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
          <Form.Label column sm={2}>
            최대 지불가격
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="최대 지불가격을 입력해주세요."
              onChange={changeValue}
              name="money"
              value={matching.money}
            />
          </Col>
        </Form.Group>
        {/* 내용 */}
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            내용
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="내용을 입력해주세요."
              onChange={changeValue}
              name="content"
              value={matching.content}
            />
          </Col>
        </Form.Group>
        {/* 버튼 */}
        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button variant="dark" type="submit">
              매칭 수정
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default MatchingUpdateForm;