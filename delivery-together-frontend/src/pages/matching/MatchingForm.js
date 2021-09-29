import React from 'react';
import { Form, Col, Button, Row } from 'react-bootstrap';

const MatchingForm = () => {
  return (
    <Form>
      <br />
      {/* 제목 */}
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
          제목
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" placeholder="제목을 입력해주세요." />
        </Col>
      </Form.Group>
      {/* 카테고리 */}
      <fieldset>
        <Form.Group as={Row} className="mb-3">
          <Form.Label as="legend" column sm={2}>
            카테고리
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              type="radio"
              label="한식"
              name="formHorizontalRadios"
              id="formHorizontalRadios1"
            />
            <Form.Check
              type="radio"
              label="분식"
              name="formHorizontalRadios"
              id="formHorizontalRadios2"
            />
            <Form.Check
              type="radio"
              label="디저트"
              name="formHorizontalRadios"
              id="formHorizontalRadios3"
            />
          </Col>
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
          />
        </Col>
      </Form.Group>
      {/* 버튼 */}
      <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 10, offset: 2 }}>
          <Button type="submit">매칭 신청</Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default MatchingForm;
