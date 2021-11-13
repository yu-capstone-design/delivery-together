import React, { useEffect, useState } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutRequest } from '../redux/actions';
import { withRouter } from 'react-router-dom';
import './style/Header.css'

const Header = ({ user, ...props }) => {
  const logout = () => {
    localStorage.clear();

    props.logoutRequest();
    props.history.push('/login');
  };

  const [chatAlarm, setChatAlarm] = useState([]);
  const [numAlarm, setNumAlarm] = useState(0);


  useEffect(() => {
    if(user.username !== undefined){
      fetch('http://localhost:8080/chat/chatList/' + user.username)
        .then((res) => res.json())
        .then((res) => {
          setChatAlarm(res)
        });

      let num = 0
      for(let x=0; x<chatAlarm.length; x++){
        if(chatAlarm[x].isMatching && !chatAlarm[x].chat.matchingUserCheck){
            num++
        }
        else if(!chatAlarm[x].isMatching && !chatAlarm[x].chat.chatUserCheck){
            num++
        }
      }
      setNumAlarm(num)
    }

  }, [chatAlarm]);

  let alarm = (
    <>
    </>
  );

  if(numAlarm>0){
    alarm = (
      <div className='header_alarm_area'>
        {numAlarm}
      </div>
    )
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Link to="/" className="navbar-brand">
          Delivery Together
        </Link>
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
            <div className='header_area'>
              <NavDropdown title={user.username} id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <Link to="/profile" style={{ textDecoration: 'none', color: 'black' }}>
                    나의 정보
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item><Link to="/chatList" style={{ textDecoration: 'none', color: 'black'}}>채팅 목록</Link></NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => logout()} style={{ color: 'red' }}>
                  로그아웃
                </NavDropdown.Item>
              </NavDropdown>
              {alarm}
            </div>
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
