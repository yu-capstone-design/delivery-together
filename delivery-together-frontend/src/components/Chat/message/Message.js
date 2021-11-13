import React from 'react';
import profile_img from '../../../images/profile.png'
import classNames from 'classnames';

import './Message.scss';
import NoConversations from '../conversation/noCoversations/NoConversations';

const Message = ({ isMyMessage, message, messageSendTime }) => {
  console.log(messageSendTime)
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
          {MsgCheck(message)}
        </div>
        <div className='message-date'>
          {checkTime(messageSendTime)}
        </div>
      </div>
    </div>
  );
}
function checkTime(messageSendTime){
  let date = messageSendTime.split(" ")
  let result = ""

  switch (date[1]){
    case "Nov":
      result += "11월"


  }

  result += date[2]
  result += "일 " + date[4]
  return result
}

function MsgCheck(targetMsg){
  let msgLength = targetMsg.length
  let msgList = []
  for(let x = 30; x<msgLength; x+=30){
    msgList.push(targetMsg.slice(x-30,x))
  }
  let tmp = msgLength%30
  if (tmp !== 0){
    msgList.push(targetMsg.slice(msgLength-tmp,msgLength))
  }


  let messageItems = msgList.map((message) => {
    return(
      <p>
        {message}
      </p>
    )
  });


  return messageItems
}


export default Message;
