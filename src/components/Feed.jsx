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
    if(feedData && feedData.data && feedData.data.length > 0 )return

    try{
        const res=await axios.get(BASE_URL+"/user/feed?page=1&limit=3",{withCredentials:true})
        dispatch(addFeed(res.data))
        
    }
    catch(err){
        console.log(err);
        
    }

 }

 useEffect(()=>{
    getFeed()
    

 },[])

if(!feedData)return
 if(feedData.data.length == 0)return <div>
   <h1 className='text-center mt-5 font-bold text-2xl'>No new Users Found</h1>
 </div>

  return (

   feedData?.data?.length>0 && (<div className='flex justify-center items-center mt-6'>
      <UserCard user={feedData?.data[0]} fromFeed={true}/>
    </div>)
  )
}

export default Feed
