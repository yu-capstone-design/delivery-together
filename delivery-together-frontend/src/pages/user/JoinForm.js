import React from 'react';
import { Form, Button } from 'react-bootstrap';

const JoinForm = () => {
  return (
    <div>
      <Form style={{ marginLeft: '35%', marginRight: '35%' }}>
        <br />
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control type="email" placeholder="이메일을 입력해주세요." />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control type="password" placeholder="비밀번호를 입력해주세요." />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button variant="dark">회원가입</Button>
        </div>
      </Form>
    </div>
  );
};

export default JoinForm;
