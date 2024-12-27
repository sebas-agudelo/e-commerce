import React, { useState } from "react";
import AuthSignForm from "../components/auth_form/AuthSignForm";

export default function SignUp() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const fetchSignUp = async () => {
    const sign = await fetch(`http://localhost:3030/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await sign.json();

    if (!sign.ok) {
      alert(data.error);
    } else {
      alert(data.successfully);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSignUp()
  }

  return (
    <main>
      <AuthSignForm
        handleSubmit={handleSubmit}
        setEmail={setEmail}
        setPassword={setPassword}
      />
    </main>
  );
}
