import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PasswordValidation from "../../hooks/PasswordValidation";
import ResetPasswordForm from "../../components/auth_form/ResetPasswordForm";

const ResetPassword = () => {
  const { tokenHash } = useParams();
  const [newPassword, setNewPassword] = useState();
  const [repetPassword, setRepetPassword] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [okMessage, setOkMessage] = useState("");
  const { validatePassword, validationMessage } = PasswordValidation();
  const nav = useNavigate();

  const handleConfirm = async () => {
    // try {
    //   if (repetPassword !== newPassword) {
    //     setErrorMessage("PLösenorden matchar inte. Försök igen");
    //     return;
    //   };

    //   const response = await fetch(
    //     `http://localhost:3030/auth/resetpassword/${tokenHash}`,
    //     {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({
    //         password: newPassword,
    //         repetpassword: repetPassword,
    //       }),
    //     }
    //   );

    //   const data = await response.json();

    //   if (response.ok) {
    //     setOkMessage(data.success);
    //     setErrorMessage("");
    //     nav("/signin");
    //   } 
      
    //   else if(!response.ok) {
    //     setErrorMessage(data.error);
    //     setOkMessage("");

    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };

  // const handleChangePassword = (e) => {
  //   const {name, value } = e.target;

  //   if(errorMessage){
  //     setErrorMessage("")
  //   }

  //   if(name === "newPassword"){
  //     setNewPassword(value);

  //     validatePassword(value);
  
  //   } else if(name === "repetPassword"){
  //     setRepetPassword(value);
  //   }
  // }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   handleConfirm();
  // };

  return (
    <main className="reset-password-main">
      <ResetPasswordForm 
      handleChangePassword={handleChangePassword}
      handleSubmit={handleSubmit}
      errorMessage={errorMessage}
      validationMessage={validationMessage}
      />
    </main>
  );
};

export default ResetPassword;
