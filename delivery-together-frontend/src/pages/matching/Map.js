import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Marker } from 'google-maps-react';

const Map = () => {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  return (
    <div style={{ height: '90vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBRa8Zx84JElP-p8jmx_-Rg_DZ1y076-dw' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <Marker lat={10.99835602} lng={77.01502627} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
};

export default Map;
