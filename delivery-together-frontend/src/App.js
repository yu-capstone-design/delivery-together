import React, { useEffect, useState } from 'react';
import { Route } from 'react-router';
import Footer from './components/Footer';
import Header from './components/Header';
import Map from './pages/matching/Map';
import MatchingCreateForm from './pages/matching/MatchingCreateForm';
import MatchingDetail from './pages/matching/MatchingDetail';
import MatchingUpdateForm from './pages/matching/MatchingUpdateForm';
import JoinForm from './pages/user/JoinForm';
import LoginForm from './pages/user/LoginForm';
import Profile from './pages/user/Profile';
import UserDetail from './pages/user/UserDetail';
import PrivateRoute from './components/route/PrivateRoute';

import Chat from './pages/chat/Chat';
import ChatList from './pages/chat/ChatList';
import RatingPage from './pages/user/RatingPage';

function App() {
  const [location, setLocation] = useState({
    lat: '',
    lng: '',
  });

  /* 사용자 위치 정보 받기 */
  useEffect(() => {
    console.log('USER_KEY', localStorage.getItem('USER_KEY'));
    navigator.geolocation.getCurrentPosition(function (position) {
      setLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
    });
  }, []);

  return (
    <div style={{ height: '100vh' }}>
      <Header style={{ height: '8vh' }} />
      <div style={{ height: '94vh' }}>
        {/* 매칭 기능 */}
        <Route path="/" exact={true} render={() => <Map location={location} />} />
        <PrivateRoute path="/matchingCreateForm" exact={true} component={MatchingCreateForm} location={location} />
        <Route path="/matching/:username" exact={true} component={MatchingDetail} />
        <PrivateRoute path="/matchingUpdateForm/:username" exact={true} component={MatchingUpdateForm} />

        {/* 매칭 등록자 프로필 기능 */}
        <Route path="/user/:username" exact={true} component={UserDetail} />

        {/* 매칭 등록자 매너점수 평가 기능 */}
        <PrivateRoute path="/rating/:username" exact={true} component={RatingPage} />

        {/* 로그인, 회원가입 기능 */}
        <Route path="/login" exact={true} component={LoginForm} />
        <Route path="/join" exact={true} component={JoinForm} />

        {/* 개인 프로필 기능 */}
        <PrivateRoute path="/profile" exact={true} component={Profile} />

        {/* 채팅 기능 */}
        <Route path="/chatRoom/:roomNum" exact={true} component={Chat} />
        <Route path="/chatList" exact={true} component={ChatList} />
      </div>
      <Footer style={{ height: '8vh' }} />
    </div>
  );
}

export default App;
