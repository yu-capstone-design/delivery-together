import React from 'react';

import TrashIcon from '../controls/icons/trashIcon/TrashIcon';

import './ChatTitle.scss';

const ChatTitle = ({ matchingName }) => {
  let chatTitleContents = null;

  if (matchingName) {
    chatTitleContents = (
      <>
        <span>{ matchingName }</span>
      </>
    );
  }

  return (
    <div id="chat-title">
      <div>
      { chatTitleContents }
      </div>
      <div className='chat_title_label'>
        님과의 채팅
      </div>
    </div>
  );
}

export default ChatTitle;
