import React, { useEffect, useState } from 'react';
import { loadUserData, readUserRating } from '../../api/userService';
import { readMatchingDetail } from '../../api/matchingService';
import { Button, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logoutRequest, userDataRequest } from '../../redux/actions';
import { Link } from 'react-router-dom';
import './user.css';
import { AiOutlineMail } from 'react-icons/ai';
import { MdCake } from 'react-icons/md';
import { ImEarth } from 'react-icons/im';
import { BsFillFilePersonFill } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';

const Profile = ({ ...props }) => {
  const [userData, setUserData] = useState({});
  const [matching, setMatching] = useState({});
  const [rating, setRating] = useState();

  useEffect(() => {
    /* 사용자 정보 로드 */
    loadUserData().then((res) => {
      console.log('사용자 정보', res.data);
      setUserData(res.data);
      props.userDataRequest(res.data);
    });
  }, []);

  useEffect(() => {
    /* 사용자 매너점수 정보 로드 */
    readUserRating(userData.username).then((res) => {
      setRating(res.data);
    });
  });

  useEffect(() => {
    /* 사용자 매칭 정보 로드 */
    readMatchingDetail(userData.username).then((res) => {
      setMatching(res.data);
    });
  });

  const logout = () => {
    localStorage.clear();

    props.logoutRequest();
    props.history.push('/login');
  };

  return (
    <div
      class="container"
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div class="row gutters">
        <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
          <div
            class="card h-100"
            style={{
              borderRadius: '20px',
              borderWidth: '2px',
            }}
          >
            <div class="card-body">
              <div
                class="account-settings"
                style={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div class="user-profile">
                  <div class="user-avatar">
                    {userData.gender === '남자' && (
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJAEhyTK6r7MzC84DYxAkygIiTQDygVChQ0w&usqp=CAU"
                        alt="프로필 사진"
                      />
                    )}
                    {userData.gender === '여자' && (
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9fT-a6m0Q1VspoXNU1yeRoVH6hcYodv6KrkU-KkLSv9vxad5ixP69nWYitXuw5J63eiY&usqp=CAU"
                        alt="프로필 사진"
                      />
                    )}
                    <br />
                    <br />
                    <h5>⭐ {rating}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
          <div
            class="card h-100"
            style={{
              borderRadius: '20px',
              borderWidth: '2px',
            }}
          >
            <div class="card-body">
              <div class="row gutters">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <h6 class="mb-2 text-success">
                    <b>프로필 정보</b>
                  </h6>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div class="form-group">
                    <label for="fullName">
                      <b>이메일</b>
                    </label>
                    <text class="form-control" style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                      <AiOutlineMail />
                      &nbsp;{userData.username}
                    </text>
                  </div>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div class="form-group">
                    <label for="fullName">
                      <b>생년월일</b>
                    </label>
                    <text class="form-control" style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                      <MdCake />
                      &nbsp;{userData.birthdate}
                    </text>
                  </div>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div class="form-group">
                    <label for="eMail">
                      <b>국적</b>
                    </label>
                    <text class="form-control " style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                      <ImEarth />
                      &nbsp;{userData.country}
                    </text>
                  </div>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div class="form-group">
                    <label for="phone">
                      <b>성별</b>
                    </label>
                    <text class="form-control" style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                      <BsFillFilePersonFill />
                      &nbsp;{userData.gender}
                    </text>
                  </div>
                </div>
              </div>
              <br />
              <div class="row gutters">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <h6 class="mt-3 mb-2 text-success">
                    <b>나의 매칭 목록</b>
                  </h6>
                </div>
                <div class="  col-md-12 col-sm-12 col-12">
                  {matching !== '' && (
                    <Card
                      style={{
                        height: '90px',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        padding: '15px',
                      }}
                    >
                      <div class="text-center">
                        <Link to={'/matching/' + userData.username} style={{ textDecoration: 'none', color: 'black' }}>
                          <b>1건</b>
                        </Link>
                        <text>의 매칭 정보가 존재합니다.</text>
                      </div>
                    </Card>
                  )}
                  {matching === '' && (
                    <Card
                      style={{
                        height: '90px',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '15px',
                      }}
                    >
                      <Card.Body>등록한 매칭이 존재하지 않습니다.</Card.Body>
                    </Card>
                  )}
                </div>
              </div>
              <br />
              <div class="row gutters">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div class="text-right">
                    <Button variant="danger" onClick={() => logout()} style={{ display: 'flex', alignItems: 'center' }}>
                      <FiLogOut />
                      &nbsp;로그아웃
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
