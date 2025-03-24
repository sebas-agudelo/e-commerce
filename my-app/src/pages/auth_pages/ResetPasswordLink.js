import React, { useState } from "react";
import {BeatLoader} from 'react-spinners'; 

export default function ResetPasswordLink() {
  const [isLoadig, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [okMessage, setOkMessage] = useState("");
  const [email, setEmail] = useState('');

  const sendRecoveryEmail = async () => {
    const response = await fetch(
      "http://localhost:3030/auth/passwordresetlink",
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setOkMessage(data.success);
    } else {
      setErrorMessage(data.error);
    }
    setIsLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRecoveryEmail();
    setIsLoading(true);
  };

  return (
    <main className="reset-password-main">
      <section className="reset-password-container">
        <p className="header-password-reset">Glömt ditt lösenord?</p>

        <p>
          Ange e-postadressen du använde för att skapa ditt konto.
        </p>
        
        <p className={errorMessage ? "error-message" : "no-error-message"}>{errorMessage}</p>
        <p className={okMessage ? "ok-message" : "no-ok-message"}>{okMessage}</p>


        <form onSubmit={handleSubmit} className="reset-password-form">
          <input
            type="email"
            placeholder="email@example.com"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">
            {isLoadig ? <BeatLoader color="#ff7a00" /> : "Send"}
          </button>
        </form>
      </section>
    </main>
  );
}
