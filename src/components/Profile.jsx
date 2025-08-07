import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Profile = () => {

  const user=useSelector((store)=>store.user)
  const navigate=useNavigate()

  useEffect(() => {
      if(!user){
        navigate("/login")
      }
     
    
     
    }, [user])
  return (

    <div>Profile</div>
  )
}

export default Profile