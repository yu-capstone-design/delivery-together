import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const JoinForm = (props) => {
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

  const submitJoin = (e) => {
    e.preventDefault();

    let checked = checkForm();

    if (checked) {
      fetch('http://localhost:8080/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(user),
      })
        .then((res) => {
          if (res.status === 201) {
            return res.text();
          } else {
            return null;
          }
        })
        .then((res) => {
          console.log(res);
          if (res === '회원가입에 성공하였습니다.') {
            alert('회원가입에 성공하였습니다.');
            setUser({ ...user, username: '', password: '' });
            props.history.push('/');
          } else if (res === '중복된 계정의 회원이 존재합니다.') {
            alert('중복된 계정의 회원이 존재합니다.');
            setUser({ ...user, username: '', password: '' });
          } else {
            alert('회원가입에 실패하였습니다.');
          }
        });
    } else {
      alert('양식을 모두 입력해주세요.');
    }
  };
  return (
    <div>
      <Form style={{ marginLeft: '35%', marginRight: '35%' }} onSubmit={submitJoin}>
        <br />
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
          <Button variant="dark" type="submit">
            회원가입
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default JoinForm;
