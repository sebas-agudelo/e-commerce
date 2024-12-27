import React from 'react'
import SignOut from '../components/SignOut'

export default function Profile() {
  return (
    <div>
      <h1>Profile</h1>
      <a href='/'>Change password</a>
      <SignOut />
    </div>
  )
}
