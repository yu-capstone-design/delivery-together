import React from 'react';

import Button from '../../controls/buttons/Button';

import './NoConversations.scss';

const NoConversations = () => {
  return (
    <div id="no-coversation-layout">
      <div id="no-conversation-content">
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <h2>메세지 로딩중</h2>
        <p>불러올 메세지가 없거나 로딩중입니다.</p>
        <p>메세지를 입력해 채팅을 시작해보세요!</p>
      </div>
    </div>
  );
}

export default NoConversations;
