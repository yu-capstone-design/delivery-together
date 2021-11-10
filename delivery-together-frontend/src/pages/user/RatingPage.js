import React, { useEffect, useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import { readUserDetail, createUserRating } from '../../api/userService';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';

const RatingPage = ({ user, ...props }) => {
  const username = props.match.params.username;

  const [userData, setUserData] = useState({});
  const [ratingInfo, setRatingInfo] = useState({ username: user.username, rating: 0 });

  const handleRating = (rate) => {
    setRatingInfo({ ...ratingInfo, rating: rate });
  };

  useEffect(() => {
    readUserDetail(username)
      .then((res) => res.data)
      .then((res) => {
        setUserData(res);
      });
  }, []);

  /* 매너점수 평가 메서드 */
  const ratingButton = () => {
    console.log('ratingInfo', ratingInfo);
    createUserRating(username, ratingInfo)
      .then((res) => res.data)
      .then((res) => {
        if (res === '매너점수 평가가 완료되었습니다.') {
          props.history.goBack();
        } else if (res === '중복된 사용자를 평가할 수 없습니다.') {
          alert('중복된 사용자를 평가할 수 없습니다.');
          props.history.goBack();
        } else if (res === '본인을 평가할 수 없습니다.') {
          alert('본인을 평가할 수 없습니다.');
          props.history.goBack();
        }
      });
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
                    <h5 style={{ marginTop: '15px' }}>{userData.username}</h5>
                    <br />
                    <div className="App" style={{ marginBottom: '20px' }}>
                      <Rating onClick={handleRating} ratingValue={ratingInfo.rating} size={50} />
                    </div>
                    <br />
                    <Button
                      variant="dark"
                      size="lg"
                      onClick={ratingButton}
                      style={{ borderRadius: '25px', border: '1px solid', width: '150px' }}
                    >
                      평가하기
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

/* store로부터 state를 가져와서 현재 컴포넌트의 props로 보냄 */
const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user,
  };
};

export default connect(mapStateToProps)(RatingPage);
