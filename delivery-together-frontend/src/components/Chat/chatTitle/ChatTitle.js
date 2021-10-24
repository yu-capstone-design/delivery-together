import React from 'react';

import TrashIcon from '../controls/icons/trashIcon/TrashIcon';

import './ChatTitle.scss';

const ChatTitle = ({ matchingName }) => {
  let chatTitleContents = null;

  if (matchingName) {
    chatTitleContents = (
      <>
        <span>{ matchingName }</span>
        <div>
          <TrashIcon />
        </div>
      </>
    );
  }

  return (
    <div id="chat-title">
      { chatTitleContents }
    </div>
  );
}

export default ChatTitle;
