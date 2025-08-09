import React, { useState ,useEffect} from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'

const Login = () => {

    const [emailId,setEmailId]=useState("")
    const [password,setPassword]=useState("")
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [Error,setError]=useState("")
    
    

    const handleLogin=async()=>{
        try{
            const res= await axios.post(BASE_URL+"/login",{
            emailId:"ashok@gmail.co",password:"Ashok@12"
            },
             {withCredentials:true})

        console.log(res.data);
        dispatch(addUser(res.data))
        alert(res.data.message)
        
        navigate("/feed",{replace:true})

        
        }
        catch(err){
            console.error(err.response.data)
            setError(err.response.data.error)
            // alert(err.response.data.error)
        }
        
    }

  return (
    <div className=' flex justify-center my-15'>
        <div className="card card-border bg-base-300 w-96 ">
            <div className="card-body ">
            <h2 className="card-title justify-center">Login</h2>
            <div>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">Email Id</legend>
                <input 
                type="text" 
                // value={emailId}
                className="input" 
                placeholder="Type here"
                onChange={(e)=>setEmailId(e.target.value) }
                />
                
            </fieldset>

             <fieldset className="fieldset">
                <legend className="fieldset-legend">Password</legend>
                <input 
                type="password" 
                // value={password}
                className="input" 
                placeholder="Type here"
                onChange={(e)=>setPassword(e.target.value)}

                />
            </fieldset>
            <p className='font-bold text-red-500 text-center m-2'>{Error}</p>
            </div>
            <div className="card-actions justify-center">
            <button className="btn btn-primary "onClick={handleLogin}>Login</button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Login