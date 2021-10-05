import React, { useState } from 'react';
import { Form, Col, Button, Row, Container } from 'react-bootstrap';

const MatchingCreateForm = (props) => {
  const [matching, setMatching] = useState({
    username: '',
    title: '',
    category: '',
    money: '',
    content: '',
    latitude: props.location.lat,
    longitude: props.location.lng,
    createdAt: Date.now().toString(),
  });

  const changeValue = (e) => {
    setMatching({
      ...matching,
      [e.target.name]: e.target.value,
    });
  };

  /* 매칭 등록 양식 검사 */
  const checkForm = () => {
    if (
      matching.username === '' ||
      matching.title === '' ||
      matching.category === '' ||
      matching.money === '' ||
      matching.content === ''
    )
      return false;
    else return true;
  };

  /* 버튼 클릭 시 동작 정의(매칭 등록 기능) */
  const submitMatching = (e) => {
    e.preventDefault();

    let checked = checkForm();

    if (checked) {
      fetch('http://localhost:8080/matching', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(matching),
      })
        .then((res) => {
          console.log(res.text());
          if (res.status === 201) {
            return res;
          } else {
            return null;
          }
        })
        .then((res) => {
          console.log(res);
          if (res != null) {
            alert('매칭 등록에 성공하였습니다.');
            setMatching({ ...matching, username: '', title: '', category: '', money: '', content: '' });
          } else {
            alert('매칭 등록에 실패하였습니다.');
          }
        });
    } else {
      alert('양식을 모두 입력해주세요.');
    }
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
              <Form.Check type="radio" label="한식" name="category" value="한식" checked={matching.category === '한식'} />
              <Form.Check type="radio" label="분식" name="category" value="분식" checked={matching.category === '분식'} />
              <Form.Check type="radio" label="디저트" name="category" value="디저트" checked={matching.category === '디저트'} />
            </Col>
            <Col sm={3}>
              <Form.Check type="radio" label="일식" name="category" value="일식" checked={matching.category === '일식'} />
              <Form.Check type="radio" label="치킨" name="category" value="치킨" checked={matching.category === '치킨'} />
              <Form.Check type="radio" label="중식" name="category" value="중식" checked={matching.category === '중식'} />
            </Col>
            <Col sm={3}>
              <Form.Check type="radio" label="피자" name="category" value="피자" checked={matching.category === '피자'} />
              <Form.Check type="radio" label="양식" name="category" value="양식" checked={matching.category === '양식'} />
              <Form.Check type="radio" label="야식" name="category" value="야식" checked={matching.category === '야식'} />
            </Col>
            <Col sm={10}></Col>
          </Form.Group>
        </fieldset>
        {/* 최대 지불가격 */}
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
          <Form.Label column sm={2}>
            최대 지불가격(원)
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="최대 지불가격(원)을 입력해주세요."
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
              매칭 등록
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default MatchingCreateForm;
