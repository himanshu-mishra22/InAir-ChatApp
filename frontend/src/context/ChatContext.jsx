import { createContext, useState, useContext } from "react";
const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [roomId, setRoomId ] = useState(null);
    const [currentUser,setCurrentUser] = useState(null);
    const [connected,setConnected] = useState(false);
    return (
        <ChatContext.Provider value={{roomId, setRoomId ,currentUser,setCurrentUser,connected,setConnected }}>{children}</ChatContext.Provider>
    );
};

const useChatContext = ()=> useContext(ChatContext); 
export default useChatContext;