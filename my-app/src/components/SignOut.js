import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthSessionContext } from '../Context/SessionProvider';

export default function SignOut() {
  const {setSession, setAdmin } = useContext(AuthSessionContext)
  const nav = useNavigate();

  const signOut = async () => {
    const response = await fetch(`http://localhost:3030/auth/signout`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" }
    });

    const data = await response.json();

    if(!response.ok){
      alert(data.error)
    } else {
      alert(data.successfully);
      setSession(false)
      setAdmin(false)
      nav('/signin')
 
    }
  }
  return (
    <div>
      <button onClick={signOut}>Logout</button>
    </div>
  )
}
