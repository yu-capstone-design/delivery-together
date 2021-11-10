import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ConversationList from '../../components/Chat/conversation/conversationList/ConversationList';
import '../chat/style/ChatList.css';
import { BsFillChatDotsFill } from 'react-icons/bs';

const ChatList = ({ user, ...props }) => {
  const userName = user.username;

  const [chatList, setChatList] = useState([]);

  //현재 로그인된 username이 포함된 채팅리스트만 받아온다
  useEffect(() => {
    fetch('http://localhost:8080/chat/chatList/' + userName)
      .then((res) => res.json())
      .then((res) => {
        setChatList(res);
      });
  }, [chatList]);

  let listItems = <></>;

  // useEffect로 받아온 정보가 0보다 크면 아래 ui를 적용시킨다
  if (chatList.length > 0) {
    listItems = (
      <>
        <ConversationList conversations={chatList} props={props} />
      </>
    );
  }

  //사용 컴포넌트 title, chatForm ( 내부에 핸들러 이벤트가 있음)
  return (
    <div>
      <div className="chat_list_header" style={{ color: '#198754' }}>
        <BsFillChatDotsFill size={35} />
        &nbsp;채팅 목록
      </div>

      <div>{listItems}</div>
    </div>
  );
};

/* store로부터 state를 가져와서 현재 컴포넌트의 props로 보냄 */
const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user,
  };
};

export default connect(mapStateToProps)(ChatList);
