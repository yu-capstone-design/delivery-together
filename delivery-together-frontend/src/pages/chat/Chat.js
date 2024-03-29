import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { newMessageAdded } from './store/action';
import NoConversations from '../../components/Chat/conversation/noCoversations/NoConversations';
import ChatTitle from '../../components/Chat/chatTitle/ChatTitle';
import ChatForm from '../../components/Chat/chatForm/ChatForm';
import '../chat/style/Chat.css'
import Message from '../../components/Chat/message/Message';

const Chat = ({ user, ...props }) => {

  const roomNum = props.match.params.roomNum
  const userName = user.username;
  let myState = ""
  let matchingName = ''
  if(roomNum.indexOf(userName) === 0){
    matchingName = roomNum.substr(userName.length)
    myState="matchingUser"
  }else{
    matchingName = roomNum.substr(0,roomNum.length - userName.length)
    myState="chatUser"
  }

  const [message, setMessage] = useState({message:[]});

  useEffect(() => {
    fetch('http://localhost:8080/chat/' + roomNum)
      .then((res) => res.json())
      .then((res) => {
        setMessage(res);
      });
  }, [message]);

  // 메세지를 전송하면 현재 저장된 메세지를 저장한후, 새로운 메세지를 추가해 보낸다
  const handleFormSubmit = (text) => {
    var updateMessage = [...message.message]

    updateMessage.push({
      msg : text,
      sender: userName,
      createAt: Date()
    })

    var chat = {
      lastText : text,
      lastSender : userName,
      lastSendTime : Date.now(),
      matchingUserCheck : false,
      chatUserCheck : false,
      message : updateMessage
    }

    if(myState === "chatUser"){
      chat.chatUserCheck = true
    }else{
      chat.matchingUserCheck = true
    }

    if(message.message.length === 0){
      setMessage(chat)
    }

    fetch('http://localhost:8080/chat/' + roomNum, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(chat),
    })
      .then((res) => {

        if (res.status === 201) {
          return res;
        } else {
          return null;
        }
      })
      .then((res) => {
      });

  }

  // 데이터를 로딩중일 때 다음 화면을 표시 (NoConversations)
  let messageItems = (
    <>
      <NoConversations></NoConversations>
    </>
  );

  // 데이터를 모두 받아오면 다음 화면을 표시 (Message)
  if (message.message.length > 0) {
    messageItems = message.message.map((message, key) => {
      return <Message
        key={key}
        isMyMessage={message.sender === userName}
        message={message.msg}
        messageSendTime={message.createAt}
      />;
    });
  }

  //사용 컴포넌트 title, chatForm ( 내부에 핸들러 이벤트가 있음)
  return (
    <div id="chat-container">
      <ChatTitle
        className='chat_head_area'
        matchingName={matchingName} />
        <div className='main_chat_area'>
          {messageItems}
        </div>
      <ChatForm
        selectedConversation={matchingName}
        onMessageSubmitted={handleFormSubmit}
      />
    </div>
  );
}

/* store로부터 state를 가져와서 현재 컴포넌트의 props로 보냄 */
const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user,
  };
};

const mapDispatchToProps = dispatch => ({
  onMessageSubmitted: messageText => { dispatch(newMessageAdded(messageText)); },
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
