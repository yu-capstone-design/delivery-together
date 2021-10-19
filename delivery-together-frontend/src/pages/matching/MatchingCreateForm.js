import React, { useState } from 'react';
import { Form, Col, Button, Row, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createMatching } from '../../api/matchingService';

const MatchingCreateForm = ({ user, ...props }) => {
  const [matching, setMatching] = useState({
    username: user.username,
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
    if (matching.title === '' || matching.category === '' || matching.money === '' || matching.content === '') return false;
    else return true;
  };

  /* 버튼 클릭 시 동작 정의(매칭 등록 기능) */
  const submitMatching = (e) => {
    e.preventDefault();

    let checked = checkForm();

    if (checked) {
      createMatching(matching)
        .then((res) => {
          if (res.status === 201) {
            return res.data;
          } else {
            return null;
          }
        })
        .then((res) => {
          console.log(res);
          if (res === '매칭 등록에 성공하였습니다.') {
            setMatching({ ...matching, title: '', category: '', money: '', content: '' });
            props.history.push('/matching');
          } else if (res === '이미 등록된 매칭이 존재합니다.') {
            alert('이미 등록된 매칭이 존재합니다.');
            setMatching({ ...matching, title: '', category: '', money: '', content: '' });
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
            <Form.Control type="text" onChange={changeValue} name="username" value={matching.username} readOnly={true} />
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
            <Button variant="success" type="submit">
              매칭 등록
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
};

/* store로부터 state를 가져와서 현재 컴포넌트의 props로 보냄 */
const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user,
  };
};

export default connect(mapStateToProps)(MatchingCreateForm);
