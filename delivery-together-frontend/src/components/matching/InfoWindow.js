import React from 'react';
import './InfoWindow.css';
import { Link } from 'react-router-dom';

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
            <b>카테고리 : </b>
            <text>{marker.category}</text>
            <br />
            <br />
            <b>최대 지불가격 : </b>
            <text>{marker.money}원</text>
          </p>
        </div>
      </div>
      <div className="infowindow_anchor"></div>
    </div>
  );
};

export default InfoWindow;
