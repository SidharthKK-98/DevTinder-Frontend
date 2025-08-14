import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/connectionSlice';

function Connections() {

    const dispatch=useDispatch()
    const connections=useSelector((store)=>store.connection)
    console.log(connections);
    

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

    if(connections.length==0)return <div><h1 className='text-2xl font-bold'>No Connections Found</h1></div>

  return (

    
    <div>
      <h1 className=' text-center text-2xl font-bold '>Connections</h1>

        {      connections.map((connection)=>{
            return (
            <div className='flex justify-around text-center font-bold my-5 p-5 bg-base-300 rounded-2xl w-1/2 mx-auto'>
             <div>
                    <img 
                        src={connection.photoUrl} 
                        alt={`${connection.firstName} ${connection.lastName}`} 
                        style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "50%" }} 
                    />
             </div>  
            <div className=''>
                <div className='text-3xl' key={connection._id}>{connection.firstName+" "+connection.lastName}</div>
                <div key={connection._id}>{connection.age+" "+connection.gender}</div>
                <div key={connection._id}>{connection.about}</div>

            </div>

            </div>

            )
        })

        }  
  </div>
  )
}

export default Connections
