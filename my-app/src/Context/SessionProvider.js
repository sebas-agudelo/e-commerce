import { createContext, useEffect, useState } from "react";

export const AuthSessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(false);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    verifySession();
    verifyAdmin();
  }, [session, admin]);
    
  const verifySession = async () => {
    try {
        const response = await fetch('http://localhost:3030/auth/sessionAuthCheck', {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" }
        })

        const data = await response.json();
        if(response.ok && data.isLoggedIn){
            setSession(true)             
        }
        
        else if(!response.ok && data.isLoggedIn){
            
            setSession(false)
            console.log('Det gick');
          }
    } catch (error) {
      console.error("Ett fel uppstod vid admin-verifiering:", error);
    }
  };

  const verifyAdmin= async () => {
    try {
        const response = await fetch('http://localhost:3030/auth/validateAdminRole', {
            method: "GET",
            credentials: 'include',
            headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();

        if (response.ok && data.isAdmin) {
            setAdmin(true);
            console.log('Användaren är admin');
        } else if(!response.ok && data.isAdmin) {
            setAdmin(false);
            console.log("Användaren är ingen admin");
        }
    } catch (error) {
        console.error("Ett fel uppstod vid admin-verifiering:", error);
    }
};

  return (
    <AuthSessionContext.Provider
      value={{
        session,
        admin
      }}
    >
      {children}
    </AuthSessionContext.Provider>
  );
};
