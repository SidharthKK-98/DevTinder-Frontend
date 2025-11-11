import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { removeUserFromFeed } from '../utils/feedSlice'

const UserCard = ({user,fromFeed}) => {

    const {_id,firstName,lastName,age,gender,photoUrl,about}=user

    const dispatch =useDispatch()

    const handleSendRequest = async (status,userId)=>{

      try{
        const res = await axios.post(BASE_URL+"/request/send/"+status+"/"+userId, {}, {withCredentials:true})
        dispatch(removeUserFromFeed(userId))
      }
      catch(err){
        console.log(err);
        
      }
    }
    
  return (
    <div>
                <div className="card bg-base-300 w-80  sm:w-96 shadow-sm">
        <figure>
            <img
            src={photoUrl}
            alt="profile pic" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">{firstName +" "+lastName}</h2>
            { age &&(<h2>{age}</h2>)}      
             {gender&&(<h2>{gender}</h2>)}
            { about&&(  <p>{about}</p>)}
            
            {fromFeed&&(
              <div className="card-actions justify-center">
              <button className="btn btn-success btn-green-400" onClick={()=>handleSendRequest("interested",_id)}>Interested</button>
              <button className="btn btn-error" onClick={()=>handleSendRequest("ignore",_id)}>Ignore</button>

             </div>
            )}
        </div>
        </div>
    </div>
  )
}

export default UserCard