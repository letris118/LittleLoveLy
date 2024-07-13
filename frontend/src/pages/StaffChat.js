import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import "../assets/css/chat.css";
import StaffHeader from "../components/StaffHeader";
import StaffSideBar from "../components/StaffSideBar";
import { getUserInfo } from "../services/auth/UsersService";
import {
  getChatHistory,
  getCustomersUsedToChat,
  markMessagesAsRead,
} from "../services/auth/UsersService";
var stompClient = null;

export default function StaffChat() {
  const navigate = useNavigate();
  const chatBoxRef = useRef(null);
  const [conversations, setConversations] = useState(new Map());
  const [tab, setTab] = useState("");
  const tabRef = useRef(tab);
  const [userData, setUserData] = useState({
    username: "staff",
    receivername: "",
    connected: false,
    message: "",
  });
  const [userNames, setUserNames] = useState(new Map());
  const [unreadStatus, setUnreadStatus] = useState(new Map());

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
        fetchCustomersUsedToChat();
        connect();
      }
    };
    checkAuthentication();
  }, [navigate]);

  const fetchCustomersUsedToChat = async () => {
    try {
      const response = await getCustomersUsedToChat();
      if (response) {
        const unreadMap = new Map();
        for (const customer of response) {
          const { username, allMessagesRead } = customer;
          conversations.set(username, []);
          unreadMap.set(username, !allMessagesRead);
        }
        setConversations(new Map(conversations));
        setUnreadStatus(unreadMap);
      }
    } catch (error) {
      console.error("Error fetching customers used to chat:", error);
    }
  };

  const fetchChatHistory = async (username) => {
    try {
      const response = await getChatHistory(username);
      if (response) {
        return new Map([[username, response]]);
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

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
    const sender = payloadData.senderName;
    if (tabRef.current === sender) {
      // If the sender is the current tab, add the message to conversations
      let currentConversations = conversations.get(sender) || [];
      currentConversations.push(payloadData);
      setConversations(
        new Map(conversations.set(sender, currentConversations))
      );
      try {
        markMessagesAsRead(sender);
      } catch (error) {
        console.error("Error marking messages as read:", error);
      }
    } else {
      // If the sender is not the current tab, update unread status only
      setUnreadStatus((prev) => new Map(prev.set(sender, true)));
    }
    scrollToBottom();
  };

  useEffect(() => {
    tabRef.current = tab;
  }, [tab]);

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
      }, 100);
    }
  };

  const displayName = (username) => {
    if (username.toLowerCase().includes("staff")) {
      return "LittleLoveLy";
    } else {
      return userNames.get(username);
    }
  };

  const handleOpenChat = async (username) => {
    if (tab && conversations.has(tab)) {
      setConversations((prev) => new Map(prev).set(tab, []));
    }
    const newConversations = await fetchChatHistory(username);
    if (newConversations) {
      setConversations((prev) => new Map([...prev, ...newConversations]));
    }
    setTab(username);
    setUnreadStatus((prev) => new Map(prev.set(username, false)));
    try {
      await markMessagesAsRead(username);
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [tab]);

  return (
    <div>
      <StaffHeader />
      <div className="content" style={{ backgroundColor: "#f5f6fa" }}>
        <StaffSideBar />

        {userData.connected ? (
          <>
            {tab === "" ? (
              <div className="staff-chat">
                <p>
                  Vui lòng chọn 1 khách hàng trong danh sách bên phải để bắt đầu
                  cuộc trò chuyện!
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
                          key={index}
                        >
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
                        handleOpenChat(username);
                      }}
                      className={`member ${tab === username && "active"}`}
                      key={index}
                    >
                      {unreadStatus.get(username) && (
                        <span className="staff-unread-chat"> ! </span>
                      )}
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
