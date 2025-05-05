import React, { useEffect, useState } from "react";

export default function UserInfo() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const response = await fetch(`http://localhost:3030/auth/profile`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (response.ok) {
      setUserData(data.users_info);
    }
  };
  return (
    <div className="user-info-container">
     
      {userData.length > 0
        ? userData.map((user) => (
            <form>
              <label>Email</label>
              <input type="email" value={user.email} />
              <label>Förnamn</label>
              <input type="text" value={user.firstname} />
              <label>Efternamn</label>
              <input type="text" value={user.lastname} />
              <label>Föddelsedatum</label>
              <input type="date" value={user.birthday} />
              <label>Mobilnummer</label>
              <input type="number" value={user.phone} />
              <label>Addres</label>
              <input type="text" value={user.address} />
            </form>
          ))
      
        : ""}
      <div className="remove-account">
        <button>Radera konto</button>
      </div>
    </div>
  );
}
