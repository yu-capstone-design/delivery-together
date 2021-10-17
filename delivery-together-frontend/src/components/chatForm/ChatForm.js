import React, { useState } from 'react';

import FormButton from '../controls/buttons/FormButton';
import AttachmentIcon from '../controls/icons/attachmentIcon/AttachmentIcon';

import './ChatForm.scss';

const isMessageEmpty = (textMessage) => {
  return adjustTextMessage(textMessage).length === 0;
}

const adjustTextMessage = (textMessage) => {
  return textMessage.trim();
};

const ChatForm = ({ selectedConversation, onMessageSubmitted }) => {
  const [textMessage, setTextMessage] = useState('');
  const disableButton = isMessageEmpty(textMessage);
  let formContents = null;
  let handleFormSubmit = null;

  if (selectedConversation) {
    formContents = (
      <>
        <div title="Add Attachment">
          <AttachmentIcon />
        </div>
        <input
          type="text"
          placeholder="type a message"
          value={textMessage}
          onChange={ (e) => { setTextMessage(e.target.value); } } />
        <FormButton disabled={ disableButton }>Send</FormButton>
      </>
    );

    handleFormSubmit = (e) => {
      e.preventDefault();
      console.log(textMessage)

      var chat = {
        msg : textMessage,
        sender : '김덕중',
        createdAt : '오늘',
        roomNum : 11
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

      if (!isMessageEmpty(textMessage)) {
        onMessageSubmitted(textMessage);
        setTextMessage('');
      }
    };
  }

  return (
    <form id="chat-form" onSubmit={handleFormSubmit}>
      {formContents}
    </form>
  );
}

export default ChatForm;
