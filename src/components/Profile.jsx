import React, { useEffect } from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'


const Profile = () => {

  const user=useSelector((store)=>store.user)
  console.log("user",user);
  
  
  return (

   user&&( <div className=''>
      <EditProfile  user={user}/>
    </div>)
  )
}

export default Profile