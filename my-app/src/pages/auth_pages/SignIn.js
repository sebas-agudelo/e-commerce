import React, { useState } from "react";
import SignInForm from "../../components/auth_form/SignInForm";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const nav = useNavigate();

  const fetchSignIn = async () => {
    try{
        if(!email || !password){
          setErrorMessage("Email samt lösenord får inte vara tomma")
          return
        }
      const response = await fetch(`http://localhost:3030/auth/signin`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        nav("/profile");
        window.location.reload();
      } else {
        setErrorMessage(data.error);
      }

    }catch(error){
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSignIn();
  };

  return (
    <main className="sign-main">
      <section className="sign-container">
        <SignInForm
          handleSubmit={handleSubmit}
          setEmail={setEmail}
          setPassword={setPassword}
          errorMessage={errorMessage}
        />
      </section>
    </main>
  );
}
