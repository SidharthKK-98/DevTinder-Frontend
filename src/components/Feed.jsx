import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Feed = () => {

  const user=useSelector((store)=>store.user)
  const navigate=useNavigate()

//   useEffect(() => {
    
//       if(!user){
//         navigate("/login")
//       }
     
    
     
//     }, [user,navigate])
  return (
    <div>
      Feed
    </div>
  )
}

export default Feed
