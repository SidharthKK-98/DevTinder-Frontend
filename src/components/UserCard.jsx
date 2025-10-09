import React from 'react'

const UserCard = ({user,fromFeed}) => {

    const {firstName,lastName,age,gender,photoUrl,about}=user
    
  return (
    <div>
                <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
            <img
            src={photoUrl}
            alt="profile pic" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">{firstName +" "+lastName}</h2>
            { age &&(<h2>{age}</h2>)}      
             {gender&&(<h2>{gender}</h2>)}
            { about&&(  <p>{about}</p>)}
            
            {fromFeed&&(
              <div className="card-actions justify-center">
              <button className="btn btn-success btn-green-400">Interested</button>
              <button className="btn btn-error">Reject</button>

             </div>
            )}
        </div>
        </div>
    </div>
  )
}

export default UserCard