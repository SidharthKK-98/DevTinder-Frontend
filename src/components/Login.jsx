import React, { useState ,useEffect} from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'


const Login = () => {

    const [emailId,setEmailId]=useState("")
    const [password,setPassword]=useState("")
    const [firstName,setFirstName]=useState("")
    const [lastName,setLastName]=useState("")
    const [isLoginForm,setIsLoginForm]=useState(true)


    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [Error,setError]=useState("")
    
    useEffect(() => {
  if (Error) setError("");
}, [emailId, password, firstName, lastName]);


    const handleLogin=async()=>{

            if (!emailId || !password) {
        setError("Please fill in all fields");
        return;
    }
        try{
            const res= await axios.post(BASE_URL+"/login",{
            emailId,password
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
            console.log(Error)
            //  alert(err.response.data)
        }
        
    }


    const handleSignUp=async()=>{

        if (!firstName || !lastName || !emailId || !password) {

            setError("Please fill in all fields");
            return;
        }
        try{

            const res= await axios.post(BASE_URL+"/signup",{
                firstName,
                lastName,
                emailId,
                password
            },{withCredentials:true})
            
            dispatch(addUser(res.data))
            alert(res.data.message)
            navigate("/profile",{replace:true})



        }
        catch(err){
            setError(err.response)
            
        }
    }

  return (
    <div className=' flex justify-center my-15'>
        <div className="card card-border bg-base-300 w-96 ">

            <div className="card-body ">
            <h2 className="card-title justify-center">{isLoginForm ? "Login" : "SignUp"}</h2>

            <div>
                {!isLoginForm && <>
                <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input 
                type="text" 
                // value={emailId}
                className="input" 
                placeholder="Type here"
                onChange={(e)=>setFirstName(e.target.value) }
                />
                
            </fieldset>

            <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input 
                type="text" 
                // value={emailId}
                className="input" 
                placeholder="Type here"
                onChange={(e)=>setLastName(e.target.value) }
                />
                
            </fieldset>
            </>
            }

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
            <button className="btn btn-primary "onClick={isLoginForm ? handleLogin : handleSignUp}>{isLoginForm ? "Login" : "SignUp"}</button>
            </div>

            <p className='text-center font-semibold text-blue-500 mt-2 cursor-pointer'onClick={()=>setIsLoginForm((value)=>!value ,setError(""))}>{isLoginForm ? "New User? SignUp here" : "Existing User? Login here"}</p>
            </div>
        </div>
    </div>
  )
}

export default Login