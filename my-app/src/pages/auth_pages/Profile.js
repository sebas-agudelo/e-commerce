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
    const response = await fetch(`http://localhost:3030/auth/profile`,{
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
      <h1>Min sida</h1>
      
      {userData.length > 0 ? userData.map((user) => 
        <div className='user-metadata'>
      <p><Link to={`/mydata`}>Mina uppgifter</Link></p>
      <p><Link to={`/orders`}>Mina beställningar</Link></p>
        </div>
    )
    
    : 
    <div className='registration-reminder'>
    <p>
      Du har ännu inte registrerat dina uppgifter. Genom att göra det kan du snabba upp ditt köp och få en smidigare betalningsprocess
    </p>
    <p><Link to="/register/information">Lägg till dina uppgifter</Link></p>
    
    </div>
  }
      <div className='admin-actions'>
        { session && admin ? 
        <>
         
              <Link to={`/product/create`}><IoAddOutline />Lägga till</Link>
              <Link to={`/products`}><CiEdit />Ändra / ta bort</Link>
         
        </>

      :
      ""
      }
      </div>
  <SignOut />
    </div>
  )
}
