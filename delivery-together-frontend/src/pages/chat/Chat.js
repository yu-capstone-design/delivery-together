import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { conversationChanged, newMessageAdded, conversationDeleted, conversationsRequested } from './store/action';
import ConversationSearch from '../../components/conversation/conversationSearch/ConversationSearch';
import NoConversations from '../../components/conversation/noCoversations/NoConversations';
import ConversationList from '../../components/conversation/conversationList/ConversationList';
import NewConversation from '../../components/conversation/newConversation/NewConversation';
import ChatTitle from '../../components/chatTitle/ChatTitle';
import MessageList from './message/MessageList';
import ChatForm from '../../components/chatForm/ChatForm';
import '../chat/style/Chat.css'

const Chat = ({
                conversations,
                selectedConversation,
                conversationChanged,
                onMessageSubmitted,
                onDeleteConversation,
                loadConversations
              }) => {
  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  const [textMessage, setTextMessage] = useState('');
  const [markers, setMarkers] = useState([{example: []}]);

  useEffect(() => {
    fetch('http://localhost:8080/chat')
      .then((res) => res.json())
      .then((res) => {
        setMarkers(res);
      });

  }, [markers]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    var abc = [...markers[0].example]
    console.log("---------")
    console.log(abc)

    abc.push({
      msg : textMessage,
      sender: "김덕중"
    })

    var chat = {
      msg : textMessage,
      sender : '김덕중',
      createdAt : '오늘',
      roomNum : 11,
      example : abc
    }
    console.log(JSON.stringify(chat))
    fetch('http://localhost:8080/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(chat),
    })
      .then((res) => {
        console.log(res.text());

        if (res.status === 201) {
          return res;
        } else {
          return null;
        }
      })
      .then((res) => {
        console.log(res);
        if (res != null) {
          alert('매칭 등록에 성공하였습니다.');
        } else {
          alert('매칭 등록에 실패하였습니다.');
        }
      });

  }

  let brr = markers[0].example.map((value, key) => <li key = {key}>{value.msg}</li>);

  // let messageItems = markers[0].example.map((message, index) => {
  //   return <Message
  //     key={index}
  //     isMyMessage={message.sender === "김덕중"}
  //     message={message.msg} />;
  // });

  let conversationContent = (
    <>
      <NoConversations></NoConversations>
    </>
  );

  if (conversations.length > 0) {
    conversationContent = (
      <>
        <MessageList conversationId={selectedConversation.id} />
      </>
    );
  }

  return (
    <div id="chat-container">
      <ChatTitle
        selectedConversation={selectedConversation}
        onDeleteConversation={onDeleteConversation} />
        <div className='abc'>
          {conversationContent}
        </div>
      <ChatForm
        selectedConversation={selectedConversation}
        onMessageSubmitted={onMessageSubmitted} />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    conversations: state.conversationState.conversations,
    selectedConversation: state.conversationState.selectedConversation
  };
};

const mapDispatchToProps = dispatch => ({
  conversationChanged: conversationId => dispatch(conversationChanged(conversationId)),
  onMessageSubmitted: messageText => { dispatch(newMessageAdded(messageText)); },
  onDeleteConversation: () => { dispatch(conversationDeleted()); },
  loadConversations: () => { dispatch(conversationsRequested())}
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
