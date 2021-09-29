import React from 'react';
import { Container } from 'react-bootstrap';
import { Route } from 'react-router';
import Footer from './components/Footer';
import Header from './components/Header';
import Map from './pages/matching/Map';
import MatchingForm from './pages/matching/MatchingForm';

function App() {
  return (
    <div style={{ height: '100vh' }}>
      <Header style={{ height: '10vh' }} />
      <Container style={{ height: '90vh' }}>
        <Route path="/" exact={true} component={Map} />
        <Route path="/matchingForm" exact={true} component={MatchingForm} />
      </Container>
      <Footer style={{ height: '10vh' }} />
    </div>
  );
}

export default App;
