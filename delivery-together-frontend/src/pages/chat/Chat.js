import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";


const Chat = (props) => {
  return (
    <div style={{ height: '94vh' }}>
      <div>
        아아아
      </div>
      <div style={{ position: "relative", height: "700px" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList>
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "just now",
                  sender: "Joe",
                }}
              />

            </MessageList>
            <MessageInput placeholder="Type message here" />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
};
export default Chat;
