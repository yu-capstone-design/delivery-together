import React from 'react';
import profile_img from '../../images/profile.png'
import classNames from 'classnames';

import './Message.scss';

const Message = ({ isMyMessage, message }) => {
  const messageClass = classNames('message-row', {
    'you-message': isMyMessage,
    'other-message': !isMyMessage
  });

  const imageThumbnail = isMyMessage ? null : <img src={profile_img} alt={message.imageAlt} />;

  return (
    <div className={messageClass}>
      <div className="message-content">
        {imageThumbnail}
        <div className="message-text">
          {message}
        </div>
      </div>
    </div>
  );
}

export default Message;
