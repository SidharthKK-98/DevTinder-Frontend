import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addRequest } from '../utils/requestSlice';
import { BASE_URL } from '../utils/constants';

function Request() {

    const requests= useSelector((store)=>store.request)
    console.log(requests)

    const dispatch=useDispatch()

    const fetchRequest=async()=>{


        try{

            const request= await axios.get(BASE_URL+"/user/request/recieved",{withCredentials:true})
            console.log(request);
            
            dispatch(addRequest(request.data.recievedRequests))

        }
        catch(err){
            console.log(err);
            
        }

    }

    useEffect(()=>{
        fetchRequest()
    },[])

 if(!requests)return

    if(requests.length==0)return <div><h1 className='text-2xl font-bold'>No Request Found</h1></div>

  return (

    
    <div>
      <h1 className=' text-center text-2xl font-bold '>Requests</h1>

        {      requests.map((request)=>{
            return (
            <div key={request._id}className='flex justify-between items-center text-center font-bold my-5 p-5 bg-base-300 rounded-2xl w-2/3 mx-auto'>
             <div>
                    <img 
                        src={request.photoUrl} 
                        alt={`${request.fromUserId.firstName} ${request.fromUserId.lastName}`} 
                        style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "50%" }} 
                    />
             </div>  
            <div className=''>
                <div className='text-3xl' key={request.fromUserId._id}>{request.fromUserId.firstName+" "+request.fromUserId.lastName}</div>
                {/* <div key={request._id}>{request.age+" "+request.gender}</div>
                <div key={request._id}>{request.about}</div> */}

            </div>
            <div className='mx-2'>

                    <button className="btn btn-error mx-2">Reject</button>
                    <button className="btn btn-success mx-2">Accept</button>


            </div>

            </div>

            )
        })

        }  
  </div>
  )
}

export default Request
