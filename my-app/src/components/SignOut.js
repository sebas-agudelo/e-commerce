import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function SignOut() {
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
      nav('/signin')
      window.location.reload();
    }
  }
  return (
    <div>
      <button onClick={signOut}>Logout</button>
    </div>
  )
}
