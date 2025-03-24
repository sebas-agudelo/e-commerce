import React from "react";

export default function SignUpForm({
  handleSubmit,
  setEmail,
  errorMessage,
  handlePassword,
  validationMessage,
  okMessage,
}) {
  return (
    <>
    
      <article className="user-data-content">
        <h1>Sign up</h1>

        <p className={okMessage ? "ok-message" : "no-ok-message"}>
          {okMessage}
        </p>
        <p className={errorMessage ? "error-message" : "no-error-message"}>
          {errorMessage}
        </p>
        <p
          className={
            validationMessage ? "validation-message" : "no-validation-message"
          }
        >
          {validationMessage}
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="email@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handlePassword}
          />
          <button type="submit">Sign up</button>
        </form>
        <div>
          <a href="/signin">Sign in</a>
        </div>
      </article>
    </>
  );
}
