import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../utils/socket'
import { useSelector } from 'react-redux'

function Chat() {

    const user=useSelector((store)=>store.user)
    const userId=user?._id

    const {targetUserId}=useParams()
    const [messages,setMessages]=useState([])
    const [newMessage,setNewMessage]=useState("")

    useEffect(() => {

       
    if(!userId){
        return
    }

    const socket= createSocketConnection()

    socket.emit("joinChat",{userId,targetUserId})

    socket.on("messageReceived",({firstName,text})=>{
        console.log(firstName+" : "+text);
        setMessages((prevMessages) => [...prevMessages, { firstName, text }]);
        
    })

    return ()=>{
        socket.disconnect()
    }

    }, [userId,targetUserId])

    const sendMessage=()=>{

        const socket= createSocketConnection()
        socket.emit("sendMessage",{firstName:user.firstName,userId,targetUserId,text:newMessage})
        setNewMessage("")

    }
    


  return (
    <div className='w-1/2 mx-auto  border-2 border-gray-600 rounded m-5 overflow-x-hidden h-dvh flex flex-col '>
        <h1 className='text-center text-blue-300 font-bold text-2xl p-5 border-b border-gray-600'>Chat</h1>
        
        <div className='p-5 border border-gray-600 rounded h-full overflow-y-auto'>
            {

            messages.map((msg,index)=>{
              return  (

                <div key={index} className="chat chat-start">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS chat bubble component"
                        src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                    />
                    </div>
                 </div>

                 <div className="chat-header">
                            {msg.firstName}
                            <time className="text-xs opacity-50">12:45</time>
                 </div>

                        <div className="chat-bubble">{msg.text}</div>
                        <div className="chat-footer opacity-50">Delivered</div>
             </div>

             


            )})
        
            
            }

        
        </div>

        <div className='flex justify-center gap-2 m-5 w-full  '>
            <input value={newMessage} onChange={(e)=>setNewMessage(e.target.value)} type="text" placeholder="Type here" className="input w-3/4" />
            <button onClick={sendMessage} className='btn btn-secondary'>Send</button>
        </div>

    </div>
  )
}

export default Chat
