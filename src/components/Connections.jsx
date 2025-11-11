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

    
    <div className="p-3 sm:p-5">
      <h1 className=' text-center text-2xl font-bold '>Connections</h1>

        {      connections?.map((connection)=>{
            return (
                <div >
                     <div key={connection._id  } className='relative flex flex-col m-4 sm:flex-row justify-between items-center text-center sm:text-left font-bold p-4 sm:p-5 bg-base-300 rounded-2xl w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto shadow-md'>
                    <div className='flex justify-around items-center '> 
  
                                <div className='flex flex-col sm:flex-row items-center gap-4 sm:gap-8'>
                                        <img 
                                            src={connection.photoUrl} 
                                            alt={`${connection.firstName} ${connection.lastName}`} 
                                            style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "50%" }} 
                                        />
                                </div>  
                                
                                <div className='mx-10'>
                                    <div className='text-3xl sm:text-2xl' key={connection._id}>{connection.firstName+" "+connection.lastName}</div>
                                    <div key={connection._id}>{connection?.age+" "+connection?.gender}</div>
                                    <div key={connection._id}>{connection?.about}</div>

                                </div>

                    </div>
    
                  <div className="mt-4 sm:mt-0">
                  <Link to={"/chat/"+connection._id}> <button  className='btn btn-secondary sm:btn-md  '>Chat

                    </button></Link> 

                     </div>
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
