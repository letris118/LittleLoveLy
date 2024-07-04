import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
var stompClient = null;

export default function Chat() {

    const navigate = useNavigate();
    const chatBoxRef = useRef(null);

    const [privateChats, setPrivateChats] = useState(new Map());
    const [tab, setTab] = useState("staff01");
    const [userData, setUserData] = useState({
        username: localStorage.getItem('username'),
        receivername: '',
        connected: false,
        message: ''
    });

    useEffect(() => {
        console.log(userData);
    }, [userData]);

    const connect = () => {
        let Sock = new SockJS('http://localhost:8000/ws');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected = () => {
        setUserData({ ...userData, "connected": true });
        stompClient.subscribe('/user/' + userData.username + '/private', onPrivateMessage);
        initiateChatWithStaff();
    }

    const initiateChatWithStaff = () => {
        if (!privateChats.get("staff01")) {
            privateChats.set("staff01", []);
            setPrivateChats(new Map(privateChats));
            setTab("staff01");

            var chatMessage = {
                senderName: userData.username,
                receiverName: "staff01",
                status: "JOIN"
            };
            stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
        }
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

    useEffect(() => {
        const checkAuthentication = () => {
            const userRole = localStorage.getItem("userRole");
            if (!userRole || userRole !== "ROLE_CUSTOMER") {
                navigate('/');
            } else {
                connect()
            }
        };
        checkAuthentication();
    }, []);


    const nameMapping =  {
        "staff01": "LittleLoveLy"
    }

    return (
        <div>
            <Header />

            {userData.connected ?
                <div className="manage-content">
                    <Sidebar />
                    <div className="staff-chat">
                        <div className="staff-chatbox" ref={chatBoxRef}>
                            <div>
                                <ul className="chat-messages">
                                    {[...privateChats.get(tab)].map((chat, index) => (
                                        <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                                            {chat.senderName !== userData.username && <div className="avatar">{nameMapping[chat.senderName] || "Tôi"}</div>}
                                            <div className="message-data">{chat.message}</div>
                                            {chat.senderName === userData.username && <div className="avatar self">{nameMapping[chat.senderName] || "Tôi"}</div>}
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
                </div>
                :
                <p>Đang kết nối</p>
            }
        </div>
    )
}
