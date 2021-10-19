import React, { useEffect, useState } from 'react';
import { loadUerData } from '../../api/userService';
import { Button, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logoutRequest, userDataRequest } from '../../redux/actions';

const Profile = ({ ...props }) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    loadUerData().then((res) => {
      setUserData(res.data);
      props.userDataRequest(res.data);
    });
  }, []);

  const logout = () => {
    localStorage.clear();

    props.logoutRequest();
    props.history.push('/login');
  };

  return (
    <Container>
      <br />
      <div>
        <h2>안녕하세요.</h2>
        <h3>{userData.username}님</h3>
      </div>
      <hr />
      <Button variant="danger" onClick={() => logout()}>
        로그아웃
      </Button>
    </Container>
  );
};

/* 현재 컴포넌트가 store의 상태를 바꾸기 위해 dispatch를 사용할 수 있게 해줌 */
const mapDispatchToProps = (dispatch) => {
  return {
    logoutRequest: () => dispatch(logoutRequest()),
    userDataRequest: (data) => dispatch(userDataRequest(data)),
  };
};

export default connect(null, mapDispatchToProps)(Profile);
