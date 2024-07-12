import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";

let stompClient = null;

export default function Chat() {
  const navigate = useNavigate();
  const chatBoxRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [tab, setTab] = useState("staff");
  const [userData, setUserData] = useState({
    username: localStorage.getItem("username"),
    connected: false,
    message: "",
  });

  useEffect(() => {
    const checkAuthentication = () => {
      const userRole = localStorage.getItem("userRole");
      if (!userRole || userRole !== "ROLE_CUSTOMER") {
        navigate("/");
      } else {
        connect();
      }
    };
    checkAuthentication();
  }, []);

  const connect = () => {
    let Sock = new SockJS("http://localhost:8010/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe(
      "/user/" + userData.username + "/private",
      onPrivateMessage
    );
  };

  const onError = (err) => {
    console.log(err);
  };

  const onPrivateMessage = (payload) => {
    const message = JSON.parse(payload.body);

    setMessages((prevMessages) => [...prevMessages, message]);
    scrollToBottom();
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const sendMessage = () => {
    if (userData.message.trim().length === 0) {
      return;
    }
    if (stompClient) {
      // Prepare message object
      const message = {
        senderName: userData.username,
        receiverName: tab,
        message: userData.message.trim(),
        status: "MESSAGE",
      };

      // Send message via WebSocket
      stompClient.send("/app/private-message", {}, JSON.stringify(message));

      // Update messages state with the sent message
      setMessages((prevMessages) => [...prevMessages, message]);

      // Clear message input
      setUserData({ ...userData, message: "" });

      // Scroll to bottom of chat box
      scrollToBottom();
    }
  };

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      setTimeout(() => {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
      }, 50);
    }
  };

  const displayName = (username) => {
    if (username.toLowerCase().includes("staff")) {
      return "LittleLoveLy";
    } else {
      return "Tôi";
    }
  };

  return (
    <div>
      <Header />
      <div className="content">
        <Sidebar
          role={localStorage.getItem("userRole")}
          customerName={localStorage.getItem("name")}
          customerPoint={localStorage.getItem("point")}
        />

        {userData.connected ? (
          <>
            <div className="cus-chat">
              <div className="cus-chatbox" ref={chatBoxRef}>
                <ul className="chat-messages">
                  {messages.map((chat, index) => (
                    <li
                      key={index}
                      className={`message ${
                        chat.senderName === userData.username && "self"
                      }`}
                    >
                      {chat.senderName !== userData.username && (
                        <div className="avatar">
                          {displayName(chat.senderName)}
                        </div>
                      )}
                      <div className="cus-message-data">{chat.message}</div>
                      {chat.senderName === userData.username && (
                        <div className="avatar self">
                          {displayName(chat.senderName)}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="cus-input">
                <input
                  type="text"
                  placeholder="Nhập tin nhắn của bạn..."
                  value={userData.message}
                  onChange={handleMessage}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      sendMessage();
                    }
                  }}
                />
                <button onClick={sendMessage}>Gửi</button>
              </div>
            </div>
          </>
        ) : (
          <h4 className="standing-by">
            Tính năng tạm thời không khả dụng. Vui lòng thử lại sau.
          </h4>
        )}
      </div>
      <Footer />
    </div>
  );
}
