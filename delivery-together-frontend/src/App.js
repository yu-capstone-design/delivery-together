import React, { useEffect, useState } from 'react';
import { Route } from 'react-router';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import Map from './pages/matching/Map';
import MatchingCreateForm from './pages/matching/MatchingCreateForm';
import MatchingDetail from './pages/matching/MatchingDetail';
import MatchingUpdateForm from './pages/matching/MatchingUpdateForm';
import JoinForm from './pages/user/JoinForm';
import LoginForm from './pages/user/LoginForm';
import Profile from './pages/user/Profile';
import PrivateRoute from './components/route/PrivateRoute';

function App() {
  const [location, setLocation] = useState({
    lat: '',
    lng: '',
  });

  /* 사용자 위치 정보 받기 */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
    });
  }, []);

  return (
    <div style={{ height: '100vh' }}>
      <Header style={{ height: '8vh' }} />
      <div style={{ height: '94vh' }}>
        {/* 홈 페이지 */}
        <Route path="/" exact={true} component={Home} />

        {/* 매칭 기능 */}
        <Route path="/matching" exact={true} render={() => <Map location={location} />} />
        <PrivateRoute path="/matchingCreateForm" exact={true} component={MatchingCreateForm} location={location} />
        {/* <Route path="/matchingCreateForm" exact={true} render={() => <MatchingCreateForm location={location} />} /> */}
        <Route path="/matching/:username" exact={true} component={MatchingDetail} />
        <PrivateRoute path="/matchingUpdateForm/:username" exact={true} component={MatchingUpdateForm} />
        {/* <Route path="/matchingUpdateForm/:username" exact={true} component={MatchingUpdateForm} /> */}

        {/* 로그인, 회원가입 기능 */}
        <Route path="/login" exact={true} component={LoginForm} />
        <Route path="/join" exact={true} component={JoinForm} />

        {/* 개인 프로필 기능 */}
        <PrivateRoute path="/profile" exact={true} component={Profile} />
        {/* <Route path="/profile" exact={true} component={Profile} /> */}
      </div>
      <Footer style={{ height: '8vh' }} />
    </div>
  );
}

export default App;
