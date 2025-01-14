import React from 'react'

export default function ResetPasswordForm({errorMessage, validationMessage, handleSubmit, handleChangePassword}) {
  return (
    <section className="reset-password-container">
    <p className="header-password-reset">Ange ett nytt lösenord</p>
    <p
      className={
        validationMessage ? "validation-message" : "no-validation-message"
      }
    >
      {validationMessage}
    </p>
    <p className={errorMessage ? "error-message" : "no-error-message"}>{errorMessage}</p>

    <form onSubmit={handleSubmit} className="reset-password-form">
      <input
        type="password"
        placeholder="New password"
        name="newPassword"
        onChange={handleChangePassword}
      />
      <input
        type="password"
        placeholder="Repeit password"
        name="repetPassword"
        onChange={handleChangePassword}
      />
      <button type="submit">Send</button>
    </form>
  </section>
  )
}
