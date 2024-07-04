import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import StaffHeader from "../components/StaffHeader";
import StaffSideBar from "../components/StaffSideBar";
import "../assets/css/chat.css";
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { getUserInfo } from "../services/auth/UsersService"
var stompClient = null;

export default function StaffChat() {
  const navigate = useNavigate();
  const chatBoxRef = useRef(null);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo("customer01");
        if (userInfo != null) {
          console.log(userInfo.name);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();

  }, [])

  useEffect(() => {
    const checkAuthentication = () => {
      const userRole = localStorage.getItem("userRole");
      if (!userRole || userRole !== "ROLE_STAFF") {
        navigate('/');
      } else {
        connect();
      }
    };
    checkAuthentication();
  }, [navigate]);

  const [privateChats, setPrivateChats] = useState(new Map());
  const [tab, setTab] = useState(""); // Start with an empty string for "standing" state
  const [userData, setUserData] = useState({
    username: localStorage.getItem('username'),
    receivername: '',
    connected: false,
    message: ''
  });


  const connect = () => {
    let Sock = new SockJS('http://localhost:8000/ws');
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  }

  const onConnected = () => {
    setUserData({ ...userData, "connected": true });
    stompClient.subscribe('/user/' + userData.username + '/private', onPrivateMessage);
    userJoin();
  }

  const userJoin = () => {
    var chatMessage = {
      senderName: userData.username,
      status: "JOIN"
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  }

  const onPrivateMessage = (payload) => {
    console.log(payload);
    var payloadData = JSON.parse(payload.body);
    if (privateChats.get(payloadData.senderName)) {
      privateChats.get(payloadData.senderName).push(payloadData);
      setPrivateChats(new Map(privateChats));
    } else {
      let list = [];
      list.push(payloadData);
      privateChats.set(payloadData.senderName, list);
      setPrivateChats(new Map(privateChats));
    }
    scrollToBottom()
  }

  const onError = (err) => {
    console.log(err);
  }

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, "message": value });
  }

  const sendPrivateValue = () => {
    if (userData.message.length === 0) {
      return
    }
    if (stompClient) {
      var chatMessage = {
        senderName: userData.username,
        receiverName: tab,
        message: userData.message,
        status: "MESSAGE"
      };

      if (userData.username !== tab) {
        privateChats.get(tab).push(chatMessage);
        setPrivateChats(new Map(privateChats));
      }
      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, "message": "" });
      scrollToBottom();
    }
  }

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      setTimeout(() => {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
      }, 50);
    }
  }


  return (
    <div>
      <StaffHeader />

      {userData.connected ? (
        <div className="manage-content">
          <StaffSideBar />

          {tab === "" ? (
            <div className="standing-by">
              <h2>Đang chờ...</h2>
              <p>Vui lòng chờ khách hàng bắt đầu trò chuyện.</p>
              <p>Khi một khách hàng gửi tin nhắn, tên của họ sẽ xuất hiện trong danh sách bên trái.</p>
            </div>
          ) : (
            <div className="staff-chat">
              <div className="staff-chatbox" ref={chatBoxRef}>
                <div>
                  <ul className="chat-messages">
                    {[...privateChats.get(tab)].map((chat, index) => (
                      <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                        {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                        <div className="message-data">{chat.message}</div>
                        {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
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
                      sendPrivateValue();
                    }
                  }}
                />
                <button type="button" onClick={sendPrivateValue}>Gửi</button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>Đang kết nối</p>
      )}

      <div className="customer-list">
        <ul>
          {[...privateChats.keys()]
            .filter(name => name !== userData.username)
            .map((name, index) => (
              <li
                onClick={() => { setTab(name) }}
                className={`member ${tab === name && "active"}`}
                key={index}
              >
                {name}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
