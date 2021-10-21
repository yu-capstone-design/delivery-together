import React, { useState } from 'react';
import { Form, Button, Spinner, Alert, Row } from 'react-bootstrap';
import Logo from '../../images/logo.png';
import { userJoin } from '../../api/userService';
import { connect } from 'react-redux';
import { joinRequest, joinSuccess, joinFailure } from '../../redux/actions';
import { Link } from 'react-router-dom';

const JoinForm = ({ error, isLoading, ...props }) => {
  const [user, setUser] = useState({
    username: '',
    birthdate: '',
    country: '',
    gender: '',
    password: '',
  });

  const changeValue = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  /* 회원가입 양식 검사 */
  const checkForm = () => {
    if (user.username === '' || user.birthdate === '' || user.country === '' || user.gender === '' || user.password === '')
      return false;
    else return true;
  };

  /* 회원가입 요청 */
  const submitJoin = (e) => {
    e.preventDefault();
    console.log(user);

    let checked = checkForm();

    if (checked) {
      props.joinRequest();

      userJoin(user)
        .then((res) => {
          if (res.status === 201) {
            props.joinSuccess();
            return res.data;
          } else {
            return null;
          }
        })
        .then((res) => {
          console.log(res);
          if (res === '회원가입에 성공하였습니다.') {
            alert('회원가입에 성공하였습니다.');
            setUser({ ...user, username: '', birthdate: '', country: '', gender: '', password: '' });
            props.history.push('/login');
          } else if (res === '중복된 계정의 회원이 존재합니다.') {
            props.joinFailure('중복된 계정의 회원이 존재합니다.');
            setUser({ ...user, username: '', birthdate: '', country: '', gender: '', password: '' });
          } else {
            props.joinFailure('회원가입에 실패하였습니다.');
            setUser({ ...user, username: '', birthdate: '', country: '', gender: '', password: '' });
          }
        });
    } else {
      props.joinFailure('양식을 모두 입력해주세요.');
    }
  };
  return (
    <div
      style={{
        height: '80%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img src={Logo} alt="로고" style={{ width: '30%' }} />
      <Form style={{ width: '25%' }} onSubmit={submitJoin}>
        {/* 이메일 */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control type="email" placeholder="이메일" onChange={changeValue} name="username" value={user.username} />
        </Form.Group>
        {/* 생년월일 */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="text"
            onFocus={(e) => {
              e.currentTarget.type = 'date';
              e.currentTarget.focus();
            }}
            onBlur={(e) => (e.currentTarget.type = 'text')}
            placeholder="생년월일"
            onChange={changeValue}
            name="birthdate"
            value={user.birthdate}
            class="form-control"
          ></Form.Control>
        </Form.Group>
        {/* 국적 */}
        <Form.Select className="mb-3" onChange={changeValue} name="country" value={user.country}>
          <option value="">국적</option>
          <option value="대한민국">대한민국</option>
          <option value="일본">일본</option>
          <option value="중국">중국</option>
          <option value="미국">미국</option>
          <option value="북한">북한</option>
        </Form.Select>
        {/* 성별 */}
        <Form.Group as={Row} className="mb-3" onChange={changeValue} style={{ flexFlow: 'row' }}>
          <Form.Label as="legend" column sm={4}>
            성별
          </Form.Label>
          <Row sm={3} style={{ justifyContent: 'center', alignContent: 'center' }}>
            <Form.Check type="radio" label="남자" name="gender" value="남자" checked={user.gender === '남자'} />
            <Form.Check type="radio" label="여자" name="gender" value="여자" checked={user.gender === '여자'} />
          </Row>
        </Form.Group>
        {/* 비밀번호 */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control type="password" placeholder="비밀번호" onChange={changeValue} name="password" value={user.password} />
        </Form.Group>
        {/* 버튼 */}
        <div className="d-grid gap-2">
          <Button variant="success" type="submit">
            회원가입 {isLoading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />}
          </Button>
          {error && <Alert variant="danger">{error}</Alert>}
        </div>
        <br />
        <div class="text-center">
          <text>이미 회원가입을 한 상태인가요? </text>
          <Link to="/login" style={{ textDecoration: 'none', color: 'black' }}>
            <b>로그인</b>
          </Link>
        </div>
      </Form>
    </div>
  );
};

/* store로부터 state를 가져와서 현재 컴포넌트의 props로 보냄 */
const mapStateToProps = ({ auth }) => {
  console.log('state : ', auth);
  return {
    error: auth.joinError,
    isLoading: auth.isLoading,
  };
};

/* 현재 컴포넌트가 store의 상태를 바꾸기 위해 dispatch를 사용할 수 있게 해줌 */
const mapDispatchToProps = (dispatch) => {
  return {
    joinRequest: () => dispatch(joinRequest()),
    joinSuccess: () => dispatch(joinSuccess()),
    joinFailure: (message) => dispatch(joinFailure(message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinForm);
