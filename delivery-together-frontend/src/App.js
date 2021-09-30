import React, { useEffect, useState } from 'react';
import { Route } from 'react-router';
import Footer from './components/Footer';
import Header from './components/Header';
import Map from './pages/matching/Map';
import MatchingForm from './pages/matching/MatchingForm';

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
  }, [location]);

  return (
    <div style={{ height: '100vh' }}>
      <Header style={{ height: '8vh' }} />
      <div style={{ height: '94vh' }}>
        <Route path="/" exact={true} render={() => <Map location={location} />} />
        <Route
          path="/matchingForm"
          exact={true}
          render={() => <MatchingForm location={location} />}
        />
      </div>
      <Footer style={{ height: '8vh' }} />
    </div>
  );
}

export default App;
