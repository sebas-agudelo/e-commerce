import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function AuthSignForm({
  handleSubmit,
  setEmail,
  setPassword,
}) {
  const location = useLocation();
  const isSignIn = location.pathname === '/signin';


  return (
    <section className="auth-container">
      <div className="auth-img-wrapper"></div>
      <article className="form-wrapper">
        <div className="auth-circle-logo">
          <img src="auth_img/cartoon-1299636_1280.png" />
        </div>
        
        <h1>{isSignIn ? 'Sign in' : 'Sign up'}</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="email@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        <button type="submit">{isSignIn ? 'Sign in' : 'Sign up'}</button>
        </form>
        {isSignIn ? <a href="/recaverypassword">Forgot password</a> : <a href="/signin">Sign in</a>}
      </article>
    </section>
  );
}
