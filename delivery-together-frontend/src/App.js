import React from 'react';
import { Container } from 'react-bootstrap';
import { Route } from 'react-router';
import Header from './components/Header';
import Map from './pages/Map';

function App() {
  return (
    <div>
      <Header />
      <Container>
        <Route path="/" exact={true} component={Map} />
      </Container>
    </div>
  );
}

export default App;
