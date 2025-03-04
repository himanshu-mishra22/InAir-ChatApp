import React from 'react'
import logo from '../assets/wind.png'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { createRoom,joinRoom } from '../services/Room.Service'
import useChatContext from '../context/ChatContext'
import { useNavigate } from 'react-router'



function JoinCreateChat() {

    const[details,setDetails] = useState({
        userName:"",
        roomId:""
    });

    const {roomId,setRoomId,currentUser,setCurrentUser,connected,setConnected} = useChatContext();



    const navigate = useNavigate();

    function handleFormInputChange(e) {
        setDetails({...details,[e.target.name]:e.target.value})
    }

    function validateForm() {
        if(details.userName.trim() === "" || details.roomId.trim() === "") {
            toast.error("Please fill all the fields");
            return false;
        }
        return true;
    }



    async function joinChat() {
        if(validateForm()) {
            // console.log(details);
            try {
                const response = await joinRoom(details.roomId);
                // console.log(response);
                toast.success("Room joined successfully");

                setRoomId(response.roomId);
                setCurrentUser(details.userName);
                setConnected(true);
                navigate("/chat");
            } catch (error) {
                // console.log(error);
                if(error.response.status === 400) {
                    toast.error("Room not found");
                } else {
                    toast.error("Room joining failed");
                }
            }
        }
    }



    async function createChat() {
        if(validateForm()) {
            // console.log(details);
            try {
                const response = await createRoom(details.roomId);
                // console.log(response);
                toast.success("Room created successfully");  

                setRoomId(response.roomId);
                setCurrentUser(details.userName);
                setConnected(true);
                navigate("/chat");

            } catch (error) {
                // console.log(error);
                if(error.response.status === 400) {
                    toast.error("Room already exists");
                } else {
                    toast.error("Room creation failed");
                }
            }
        }  
    }

    


  return (
    <div className='flex items-center justify-center min-h-screen'>
        <div className='border flex flex-col gap-5 p-8 w-full max-w-md rounded dark:bg-gray-900'>
            <div>
                <img src={logo} alt="logo" className='w-10 h-10 mx-auto dark:invert' />
                <h1 className='text-2xl font-semibold text-center'>InAir</h1>
            </div>
            <h1 className='text-2xl font-semibold text-center'>Join/Create Chat</h1>
            <div className=''>
                <label htmlFor="name" className='block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300'>Username</label>
                <input type="text" 
                id='name' 
                className='w-full px-4 py-2 rounded-md border dark:bg-gray-800 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500' 
                onChange={handleFormInputChange}
                value={details.userName}
                name="userName"
                placeholder='Enter your username'
                />
            </div>

            <div className=''>
                <label htmlFor="roomId" className='block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300'>RoomId</label>
                <input type="text"
                 id='roomId' 
                 onChange={handleFormInputChange}
                 value={details.roomId}
                 name="roomId"
                 placeholder='Enter roomId'
                 className='w-full px-4 py-2 rounded-md border dark:bg-gray-800 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500' />
            </div>
           <div className='flex justify-center gap-5'>
           <button 
           onClick={joinChat}
           className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors'>Join</button>
           <button 
           onClick={createChat}
           className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors'>Create</button>
           </div>
        </div>
    </div>
  )
}

export default JoinCreateChat