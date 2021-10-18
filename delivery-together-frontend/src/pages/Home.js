import React from 'react';
import Logo from '../images/logo.png';

const Home = () => {
  return (
    <div
      style={{
        height: '90%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img src={Logo} alt="로고" style={{ width: '40%' }} />
    </div>
  );
};

export default Home;
