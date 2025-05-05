import React, { useContext, useEffect, useState } from "react";
import SignOut from "../../components/SignOut";
import { AuthSessionContext } from "../../Context/SessionProvider";
import { Link } from "react-router-dom";
import { IoAddOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";

export default function Profile() {
  return (
    <div className="profile-container">
      <h1>MITT KONTO</h1>
      <div className="action-btns">
        <p><Link to={`/mydata`}>Hantera konto</Link></p>
        <p><Link to={``}>Mina beställningar</Link></p>
      </div>

      <SignOut />
    </div>
  );
}
