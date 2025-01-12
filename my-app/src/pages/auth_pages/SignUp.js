import React, { useState } from "react";
import SignUpForm from "../../components/auth_form/SignUpForm";
import PasswordValidation from "../../hooks/PasswordValidation";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeitPassword, setRepeitPassword] = useState("");
  const [okMessage, setOkMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { validatePassword, validationMessage } = PasswordValidation();

  const fetchSignUp = async () => {
    try {
      if (!email || !password || !repeitPassword) {
        setErrorMessage("Email samt lösenord får inte vara tomma");
        return;
      }

      if (repeitPassword !== password) {
        setErrorMessage("Lösenorden stämmer inte överens");
        return;
      }

      const response = await fetch(`http://localhost:3030/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: password, repeitpassword: repeitPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setOkMessage(data.success);
        setErrorMessage("");
      } else {
        setErrorMessage(data.error);
        setOkMessage("");
      }
    } catch (error) {
      setErrorMessage("Något gick fel. vänligen försök igen.");
    }
  };

  const handlePassword = (e) => {
    const { name, value } = e.target;

    if (errorMessage) {
      setErrorMessage("");
    }

    if (name === "password") {
      console.log("Password",value);

      setPassword(value);

      validatePassword(value);
    } else if (name === "repeitPassword") {
      console.log("Repeit",value);
      
      setRepeitPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSignUp();
  };

  return (
    <main className="sign-main">
      <section className="sign-container">
        <SignUpForm
          handleSubmit={handleSubmit}
          setEmail={setEmail}
          errorMessage={errorMessage}
          okMessage={okMessage}
          handlePassword={handlePassword}
          validationMessage={validationMessage}
        />
      </section>
    </main>
  );
}
