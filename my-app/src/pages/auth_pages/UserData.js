import React, { useEffect, useState } from "react";
import Lala from "../../components/ProfileComponent/Lala";
import UserInfo from "../../components/ProfileComponent/UserInfo";

export default function UserData() {
    const [width, setWidth] = useState(window.innerWidth >= 768)

    useEffect(() => {
        setWidth(window.innerWidth >= 768);
    },[width])
    
   
  return (
    <main className="profile-container">
      <h1>MITT KONTO</h1>
      {width && <Lala />}
      <UserInfo />
    </main>
  );
}
