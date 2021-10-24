import React from 'react';

import ConversationItem from '../conversationItem/ConversationItem';
import './ConversationList.scss';

const ConversationList = ({ conversations, props}) => {
  const conversationItems = conversations.map((conversation) => {

    return <ConversationItem
      key={ conversation.id }
      isActive={ false }
      props={props}
      conversation={ conversation } />;
  });

  return (
    <div id="conversation-list">
      {conversationItems}
    </div>
  );
}

export default ConversationList;
