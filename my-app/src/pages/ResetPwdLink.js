import React, { useState } from 'react'
import {BeatLoader} from 'react-spinners'; 

export default function ResetPwdLink() {
  const [isLoadig, setIsLoading] = useState(false);
  const [email, setEmail] = useState();

  const sendRecoveryEmail  = async () => {
    const response = await fetch('http://localhost:3030/auth/recavorpwdlink', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })

    const data = await response.json();

    if(!response.ok){
      alert(data.error)
      
    }else{
      alert(data.successfully);

    }
    setIsLoading(false)
  } 


  const handleSubmit = (e) => {
    e.preventDefault();
    sendRecoveryEmail ();
    setIsLoading(true)
  }

  return (
    <main>
      <section className='reset-password-container'>
        <h1>Forgot your password?</h1>
        <p>Enter the email address you used to create your account, and we will send you a link to reset your password.</p>

        <form onSubmit={handleSubmit} className='reset-password-form'>
            <input type='email'
            placeholder='email@example.com'
            onChange={(e) => setEmail(e.target.value)}
            />
            <button type='submit'>{isLoadig ? <BeatLoader color="#ff7a00"/> : "Send"}</button>
        </form>

      </section>
    </main>
  )
}
