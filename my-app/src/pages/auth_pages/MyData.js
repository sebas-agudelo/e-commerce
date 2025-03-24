import React, { useState, useEffect, use } from "react";

export default function MyData() {
  const [userData, setUserData] = useState([]);
  const [isFormEditable, setIsFormEditable] = useState(true);
  const [isEmailEditable, setIsEmailEditable] = useState(true);

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

  const editTheForm = (e) => {
    setIsFormEditable(false);
    e.preventDefault(); // Förhindrar omladdning
  };

  const handleSave = (e) => {
    const confirmSave = window.confirm("Vill du spara ändringarna?");
    e.preventDefault(); 
    
    if (confirmSave) {
      window.location.reload();
      console.log("Ändringar sparade!");
    } 
    else {
      console.log("Ändringar sparades inte");
      return;
    }
  };

  return (
    <div className="my-information-container">
      <h1>{isFormEditable ? "Mina uppgifter" : "Ändra mina uppgifter"}</h1>
      {userData &&
        userData.map((user) => (
          <div className="user-information">
            <form>
              <label>Förnamn</label>
              <input
                type="text"
                value={user.firstname}
                disabled={isFormEditable}
              />
              <label>Efternamn</label>
              <input
                type="text"
                value={user.lastname}
                disabled={isFormEditable}
              />
              <label>Email</label>
              <input
                type="text"
                value={user.email}
                disabled={isEmailEditable}
              />
              <label>Telefon</label>
              <input type="text" value={user.phone} disabled={isFormEditable} />
              <label>Född</label>
              <input
                type="date"
                value={user.birthday}
                disabled={isFormEditable}
              />
              <label>Adress</label>
              <input
                type="text"
                value={user.address}
                disabled={isFormEditable}
              />
              <label>Postnummer</label>
              <input
                type="text"
                value={user.postal}
                disabled={isFormEditable}
              />
              {isFormEditable ? (
                <div className="save-user-info-btn-wrapper">
                  <button
                    onClick={editTheForm}
                  >
                    Ändra
                  </button>
                </div>
              ) : (
                <div className="save-user-info-btn-wrapper">
                  <button
                    onClick={handleSave}
                  >
                    Spara
                  </button>
                </div>
              )}
            </form>
          </div>
        ))}
    </div>
  );
}
