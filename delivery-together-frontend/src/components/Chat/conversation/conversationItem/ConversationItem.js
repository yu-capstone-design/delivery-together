import React from 'react';
import classNames from 'classnames';

import './ConversationItem.scss';
import profile_img from '../../../../images/profile.png'

const ConversationItem = ({ conversation, isActive, props }) => {
  const className = classNames('conversation', {
    'active': isActive
  });

  return (
    <div className={className} onClick={() => {props.history.push('/chatRoom/' + conversation.roomId )}}>
      <img src={profile_img} alt="프로필" />
      <div className="title-text">
        {conversation.matchingName}
        <div className={(conversation.isMatching && !conversation.chat.matchingUserCheck)||(!conversation.isMatching && !conversation.chat.chatUserCheck) ? 'conversation-new-message' : 'conversation-hidden'}/>
      </div>
      <div className="created-date">{checkTime(conversation.chat.lastSendTime)}</div>
      <div className="conversation-message">
        {conversation.chat.lastText}
      </div>
    </div>
  );
}

//Date.now를 통해서 마지막 대화가 언제 이루어졌는지 계산해주는 부분
function checkTime(tagetTime){
  let leftTime = Date.now() - Number(tagetTime)

  leftTime = parseInt(leftTime / 1000)

  if(leftTime < 60){
    return String(leftTime)+"초전"
  }

  leftTime = parseInt(leftTime / 60)
  if(leftTime < 60){
    return String(leftTime)+"분전"
  }

  leftTime = parseInt(leftTime / 60)
  if(leftTime < 60){
    return String(leftTime)+"시전"
  }

  leftTime = parseInt(leftTime / 24)
  return String(leftTime)+"일전"

}
export default ConversationItem;
