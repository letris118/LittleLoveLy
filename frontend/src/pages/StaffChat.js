import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import "../assets/css/chat.css";
import StaffHeader from "../components/StaffHeader";
import StaffSideBar from "../components/StaffSideBar";
import { getUserInfo } from "../services/auth/UsersService";
var stompClient = null;

export default function StaffChat() {
  const navigate = useNavigate();
  const chatBoxRef = useRef(null);
  const [conversations, setConversations] = useState(new Map());
  const [tab, setTab] = useState("");
  const [userData, setUserData] = useState({
    username: localStorage.getItem("username"),
    receivername: "",
    connected: false,
    message: "",
  });
  const [userNames, setUserNames] = useState(new Map());

  useEffect(() => {
    const fetchUserNames = async () => {
      const names = new Map();
      for (const username of conversations.keys()) {
        if (username !== userData.username) {
          try {
            const userInfo = await getUserInfo(username);
            if (userInfo && userInfo.name) {
              names.set(username, userInfo.name);
            }
          } catch (error) {
            console.error(`Error fetching user info for ${username}:`, error);
          }
        }
      }
      setUserNames(names);
    };

    fetchUserNames();
  }, [conversations, userData.username]);

  useEffect(() => {
    const checkAuthentication = () => {
      const userRole = localStorage.getItem("userRole");
      if (!userRole || userRole !== "ROLE_STAFF") {
        navigate("/");
      } else {
        connect();
      }
    };
    checkAuthentication();
  }, [navigate]);

  const connect = () => {
    let Sock = new SockJS("http://localhost:8000/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe(
      "/user/" + userData.username + "/private",
      onPrivateMessage
    );
    userJoin();
  };

  const userJoin = () => {
    var chatMessage = {
      senderName: userData.username,
      status: "JOIN",
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  };

  const onPrivateMessage = (payload) => {
    var payloadData = JSON.parse(payload.body);
    if (conversations.get(payloadData.senderName)) {
      conversations.get(payloadData.senderName).push(payloadData);
      setConversations(new Map(conversations));
    } else {
      let list = [];
      list.push(payloadData);
      conversations.set(payloadData.senderName, list);
      setConversations(new Map(conversations));
    }
    scrollToBottom();
  };

  const onError = (err) => {
    console.log(err);
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const sendMessage = () => {
    if (userData.message.length === 0) {
      return;
    }
    if (stompClient) {
      var chatMessage = {
        senderName: userData.username,
        receiverName: tab,
        message: userData.message,
        status: "MESSAGE",
      };

      if (userData.username !== tab) {
        conversations.get(tab).push(chatMessage);
        setConversations(new Map(conversations));
      }
      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
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
      return userNames.get(username);
    }
  };

  return (
    <div>
      <StaffHeader />
      <div className="content" style={{backgroundColor: "#f5f5f5"}}>
        <StaffSideBar />

        {userData.connected ? (
          <>
            {tab === "" ? (
              <div className="standing-by">
                <h3>Hiện không có tin nhắn</h3>
                <p>Vui lòng chờ khách hàng bắt đầu trò chuyện.</p>
                <p>
                  Khi một khách hàng gửi tin nhắn, tên của họ sẽ xuất hiện trong
                  danh sách bên phải.
                </p>
              </div>
            ) : (
              <div className="staff-chat">
                <div className="staff-chatbox" ref={chatBoxRef}>
                  <div>
                    <ul className="chat-messages">
                      {[...conversations.get(tab)].map((chat, index) => (
                        <li
                          className={`message ${
                            chat.senderName === userData.username && "self"
                          }`}
                          key={index}>
                          {chat.senderName !== userData.username && (
                            <div className="avatar">
                              {displayName(chat.senderName)}
                            </div>
                          )}
                          <div className="message-data">{chat.message}</div>
                          {chat.senderName === userData.username && (
                            <div className="avatar self">
                              {displayName(chat.senderName)}
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="staff-input">
                  <input
                    type="text"
                    placeholder="Nhập tin nhắn"
                    value={userData.message}
                    onChange={handleMessage}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        sendMessage();
                      }
                    }}
                  />
                  <button type="button" onClick={sendMessage}>
                    Gửi
                  </button>
                </div>
              </div>
            )}
            <div className="customer-list">
              <ul>
                {[...conversations.keys()]
                  .filter((name) => name !== userData.username)
                  .map((username, index) => (
                    <li
                      onClick={() => {
                        setTab(username);
                      }}
                      className={`member ${tab === username && "active"}`}
                      key={index}>
                      {userNames.get(username) || username}
                    </li>
                  ))}
              </ul>
            </div>
          </>
        ) : (
          <h4 className="standing-by">
            Tính năng tạm thời không khả dụng. Vui lòng thử lại sau.
          </h4>
        )}
      </div>
    </div>
  );
}
