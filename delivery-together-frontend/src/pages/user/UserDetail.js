import React, { useEffect, useState } from 'react';
import { readUserDetail } from '../../api/userService';
import './user.css';
import { AiOutlineMail } from 'react-icons/ai';
import { MdCake } from 'react-icons/md';
import { ImEarth } from 'react-icons/im';
import { BsFillFilePersonFill } from 'react-icons/bs';

const UserDetail = (props) => {
  const username = props.match.params.username;

  const [userData, setUserData] = useState({});

  useEffect(() => {
    readUserDetail(username)
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        setUserData(res);
      });
  }, []);

  return (
    <div
      class="container"
      style={{
        height: '90%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
        <div class="card h-100">
          <div class="card-body">
            <div class="row gutters">
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
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="남자" />
                    <br />
                    <br />
                    <h5>⭐ 4.1</h5>
                  </div>
                </div>
              </div>

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
