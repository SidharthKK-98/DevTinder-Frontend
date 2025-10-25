import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constants';

function Premium() {


    const handleBuyClick=async(type)=>{

      try{

          const order= await axios.post(BASE_URL+"/payment/create",
            {membershipType:type},
            {withCredentials:true})

            const{key,amount,currency,orderId,notes}=order.data

       const options = {
        key, 
        amount ,
        currency,
        name: 'DevTinder',
        description: 'Connect to Developers',
        order_id:orderId, 
        prefill: {
          name:notes.firstName+" "+notes.lastName,
          membershipType:notes.membershipType,
          contact: '9999999999'
        },
        theme: {
          color: '#F37254'
        },
      };

        const rzp = new window.Razorpay(options);
        rzp.open();

      }
      catch(err){
        console.log(err);
        
      }

     


      
     

    }

  return (
    <div className='m-4'>
        <div className="flex w-full mt-6">
        <div className="card bg-base-300 rounded-box grid h-auto p-4 grow place-items-center">
            <h1 className='font-bold text-2xl'>Silver Membership</h1>
            <ul className='mt-2'>
                <li>- Chat with other people</li>
                <li>- 100 connection requests per day</li>
                <li>- Blue Tick</li>
                <li>- 3 Months</li>
            </ul>
            <button onClick={()=>handleBuyClick("silver")} className='btn btn-secondary mt-4 p-2'>Buy Now</button>
        </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid h-auto p-4 grow place-items-center">
            <h1 className='font-bold text-2xl'>Gold Membership</h1>
            <ul className='mt-2'>
                <li>- Chat with other people</li>
                <li>- Infinite connection requests per day</li>
                <li>- Blue Tick</li>
                <li>- 6 Months</li>
            </ul>
        <button onClick={()=>handleBuyClick("gold")} className='btn btn-primary mt-4 p-2'>Buy Now</button>

        </div>
        </div>
    </div>
  )
}

export default Premium
