import React from 'react'

export default function ResetPassword({setNewPassword, handleSubmit}) {
  return (
    <section className='reset-password-container'>
        <h1>Write you new password</h1>
        <form onSubmit={handleSubmit} className='reset-password-form'>
            <input type='password'
            placeholder='New password'
            onChange={(e) => setNewPassword(e.target.value)}
     
            />
             <input type='password'
             placeholder='Repeit password'
       
            />
            <button type='submit'>Send</button>
       </form>
    </section>
  )
}
