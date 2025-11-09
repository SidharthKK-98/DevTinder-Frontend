import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = ()=> {
  const user=useSelector((store)=>store.user)
    
  if(!user){
    return <Navigate to={"/login"}></Navigate>
  }
  else{
    return <Outlet/>
  }
}

export default ProtectedRoutes
