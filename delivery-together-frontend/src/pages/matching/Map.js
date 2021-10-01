import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import 한식 from '../../images/한식.png';
import 일식 from '../../images/일식.png';
import 피자 from '../../images/피자.png';
import 분식 from '../../images/분식.png';
import 치킨 from '../../images/치킨.png';
import 양식 from '../../images/양식.png';
import 디저트 from '../../images/디저트.png';
import 중식 from '../../images/중식.png';
import 야식 from '../../images/야식.png';

const Map = (props) => {
  const [markers, setMarkers] = useState([]);

  /* 매칭 정보 로드 */
  useEffect(() => {
    fetch('http://localhost:8080/board')
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setMarkers(res);
      });
  }, []);

  return (
    <div style={{ height: '94vh' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBRa8Zx84JElP-p8jmx_-Rg_DZ1y076-dw' }}
        defaultCenter={props.location}
        defaultZoom={15}
      >
        {markers.map((marker, index) => (
          <button
            key={index}
            lat={marker.latitude}
            lng={marker.longitude}
            style={{ background: 'transparent', outline: 'none', border: '0px solid transparent' }}
          >
            {marker.category === '한식' && <img src={한식} alt="한식" style={{ width: 40, height: 40 }} />}
            {marker.category === '일식' && <img src={일식} alt="일식" style={{ width: 40, height: 40 }} />}
            {marker.category === '피자' && <img src={피자} alt="피자" style={{ width: 40, height: 40 }} />}
            {marker.category === '분식' && <img src={분식} alt="분식" style={{ width: 40, height: 40 }} />}
            {marker.category === '치킨' && <img src={치킨} alt="치킨" style={{ width: 40, height: 40 }} />}
            {marker.category === '양식' && <img src={양식} alt="양식" style={{ width: 40, height: 40 }} />}
            {marker.category === '디저트' && <img src={디저트} alt="디저트" style={{ width: 40, height: 40 }} />}
            {marker.category === '중식' && <img src={중식} alt="중식" style={{ width: 40, height: 40 }} />}
            {marker.category === '야식' && <img src={야식} alt="야식" style={{ width: 40, height: 40 }} />}
          </button>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
