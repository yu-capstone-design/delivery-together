import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Marker } from 'google-maps-react';

const Map = (props) => {
  console.log(props.location);
  return (
    <div style={{ height: '94vh' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBRa8Zx84JElP-p8jmx_-Rg_DZ1y076-dw' }}
        defaultCenter={props.location}
        defaultZoom={15}
      >
        <Marker lat={35.8252544} lng={128.7553024} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
};

export default Map;
