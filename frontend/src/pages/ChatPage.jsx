import React, { useState, useEffect, useRef } from 'react';
import { MdAttachFile, MdSend } from 'react-icons/md';
import useChatContext from '../context/ChatContext';
import { useNavigate } from 'react-router';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { API_URL } from '../config/AxiosHelper';
import { toast } from 'react-hot-toast';
import { getMessages } from '../services/Room.Service';

function ChatPage() {
    const { roomId, currentUser, connected, setConnected, setRoomId, setCurrentUser } = useChatContext();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const chatBoxRef = useRef(null);
    const [stompClient, setStompClient] = useState(null);
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (!connected || !roomId || !currentUser) {
    //         // navigate('/');
    //     }
    // }, [connected, roomId, currentUser, navigate]);

    useEffect(() => {
        const connectWebSocket = async () => {
            const socket = new SockJS(`${API_URL}/chat`);
            const client = Stomp.over(socket);
            
            client.connect({}, () => {
                setStompClient(client);
                // toast.success('Connected to the server');

                client.subscribe(`/topic/room/${roomId}`, (message) => {
                    const receivedMessage = JSON.parse(message.body);
                    setMessages(prevMessages => Array.isArray(prevMessages) ? [...prevMessages, receivedMessage] : [receivedMessage]);

                });
            });

            return () => client.disconnect(); // Cleanup on unmount
        };

        if (connected) {
            connectWebSocket();
        }
    }, [roomId, connected]);

    useEffect(() => {
        async function fetchMessages() {
            try {
                const response = await getMessages(roomId, 50, 0);
                console.log(response);
                
                setMessages(response);
            } catch (error) {
                console.error(error);
            }
        }

        if (connected) {
            fetchMessages();
        }
    }, [roomId, connected]);

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scroll({
                top: chatBoxRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [messages]);

    const sendMessage = () => {
        if (input.trim() && stompClient && connected) {
            const message = {
                sender: currentUser,
                content: input,
                roomId: roomId,
            };

            stompClient.send(`/app/sendMessage/${roomId}`, {}, JSON.stringify(message));
            setInput('');
        }
    };

    const handleLeave = () => {
        if (stompClient) {
            stompClient.disconnect();
        }
        setConnected(false);
        setRoomId(null);
        setCurrentUser(null);
        navigate('/');
    };

    return (
        <div>
            {/* Header */}
            <header className="flex items-center justify-between p-4 border-b dark:bg-gray-900 fixed w-full h-20">
                <div>
                    <h1 className="text-2xl font-semibold">Room Name</h1>
                    <p className="text-sm text-gray-500">
                        <span className="font-bold">{roomId}</span>
                    </p>
                </div>
                <div>
                    <h1 className="text-2xl font-semibold">
                        User: <span className="font-bold">{currentUser}</span>
                    </h1>
                </div>
                <div>
                    <button 
                        onClick={handleLeave}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                    >
                        Leave
                    </button>
                </div>
            </header>

            {/* Chat Container */}
            <main ref={chatBoxRef} className="h-screen overflow-y-auto p-20 dark:bg-gray-900">
                {messages && messages.map((message, index) => (
                    <div key={index} className={`flex ${message.sender === currentUser ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex flex-col gap-2 my-2 max-w-xs ${message.sender === currentUser ? 'bg-blue-500' : 'bg-gray-500'} rounded-md p-2`}>
                            <div className="flex items-center gap-2">
                                <img
                                    src={message.sender === currentUser ? 'https://i.pravatar.cc/500' : 'https://i.pravatar.cc/400'}
                                    alt="user"
                                    className="w-10 h-10 rounded-full"
                                />
                                <div className="p-2 flex flex-col gap-1">
                                    <p className="font-bold">{message.sender}</p>
                                    <p className="text-sm">{message.content}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </main>

            {/* Input Container */}
            <div className="fixed bottom-10 h-16 w-full">
                <div className="flex items-center justify-between gap-4 h-full rounded w-2/3 mx-auto">
                    <input
                        type="text"
                        placeholder="Message"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="h-full w-full rounded-md p-2 dark:bg-gray-800 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={sendMessage}
                        onKeyDown={(e) => e.key === 'Enter' && console.log('Enter pressed')
                        }
                        className="bg-green-500 h-15 w-15 flex items-center justify-center rounded-full text-white px-2 py-2 hover:bg-green-600 transition-colors"
                    >
                        <MdSend size={20} />
                    </button>
                </div>
                
            </div>
        </div>
    );
}

export default ChatPage;
