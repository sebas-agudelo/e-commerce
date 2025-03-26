import React, { useContext, useEffect, useState } from 'react'
import SignOut from '../../components/SignOut'
import { AuthSessionContext } from '../../Context/SessionProvider'
import { Link } from 'react-router-dom';
import { IoAddOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";

export default function Profile() {
  const {session, admin} = useContext(AuthSessionContext);
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

    } else{
      // alert(data.error)
    }
   
  }

  return (
    <div className='my-page-container'>
      <h1>Mina sidor</h1>
      
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
    
    : <Link to="/register/information">Lägg till dina uppgifter</Link>
  }

  <SignOut />
    </div>
  )
}
