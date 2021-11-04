import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { Dropdown } from 'react-bootstrap';
import 한식 from '../../images/한식.png';
import 일식 from '../../images/일식.png';
import 피자 from '../../images/피자.png';
import 분식 from '../../images/분식.png';
import 치킨 from '../../images/치킨.png';
import 양식 from '../../images/양식.png';
import 디저트 from '../../images/디저트.png';
import 중식 from '../../images/중식.png';
import 야식 from '../../images/야식.png';
import 카테고리 from '../../images/category.png';
import { Link } from 'react-router-dom';
import { readMatchingList } from '../../api/matchingService';
import 버튼 from '../../images/plus.png';
import InfoWindow from '../../components/matching/InfoWindow';
import '../../components/matching/InfoWindow.css';
import CustomToggle from '../../components/matching/CustomToggle';

const Map = (props) => {
  const [markers, setMarkers] = useState([
    {
      category: '치킨',
      content: '아아아',
      createdAt: '1635049153536',
      latitude: 35.8347735,
      longitude: 128.7558721,
      money: 12222,
      title: '치킨치킨',
      username: 'ejrwnd@naver.com',
    },
    {
      category: '중식',
      content: '먹자먹어',
      createdAt: '1635140192233',
      latitude: 35.8310444,
      longitude: 128.7600795,
      money: 9000,
      title: '짜장면 같이 드실분~',
      username: 'iby1223@daum.net',
    },
    {
      category: '치킨',
      content: '치킨 먹을 사람~',
      createdAt: '1634609158383',
      latitude: 35.8356375,
      longitude: 128.759403,
      money: 8000,
      title: '안녕하세요 치킨 먹어요',
      username: 'iby5989@daum.net',
    },
    {
      category: '분식',
      content: '굿',
      createdAt: '1634609628827',
      latitude: 35.8337624,
      longitude: 128.752683,
      money: 7000,
      title: '안녕하세요 떡볶이 먹어요',
      username: 'iby5989@naver.com',
    },
  ]);

  const [enableWindow, setEnableWindow] = useState(false);
  const [currentWindow, setCurrentWindow] = useState({});
  const [category, setCategory] = useState('전체');

  /* 매칭 정보 로드 */
  useEffect(() => {
    readMatchingList()
      .then((res) => res.data)
      .then((res) => {
        setMarkers(res);
      });
  }, []);

  /* 마커 클릭 메서드 */
  const markerClick = (marker) => {
    if (marker.latitude === currentWindow.latitude && marker.longitude === currentWindow.longitude) {
      setEnableWindow(!enableWindow);
    } else {
      setEnableWindow(true);
      setCurrentWindow(marker);
    }
  };

  /* 카테고리 선택 메서드 */
  const selectCategory = (category) => {
    setCategory(category);
  };

  return (
    <div style={{ height: '94vh' }}>
      {/* 지도 영역 */}
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBRa8Zx84JElP-p8jmx_-Rg_DZ1y076-dw' }}
        defaultCenter={props.location}
        defaultZoom={15}
        options={{ fullscreenControl: false, zoomControl: false, disableDoubleClickZoom: true }}
      >
        {markers.map((marker, index) => (
          <button
            key={index}
            lat={marker.latitude}
            lng={marker.longitude}
            style={{ background: 'transparent', outline: 'none', border: 'none' }}
            onClick={() => {
              markerClick(marker);
            }}
          >
            {(category === '전체' || category === '한식') && marker.category === '한식' && (
              <img src={한식} alt="한식" style={{ width: 40, height: 40 }} />
            )}
            {(category === '전체' || category === '일식') && marker.category === '일식' && (
              <img src={일식} alt="일식" style={{ width: 40, height: 40 }} />
            )}
            {(category === '전체' || category === '피자') && marker.category === '피자' && (
              <img src={피자} alt="피자" style={{ width: 40, height: 40 }} />
            )}
            {(category === '전체' || category === '분식') && marker.category === '분식' && (
              <img src={분식} alt="분식" style={{ width: 40, height: 40 }} />
            )}
            {(category === '전체' || category === '치킨') && marker.category === '치킨' && (
              <img src={치킨} alt="치킨" style={{ width: 40, height: 40 }} />
            )}
            {(category === '전체' || category === '양식') && marker.category === '양식' && (
              <img src={양식} alt="양식" style={{ width: 40, height: 40 }} />
            )}
            {(category === '전체' || category === '디저트') && marker.category === '디저트' && (
              <img src={디저트} alt="디저트" style={{ width: 40, height: 40 }} />
            )}
            {(category === '전체' || category === '중식') && marker.category === '중식' && (
              <img src={중식} alt="중식" style={{ width: 40, height: 40 }} />
            )}
            {(category === '전체' || category === '야식') && marker.category === '야식' && (
              <img src={야식} alt="야식" style={{ width: 40, height: 40 }} />
            )}
          </button>
        ))}
        {enableWindow && <InfoWindow lat={currentWindow.latitude} lng={currentWindow.longitude} marker={currentWindow} />}
      </GoogleMapReact>
      {/* 매칭 등록 버튼 */}
      <div
        class="text-center"
        style={{
          top: -80,
          position: 'relative',
          background: 'transparent',
        }}
      >
        <Link to="/matchingCreateForm">
          <img src={버튼} alt="버튼" style={{ width: 80, height: 80 }} />
        </Link>
      </div>
      {/* 카테고리 선택 버튼 */}
      <div
        class="text-left"
        style={{
          top: '-110%',
          position: 'relative',
          background: 'transparent',
        }}
      >
        <Dropdown>
          <Dropdown.Toggle as={CustomToggle}>안녕하세요</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => selectCategory('전체')}>전체</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => selectCategory('한식')}>한식</Dropdown.Item>
            <Dropdown.Item onClick={() => selectCategory('일식')}>일식</Dropdown.Item>
            <Dropdown.Item onClick={() => selectCategory('피자')}>피자</Dropdown.Item>
            <Dropdown.Item onClick={() => selectCategory('분식')}>분식</Dropdown.Item>
            <Dropdown.Item onClick={() => selectCategory('치킨')}> 치킨</Dropdown.Item>
            <Dropdown.Item onClick={() => selectCategory('양식')}> 양식</Dropdown.Item>
            <Dropdown.Item onClick={() => selectCategory('디저트')}>디저트</Dropdown.Item>
            <Dropdown.Item onClick={() => selectCategory('중식')}>중식</Dropdown.Item>
            <Dropdown.Item onClick={() => selectCategory('야식')}>야식</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Map;
