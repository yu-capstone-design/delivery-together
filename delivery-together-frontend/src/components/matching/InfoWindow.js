import React from 'react';
import './InfoWindow.css';
import { Link } from 'react-router-dom';
import { FaCoins } from 'react-icons/fa';
import { MdFastfood } from 'react-icons/md';

const InfoWindow = ({ marker }) => {
  return (
    <div className="infowindow_wrap">
      <div className="infowindow">
        <Link to={'/matching/' + marker.username}>
          <div className="info_title">
            <div className="place_name">{marker.title}</div>
          </div>
        </Link>
        <div className="info_etc">
          <p>
            <b style={{ display: 'flex', alignItems: 'center' }}>
              <MdFastfood />
              &nbsp;카테고리 : {marker.category}
            </b>
            <br />
            <b style={{ display: 'flex', alignItems: 'center' }}>
              <FaCoins />
              &nbsp;최대 지불가격 : {marker.money}원
            </b>
          </p>
        </div>
      </div>
      <div className="infowindow_anchor"></div>
    </div>
  );
};

export default InfoWindow;
