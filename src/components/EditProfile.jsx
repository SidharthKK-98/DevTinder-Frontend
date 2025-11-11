import React, { useEffect, useState } from 'react'
import UserCard from './UserCard'
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({user}) => {

    

     const [firstName,setFirstName]=useState(user?.firstName)
    const [lastName,setLastName]=useState(user?.lastName)
    const [age,setAge]=useState(user?.age || "")
    const [gender,setGender]=useState(user?.gender)
    const [photoUrl,setPhotoUrl]=useState(user?.photoUrl)
    const [about,setAbout]=useState(user?.about)

    const [error,setError]=useState("")
    const dispatch=useDispatch()

    const handleEdit=async()=>{
        try{
            const res= await axios.patch(BASE_URL+"/profile/edit",{firstName,lastName,age,gender,photoUrl,about},{withCredentials:true})
            console.log(res);
            dispatch(addUser(res?.data?.data))
            alert(res?.data?.message)
        }
        catch(err){
            const message = err.response?.data || "Something went wrong";

            setError(message)
            // console.log( err.response?.data);
            
            alert(message)
        }
    }

  return (
    <>
    <div className=' flex flex-col  lg:flex-row justify-center my-15 '>
        <div className=' flex justify-center mx-10'>
        <div className="card card-border bg-base-300 w-96 ">
            <div className="card-body ">
            <h2 className="card-title justify-center">Edit Profile</h2>
            <div>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input 
                type="text" 
                value={firstName}
                className="input" 
                placeholder="Type here"
                onChange={(e)=>setFirstName(e.target.value) }
                />
                
            </fieldset>

            

             <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input 
                type="text" 
                value={lastName}
                className="input" 
                placeholder="Type here"
                onChange={(e)=>setLastName(e.target.value)}

                />
            </fieldset>

             <fieldset className="fieldset">
                <legend className="fieldset-legend">Photo Url</legend>
                <input 
                type="text" 
                value={photoUrl}
                className="input" 
                placeholder="Type here"
                onChange={(e)=>setPhotoUrl(e.target.value) }
                />
                
            </fieldset>

            <fieldset className="fieldset">
                <legend className="fieldset-legend">age</legend>
                <input 
                type="text" 
                value={age}
                className="input" 
                placeholder="Type here"
                onChange={(e)=>setAge(e.target.value) }
                />
                
            </fieldset>

             <fieldset className="fieldset">
                <legend className="fieldset-legend">Gender</legend>
                <input 
                type="text" 
                value={gender}
                className="input" 
                placeholder="Type here"
                onChange={(e)=>setGender(e.target.value) }
                />
                
            </fieldset>

             <fieldset className="fieldset">
                <legend className="fieldset-legend">About</legend>
                <input 
                type="text" 
                value={about}
                className="input" 
                placeholder="Type here"
                onChange={(e)=>setAbout(e.target.value) }
                />
                
            </fieldset>
            

            </div>
            <div className="card-actions justify-center">
            <button className="btn btn-primary " onClick={handleEdit}>Edit</button>
            </div>
            </div>
        </div>
    </div>

    <div className='flex justify-center mt-5 sm:mt-0'>
        <UserCard user={{firstName,lastName,age,gender,photoUrl,about}}/>
    </div>
    </div>


    </>
  )
}

export default EditProfile