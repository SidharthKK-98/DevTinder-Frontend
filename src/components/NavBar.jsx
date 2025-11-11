import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
import { removeUser } from '../utils/userSlice'

const NavBar = () => {


  const user=useSelector((store)=>store.user)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  console.log(user);

  useEffect(() => {
   
  }, [user])
  

  const handleLogout=async()=>{
    try{
    await axios.post(BASE_URL+"/logout",{},{withCredentials:true})
    dispatch(removeUser())
    navigate("/login",{replace:true})
    }
    catch(err){
      console.log(err);
      
    }
  }
  
  return (
    <div> 
          <div className="navbar bg-base-200 shadow-sm">
        <div className="flex-1">
          <Link to={user?"/feed":"/"} className="btn btn-ghost text-xl"><i class="fa-brands fa-connectdevelop"></i>DevTinder </Link>
        </div>
        <div className="flex gap-2">

          {user && (
            <div className="dropdown dropdown-end flex items-center">
              <p className='text-white mx-5'>    Welcome {user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : ""}</p>

            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              
              
                
                <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user?.photoUrl} />
              </div>
              
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-20  w-52 p-2 shadow ">
              <li>
                <Link to={"/profile"} className="justify-between">
                  Profile
                </Link>
              </li>
              <li><Link to={"/connections"}>Connections</Link></li>
              <li><Link to={"/request"}>Request</Link></li>
              <li><Link to={"/premium"}>Premium</Link></li>


              <li><a onClick={handleLogout}>Logout</a></li>
            </ul>
          </div>
          )}
        </div>
      </div>
      </div>
  )
}

export default NavBar