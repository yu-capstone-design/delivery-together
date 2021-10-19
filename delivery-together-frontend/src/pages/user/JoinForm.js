import React, { useState } from 'react';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';
import Logo from '../../images/logo.png';
import { userJoin } from '../../api/userService';
import { connect } from 'react-redux';
import { joinRequest, joinSuccess, joinFailure } from '../../redux/actions';
import { withRouter } from 'react-router-dom';

const JoinForm = ({ error, isLoading, ...props }) => {
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

  /* 회원가입 양식 검사 */
  const checkForm = () => {
    if (user.username === '' || user.password === '') return false;
    else return true;
  };

  /* 회원가입 요청 */
  const submitJoin = (e) => {
    e.preventDefault();

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
            setUser({ ...user, username: '', password: '' });
            props.history.push('/login');
          } else if (res === '중복된 계정의 회원이 존재합니다.') {
            props.joinFailure('중복된 계정의 회원이 존재합니다.');
            setUser({ ...user, username: '', password: '' });
          } else {
            props.joinFailure('회원가입에 실패하였습니다.');
            setUser({ ...user, username: '', password: '' });
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
          <Form.Control
            type="email"
            placeholder="이메일을 입력해주세요."
            onChange={changeValue}
            name="username"
            value={user.username}
          />
        </Form.Group>
        {/* 비밀번호 */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="비밀번호를 입력해주세요."
            onChange={changeValue}
            name="password"
            value={user.password}
          />
        </Form.Group>
        {/* 버튼 */}
        <div className="d-grid gap-2">
          <Button variant="success" type="submit">
            회원가입 {isLoading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />}
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
