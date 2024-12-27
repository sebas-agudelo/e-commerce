import React, { useState } from 'react'
import AuthSignForm from '../components/auth_form/AuthSignForm'
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const nav = useNavigate();

  const fetchSignIn = async () => {
    const sign = await fetch(`http://localhost:3030/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    const data = await sign.json();

    if(!sign.ok){
      alert(data.error)
    } else{ 
      alert(data.successfully)
      nav('/')
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchSignIn()
  }

  return (
    <main>
      <AuthSignForm 
      handleSubmit={handleSubmit}
      setEmail={setEmail}
      setPassword={setPassword}
      />
    </main>
  )
}
