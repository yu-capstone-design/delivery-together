import React from 'react';
import { Container } from 'react-bootstrap';
import { Route } from 'react-router';
import Header from './components/Header';
import Map from './pages/Map';
import MatchingForm from './pages/MatchingForm';

function App() {
  return (
    <div>
      <Header />
      <Container>
        <Route path="/" exact={true} component={Map} />
        <Route path="/matchingForm" exact={true} component={MatchingForm} />
      </Container>
    </div>
  );
}

export default App;
