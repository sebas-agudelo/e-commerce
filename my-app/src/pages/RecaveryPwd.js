import React from 'react'

export default function RecaveryPwd() {
  return (
    <main>
      <section className='reset-password-container'>
        <h1>Forgot your password?</h1>
        <p>Enter the email address you used to create your account, and we will send you a link to reset your password.</p>
        <article className='reset-password-form-wrapper'>
        <form>
            <input type='email'
            placeholder='email@example.com'
            />
            <button type='submit'>Send</button>
        </form>
        </article>
      </section>
    </main>
  )
}
