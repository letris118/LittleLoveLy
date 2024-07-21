import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import { getChatHistory } from "../services/auth/UsersService";
import _ from "lodash";
import { API_BASE_URL } from "../config";

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

  const scrollToBottom = useCallback(
    _.debounce(() => {
      if (chatBoxRef.current) {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
      }
    }, 100),
    [chatBoxRef]
  );

  useEffect(() => {
    const checkAuthentication = () => {
      const userRole = localStorage.getItem("userRole");
      if (!userRole || userRole !== "ROLE_CUSTOMER") {
        navigate("/");
      } else {
        connect();
        fetchChatHistory(localStorage.getItem("username"));
      }
    };
    checkAuthentication();
  }, [navigate]);

  useLayoutEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const fetchChatHistory = async (username) => {
    try {
      const response = await getChatHistory(username);
      if (response) {
        setMessages(response);
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  const connect = () => {
    let Sock = new SockJS(`${API_BASE_URL}/ws`);
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setUserData((prevUserData) => ({ ...prevUserData, connected: true }));
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
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData((prevUserData) => ({ ...prevUserData, message: value }));
  };

  const sendMessage = () => {
    if (userData.message.trim().length === 0) {
      return;
    }
    if (stompClient) {
      const message = {
        senderName: userData.username,
        receiverName: tab,
        message: userData.message.trim(),
        status: "MESSAGE",
      };

      stompClient.send("/app/private-message", {}, JSON.stringify(message));
      setMessages((prevMessages) => [...prevMessages, message]);
      setUserData((prevUserData) => ({ ...prevUserData, message: "" }));
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
          <div className="cus-chat">
            <div className="cus-chatbox" ref={chatBoxRef}>
              <ul className="chat-messages">
                {messages.map((chat, index) => (
                  <li
                    key={index}
                    className={`message ${
                      chat.senderName === userData.username ? "self" : ""
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
