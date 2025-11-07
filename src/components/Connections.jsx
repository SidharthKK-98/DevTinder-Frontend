import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/connectionSlice';
import { Link } from "react-router-dom";
import { createSocketConnection } from '../utils/socket'
import { addOnlineUsers } from '../utils/chatSlice'



function Connections() {

    const user=useSelector((store)=>store.user)
    const userId=user?._id

    const dispatch=useDispatch()
    const connections=useSelector((store)=>store.connection)
    console.log( connections)
    const chat=useSelector((store)=>store.chat)



    useEffect(() => {

        if(!userId){
        return
        }
        
        const socket= createSocketConnection()

        socket.emit("usersConnected",{userId})

        socket.on("onlineUsers",(onlineUsers)=>{

         dispatch(addOnlineUsers(onlineUsers))

        })


         return ()=>{
                socket.disconnect()
            }



    }, [userId])

    useEffect(() => {
        console.log("this is from chatSlice",chat);

    }, [chat])
    
    

    // console.log("this is from chatSlice",chat);
    

    const fetchConnection=async()=>{

        try{

             const fetchConnection=await axios.get(BASE_URL+"/user/connections",{withCredentials:true})
             console.log(fetchConnection);
             dispatch(addConnection(fetchConnection.data.data))

        }
        catch(err){
            console.log(err);
            
        }
       

    }

    useEffect(() => {
     
        fetchConnection()

    }, [])

    if(!connections)return

    if(connections.length==0)return <div><h1 className='text-center mt-6 font-bold text-3xl text-orange-300'>No Connections Found</h1></div>

  return (

    
    <div>
      <h1 className=' text-center text-2xl font-bold '>Connections</h1>

        {      connections?.map((connection)=>{
            return (
                <div >
                     <div key={connection._id  } className='relative flex justify-between text-center font-bold my-5 p-5 bg-base-300 rounded-2xl w-1/2 mx-auto items-center'>
                    <div className='flex justify-around items-center '> 
  
                                <div>
                                        <img 
                                            src={connection.photoUrl} 
                                            alt={`${connection.firstName} ${connection.lastName}`} 
                                            style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "50%" }} 
                                        />
                                </div>  
                                
                                <div className='mx-10'>
                                    <div className='text-3xl' key={connection._id}>{connection.firstName+" "+connection.lastName}</div>
                                    <div key={connection._id}>{connection?.age+" "+connection?.gender}</div>
                                    <div key={connection._id}>{connection?.about}</div>

                                </div>

                    </div>
    

                  <Link to={"/chat/"+connection._id}> <button  className='btn btn-secondary  '>Chat

                    </button></Link> 
                    {chat?.includes(connection._id.toString())&&
                        (<span className="absolute top-2 right-2 indicator-item status status-success "></span>)

                    }

            </div>

  </div>
           

            )
        })

        }  
  </div>
  )
}

export default Connections
