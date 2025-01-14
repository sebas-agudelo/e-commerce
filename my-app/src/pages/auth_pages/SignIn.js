import React, { useContext, useState } from "react";
import SignInForm from "../../components/auth_form/SignInForm";
import { useNavigate } from "react-router-dom";
import { AuthSessionContext } from "../../Context/SessionProvider";

export default function SignIn() {
  const {setAdmin, setSession, admin} = useContext(AuthSessionContext);
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
        setSession(true)

        if(admin){
          setAdmin(true)
        }
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
    <main className="user-data-container">
      <section className="user-data-wrapper">
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
