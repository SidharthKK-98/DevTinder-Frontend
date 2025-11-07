import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../utils/socket'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'


function Chat() {

    const user=useSelector((store)=>store.user)
    const userId=user?._id

    const {targetUserId}=useParams()
    const [messages,setMessages]=useState([])
    const [newMessage,setNewMessage]=useState("")
    // const dispatch=useDispatch()

    const fetchMessages=async()=>{

        try{

            const chat=await axios.get(BASE_URL+"/chat/"+targetUserId,{withCredentials:true})
            console.log(chat.data.messages);
            setMessages(chat.data.messages)

            
        }
        catch(err){
            console.log(err);
            
        }

    }

    useEffect(() => {
      
        fetchMessages()
    
      
    }, [])
    

    useEffect(() => {

       
            if(!userId){
                return
            }

            const socket= createSocketConnection()

            

            
            socket.emit("joinChat",{userId,targetUserId})

            socket.on("messageReceived",({firstName,lastName,text})=>{
                console.log(firstName+" : "+text);
                setMessages((prevMessages) => [...prevMessages, { firstName,lastName, text }]);
                
            })

            return ()=>{
                socket.disconnect()
            }

    }, [userId,targetUserId])





    const sendMessage=()=>{

        const socket= createSocketConnection()
        socket.emit("sendMessage",{firstName:user.firstName,lastName:user.lastName,userId,targetUserId,text:newMessage})
        setNewMessage("")

    }
    


  return (
    <div className='w-1/2 mx-auto  border-2 border-gray-600 rounded m-5 overflow-x-hidden h-dvh flex flex-col '>
        <h1 className='text-center text-blue-300 font-bold text-2xl p-5 border-b border-gray-600'>Chat</h1>
        
        <div className='p-5 border border-gray-600 rounded h-full overflow-y-auto'>
            {

            messages?.map((msg,index)=>{
              return  (

                <div key={index} className={"chat "+(user.firstName===msg.senderId.firstName? "chat-end":"chat-start")}>
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS chat bubble component"
                        src={msg.senderId.photoUrl}
                    />
                    </div>
                 </div>

                 <div className="chat-header">
                            {msg.senderId.firstName+" "+msg.senderId.lastName}

                            <time className="text-xs opacity-50">{new Date(msg.createdAt).toLocaleTimeString()}</time>
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
