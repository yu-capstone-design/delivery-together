import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutRequest } from '../redux/actions';
import { withRouter } from 'react-router-dom';

const Header = ({ user, ...props }) => {
  const logout = () => {
    localStorage.clear();

    props.logoutRequest();
    props.history.push('/login');
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Delivery Together</Navbar.Brand>
        <Nav className="me-auto">
          &nbsp;
          <Link to="/matching" className="nav-link">
            매칭 신청
          </Link>
          &nbsp;
          <Link to="/matchingCreateForm" className="nav-link">
            매칭 등록
          </Link>
        </Nav>
        <Nav>
          {!localStorage.getItem('USER_KEY') && (
            <Nav className="me-auto">
              <Link to="/login" className="nav-link">
                로그인
              </Link>
              &nbsp;
              <Link to="/join" className="nav-link">
                회원가입
              </Link>
            </Nav>
          )}
          {localStorage.getItem('USER_KEY') && (
            <NavDropdown title={user.username} id="basic-nav-dropdown">
              <NavDropdown.Item>
                <Link to="/profile" style={{ textDecoration: 'none', color: 'black' }}>
                  나의 정보
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => logout()} style={{ color: 'red' }}>
                로그아웃
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

/* store로부터 state를 가져와서 현재 컴포넌트의 props로 보냄 */
const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user,
  };
};

/* 현재 컴포넌트가 store의 상태를 바꾸기 위해 dispatch를 사용할 수 있게 해줌 */
const mapDispatchToProps = (dispatch) => {
  return {
    logoutRequest: () => dispatch(logoutRequest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
