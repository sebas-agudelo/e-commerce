import { createContext, useEffect, useState } from "react";

export const AuthSessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null); 
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);  // Loading state for async operations

  useEffect(() => {
    const fetchSessionData = async () => {
      await verifySession();
      await verifyAdmin();
      setLoading(false); 
    };
    fetchSessionData();
  }, [session, admin]);

  const verifySession = async () => {
    try {
      const response = await fetch('https://examensarbeten.vercel.app/auth/sessionAuthCheck', {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" }
      });

      const data = await response.json();
      if (response.ok && data.isLoggedIn) {
        setSession(true); // User is logged in
      } else {
        setSession(false); // User is not logged in
      }
    } catch (error) {
      console.error("Error during session verification:", error);
      setSession(false); // Default to not logged in on error
    }
  };

  const verifyAdmin = async () => {
    try {
      const response = await fetch('https://examensarbeten.vercel.app/auth/validateAdminRole', {
        method: "GET",
        credentials: 'include',
        headers: { "Content-Type": "application/json" }
      });

      const data = await response.json();
      if (response.ok && data.isAdmin) {
        setAdmin(true); // User is an admin
      } else {
        setAdmin(false); // User is not an admin
      }
    } catch (error) {
      console.error("Error during admin verification:", error);
    }
  };

  return (
    <AuthSessionContext.Provider
      value={{
        session,
        setSession,
        admin,
        setAdmin,
        loading,
        verifySession,
        verifyAdmin,
        setLoading
      }}
    >
      {children}
    </AuthSessionContext.Provider>
  );
};
