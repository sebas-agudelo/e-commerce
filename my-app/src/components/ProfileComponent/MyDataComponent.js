import React, { useEffect, useState } from "react";
import UserInfoValidation from "../../hooks/UserInfoValidation";
import { MdErrorOutline } from "react-icons/md";

export default function MyDataComponent() {
  const [changeData, setChangeData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    birthday: "",
    address: "",
    postal: "",
  });
  const [user, setUser] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [emailDisebled, setEmailDisebled] = useState(true);
  const [isDisebled, setIsDisebled] = useState(true);
  
  const { userInputValidation, userValidationMessage } = UserInfoValidation();

  useEffect(() => {
    getUserData();
    
  }, [isDisebled]);

  const handleIsDisebled = () => {
    if (isDisebled) {
      setIsDisebled(false);
    }

    if (isDisebled === false) {
      setIsDisebled(true);
    }
  };

  const getUserData = async () => {
    const response = await fetch(`http://localhost:3030/auth/profile`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (response.ok) {
      const userArray = data.users_info;
      setUser(userArray);

      if (userArray.length > 0) {
        const user = userArray[0];
        setChangeData({
          firstname: user.firstname || "",
          lastname: user.lastname || "",
          phone: user.phone || "",
          birthday: user.birthday || "",
          address: user.address || "",
          postal: user.postal || "",
        });
      } else {
        setIsDisebled(false)
      }

      setUserEmail(data.userEmail);
    }
  };

  const changeMyData = async () => {
    const inputValidation = userInputValidation(
      changeData?.firstname,
      changeData.lastname,
      changeData.phone,
      changeData.birthday,
      changeData.address,
      changeData.postal
    );

    if (!inputValidation) {
      return;
    }

  
    try {
      const response = await fetch(
        `http://localhost:3030/auth/register/information`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(changeData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.success);
        setIsDisebled(true);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const insert = async () => {
    const inputValidation = userInputValidation(
      changeData?.firstname,
      changeData?.lastname,
      changeData?.phone,
      changeData?.birthday,
      changeData?.address,
      changeData?.postal
    );

    if (!inputValidation) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:3030/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(changeData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.success);
        setIsDisebled(true)
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setChangeData((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(user.length > 0){
      await changeMyData();

    }else {
      await insert()
    }
  };

  return (
    <div className="user-info-container">
    {user.length === 0 ?
      <div className="user-info-empty">
         <p><MdErrorOutline />Inga uppgifter har registrerats om dig ännu.</p> 
      </div>
      : ""}

      {userValidationMessage && (
        <div className="show-errors-wrapper">
          <p>
            <MdErrorOutline />{userValidationMessage}{" "}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label>
          Email <span>*</span>
        </label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={userEmail && userEmail}
          disabled={emailDisebled}
        />
        <label>
          Förnamn <span>*</span>
        </label>
        <input
          type="text"
          name="firstname"
          onChange={handleChange}
          value={changeData && changeData?.firstname}
          disabled={isDisebled}
        />
        <label>
          Efternamn <span>*</span>
        </label>
        <input
          type="text"
          name="lastname"
          onChange={handleChange}
          value={changeData && changeData?.lastname}
          disabled={isDisebled}
        />
        <label>
          Föddelsedatum <span>*</span>
        </label>
        <input
          type="date"
          name="birthday"
          onChange={handleChange}
          value={changeData && changeData?.birthday}
          disabled={isDisebled}
        />
        <label>
          Mobilnummer <span>*</span>
        </label>
        <input
          type="number"
          name="phone"
          onChange={handleChange}
          value={changeData && changeData?.phone}
          disabled={isDisebled}
        />
        <label>
          Addres <span>*</span>
        </label>
        <input
          type="text"
          name="address"
          onChange={handleChange}
          value={changeData && changeData?.address}
          disabled={isDisebled}
        />
        <label>
          Postnummer <span>*</span>
        </label>
        <input
          type="number"
          name="postal"
          onChange={handleChange}
          value={changeData && changeData?.postal}
          disabled={isDisebled}
        />
        {isDisebled ? "" : <button>Spara</button>}
      </form>

      {user.length === 0 ? "" :
      <div className="account-actions">
        <button onClick={handleIsDisebled}>
          {isDisebled ? "Ändra" : "Avbryt"}
        </button>
      </div>
       }
    </div>
  );
}
