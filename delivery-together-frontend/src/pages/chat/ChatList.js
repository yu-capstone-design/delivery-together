import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ConversationList from '../../components/Chat/conversation/conversationList/ConversationList';
import '../chat/style/ChatList.css'

const ChatList = ({ user, ...props }) => {

  const userName = user.username;

  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/chat/chatList/' + userName)
      .then((res) => res.json())
      .then((res) => {
        setChatList(res)
      });

  }, [chatList]);

  let listItems =(
    <></>
  );

  if(chatList.length > 0) {
    listItems = (
      <>
        <ConversationList
          conversations={chatList}
          props={props}
        />
      </>
    );
  }


  //사용 컴포넌트 title, chatForm ( 내부에 핸들러 이벤트가 있음)
  return (
    <div>
        <div className='chat_list_header'>
          채팅 리스트
        </div>

        <div className='chat_list_form'>
          {listItems}
        </div>
    </div>
  );
}

/* store로부터 state를 가져와서 현재 컴포넌트의 props로 보냄 */
const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user,
  };
};


export default connect(
  mapStateToProps,
)(ChatList);
