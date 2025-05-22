import React from "react";
import { Link } from "react-router-dom";

export default function AccountComponent() {
  return (
    <div className="user-info-container">
      <div className="account-actions">
        <button>
          <Link to={`/profile/account/mydata`}>Se/ändra uppgifter</Link>
        </button>
        <button>Radera konto</button>
      </div>
    </div>
  );
}
