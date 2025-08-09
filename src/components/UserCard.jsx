import React from 'react'

const UserCard = ({user}) => {
    console.log(user);

    const {firstName,lastName,age,gender}=user
    
  return (
    <div>
                <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
            <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">{firstName +" "+lastName}</h2>
            { age &&(<h2>{age}</h2>)}      
             {gender&&(<h2>{gender}</h2>)}
            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
            <div className="card-actions justify-center">
            <button className="btn btn-success btn-green-400">Interested</button>
            <button className="btn btn-error">Reject</button>

            </div>
        </div>
        </div>
    </div>
  )
}

export default UserCard