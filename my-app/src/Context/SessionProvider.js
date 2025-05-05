import { createContext, useEffect, useState } from "react";

export const AuthSessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null); 
  const [email, setEmail] = useState()
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchSessionData = async () => {
      await verifySession();
      setLoading(false); 
    };
    fetchSessionData();
  }, [session, admin]);

  const verifySession = async () => {
    try {
      const response = await fetch('http://localhost:3030/auth/sessionAuthCheck', {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" }
      });

      const data = await response.json();
      if (response.ok && data.isLoggedIn) {
        setSession(true);
        setEmail(data.email)
      } else {
        setSession(false); 
      }
    } catch (error) {
      console.error("Error during session verification:", error);
      setSession(false); 
    }
  };

  

  return (
    <AuthSessionContext.Provider
      value={{
        session,
        setSession,
        loading,
        verifySession,
        setLoading,
        email
      }}
    >
      {children}
    </AuthSessionContext.Provider>
  );
};
