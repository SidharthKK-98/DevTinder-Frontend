import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'


const Feed = () => {
    const dispatch=useDispatch()
    const feedData=useSelector((store)=>store.feed)
    console.log(feedData);
    

 const getFeed=async()=>{
    if(feedData )return

    try{
        const res=await axios.get(BASE_URL+"/user/feed?page=1&limit=2",{withCredentials:true})
        dispatch(addFeed(res.data))
        // console.log(res.data);
        
    }
    catch(err){
        console.log(err);
        
    }

 }

 useEffect(()=>{
    getFeed()
    

 },[])


  return (
   feedData && (<div className='flex justify-center items-center mt-6'>
      <UserCard user={feedData?.data[0]} fromFeed={true}/>
    </div>)
  )
}

export default Feed
