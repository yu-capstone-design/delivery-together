import React, { useState } from 'react';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { loginRequest, loginSuccess, loginFailure } from '../../redux/actions';
import { userLogin } from '../../api/userService';
import Logo from '../../images/logo.png';

const LoginForm = ({ error, isLoading, ...props }) => {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const changeValue = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  /* 로그인 양식 검사 */
  const checkForm = () => {
    if (user.username === '' || user.password === '') return false;
    else return true;
  };

  /* 로그인 요청 메서드 */
  const submitLogin = (e) => {
    e.preventDefault();

    let checked = checkForm();

    if (checked) {
      props.loginRequest();

      userLogin(user)
        .then((res) => {
          if (res.status === 200) {
            props.loginSuccess(res.data);
            props.history.push('/profile');
          } else {
            props.loginFailure('로그인에 실패하였습니다.');
          }
        })
        .catch((err) => {
          if (err && err.response) {
            props.loginFailure('로그인에 실패하였습니다.');
          } else {
            props.loginFailure('로그인에 실패하였습니다.');
          }
        });
    } else {
      props.loginFailure('양식을 모두 입력해주세요.');
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
      <Form style={{ width: '25%' }} onSubmit={submitLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="이메일을 입력해주세요."
            onChange={changeValue}
            name="username"
            value={user.username}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="비밀번호를 입력해주세요."
            onChange={changeValue}
            name="password"
            value={user.password}
          />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button variant="success" type="submit">
            로그인 {isLoading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />}
          </Button>
          {error && <Alert variant="danger">{error}</Alert>}
        </div>
      </Form>
    </div>
  );
};

/* store로부터 state를 가져와서 현재 컴포넌트의 props로 보냄 */
const mapStateToProps = ({ auth }) => {
  console.log('state : ', auth);
  return {
    error: auth.loginError,
    isLoading: auth.isLoading,
  };
};

/* 현재 컴포넌트가 store의 상태를 바꾸기 위해 dispatch를 사용할 수 있게 해줌 */
const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest: () => dispatch(loginRequest()),
    loginSuccess: (data) => dispatch(loginSuccess(data)),
    loginFailure: (message) => dispatch(loginFailure(message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
