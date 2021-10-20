import React, { useEffect, useState } from 'react';
import { loadUserData } from '../../api/userService';
import { readMatchingDetail } from '../../api/matchingService';
import { Button, Container, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logoutRequest, userDataRequest } from '../../redux/actions';
import { Link } from 'react-router-dom';

const Profile = ({ ...props }) => {
  const [userData, setUserData] = useState({});
  const [matching, setMatching] = useState({});

  useEffect(() => {
    /* 사용자 정보 로드 */
    loadUserData().then((res) => {
      setUserData(res.data);
      props.userDataRequest(res.data);
    });

    /* 사용자 매칭 정보 로드 */
    readMatchingDetail(userData.username).then((res) => {
      console.log(res.data);
      setMatching(res.data);
    });
  }, [userData]);

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
      <br />
      <h4>나의 매칭 정보</h4>
      {matching !== '' && (
        <Card style={{ flexFlow: 'row', padding: '10px' }}>
          &nbsp; &nbsp;
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div>
              <b>제목 : </b>
              {matching.title}
            </div>
          </div>
          &nbsp; &nbsp;
          <Link to={'/matching/' + userData.username} className="btn btn-dark">
            상세보기
          </Link>
        </Card>
      )}
      {matching === '' && (
        <Card
          style={{
            height: '90%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Card.Body>등록한 매칭이 존재하지 않습니다.</Card.Body>
        </Card>
      )}
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
