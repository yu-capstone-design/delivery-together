import React, { useEffect, useState } from 'react';
import { Route } from 'react-router';
import { withRouter } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Map from './pages/matching/Map';
import MatchingCreateForm from './pages/matching/MatchingCreateForm';
import MatchingDetail from './pages/matching/MatchingDetail';
import MatchingUpdateForm from './pages/matching/MatchingUpdateForm';

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
        <Route path="/" exact={true} render={() => <Map location={location} />} />
        <Route path="/matchingCreateForm" exact={true} render={() => <MatchingCreateForm location={location} />} />
        <Route path="/matching/:username" exact={true} component={MatchingDetail} />
        <Route path="/matchingUpdateForm/:username" exact={true} component={MatchingUpdateForm} />
      </div>
      <Footer style={{ height: '8vh' }} />
    </div>
  );
}

export default withRouter(App);
