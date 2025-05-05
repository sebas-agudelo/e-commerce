import React, { useContext, useEffect, useState } from 'react'
import { AuthSessionContext } from '../../Context/SessionProvider';

export default function UserData() {
 
    const {verifySession, setLoading} = useContext(AuthSessionContext);
      const [userData, setUserData] = useState([]);
      
      useEffect(() => {
        getUserData();
      },[])
    
      const getUserData = async () => {
        const response = await fetch(`https://examensarbeten.vercel.app/auth/profile`,{
          method: "GET", 
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        })
    
        const data = await response.json();
    
        if(response.ok){
          setUserData(data.users_info)
    
        } 
       
      }



    return (
        <main className='' >
             {userData.length > 0 ? userData.map((user) => 
        <div className='user-metadata'>
          <h3>Du är behörig admin</h3>

          <p>Förnamn: {user.firstname}</p>
          <p>Efternamn: {user.lastname}</p>
          <p>Mobil: {user.phone}</p>
          <p>Födelsedatum: {user.birthday}</p>
          <p>Adress: {user.address}</p>
          <p>Postnummer: {user.postal}</p>
        </div>
    )
    
    : ""
  }

  <div>
    <button>
        Radera konto
    </button>
  </div>
        </main>
    );
}
