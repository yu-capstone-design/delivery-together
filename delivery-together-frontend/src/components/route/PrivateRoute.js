import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem('USER_KEY') ? <Component {...props} location={location} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
