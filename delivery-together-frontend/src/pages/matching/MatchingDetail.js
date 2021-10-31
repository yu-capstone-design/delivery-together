import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { readMatchingDetail } from '../../api/matchingService';
import { deleteMatching } from '../../api/matchingService';
import { GrUserManager } from 'react-icons/gr';
import { FaCoins } from 'react-icons/fa';
import { MdFastfood } from 'react-icons/md';
import { BsFillPencilFill } from 'react-icons/bs';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { BsTrashFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { readUserRating } from '../../api/userService';

const MatchingDetail = ({ user, ...props }) => {
  const username = props.match.params.username; // 게시글 작성자의 username
  const myUsername = user.username; // 로그인한 사용자의 username

  const [matching, setMatching] = useState({});
  const [rating, setRating] = useState();

  useEffect(() => {
    readMatchingDetail(username)
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        setMatching(res);
      });
  }, []);

  useEffect(() => {
    /* 사용자 매너점수 정보 로드 */
    readUserRating(username).then((res) => {
      console.log(res.data);
      setRating(res.data);
    });
  });

  const deleteButton = () => {
    deleteMatching(username)
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        if (res === username + '님의 매칭이 삭제되었습니다.') {
          alert('매칭이 삭제되었습니다.');
          props.history.goBack();
        } else alert('매칭 삭제에 실패하였습니다.');
      });
  };

  const updateButton = () => {
    props.history.push('/matchingUpdateForm/' + username);
  };

  const getMatching = () => {
    props.history.push('/chatRoom/' + username + myUsername);
  };

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'white',
      }}
    >
      <div
        style={{
          width: '70%',
          padding: 50,
          borderRadius: '20px',
          border: '1px solid',
          borderColor: '#BDBDBD',
          backgroundColor: '#FAFAFA',
          boxShadow: '1px 1px 1px 1px gray',
        }}
      >
        <h1 style={{ height: '55px' }}>안녕하세요</h1>
        <h6 style={{ height: '25px' }}>
          <Link
            to={'/user/' + matching.username}
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'black',
              fontWeight: 'bold',
            }}
          >
            <GrUserManager />
            &nbsp;{matching.username} (⭐ {rating})
          </Link>
        </h6>
        <hr />
        <div>
          <h6 style={{ height: '25px' }}>
            <b style={{ display: 'flex', alignItems: 'center' }}>
              <FaCoins />
              &nbsp;최대 지불가격 : {matching.money}원
            </b>
          </h6>
          <h6 style={{ height: '20px' }}>
            <b style={{ display: 'flex', alignItems: 'center' }}>
              <MdFastfood />
              &nbsp;카테고리 : {matching.category}
            </b>
          </h6>
        </div>
        <hr />
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="form-group">
            <label for="fullName">
              <b style={{ display: 'flex', alignItems: 'center' }}>
                <BsFillPencilFill />
                &nbsp;내용
              </b>
            </label>
            <text class="form-control" style={{ marginTop: '10px', marginBottom: '10px', height: '130px' }}>
              {matching.content}
            </text>
          </div>
        </div>
        <hr />
        {username !== myUsername && (
          <div class="text-center">
            <Button
              variant="success"
              size="lg"
              type="submit"
              onClick={getMatching}
              style={{ borderRadius: '25px', border: '1px solid', borderColor: '#0B6121', width: '150px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BsFillChatDotsFill size={30} />
              </div>
            </Button>
          </div>
        )}{' '}
        <div class="text-center">
          {username === myUsername && (
            <Button
              variant="primary"
              size="lg"
              onClick={updateButton}
              style={{ borderRadius: '25px', border: '1px solid', borderColor: '#2E2EFE', width: '150px' }}
            >
              매칭 수정
            </Button>
          )}
          &nbsp; &nbsp; &nbsp;
          {username === myUsername && (
            <Button
              variant="danger"
              size="lg"
              onClick={deleteButton}
              style={{ borderRadius: '25px', border: '1px solid', borderColor: '#B40404', width: '150px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BsTrashFill size={30} />
              </div>
            </Button>
          )}
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

export default connect(mapStateToProps)(MatchingDetail);
