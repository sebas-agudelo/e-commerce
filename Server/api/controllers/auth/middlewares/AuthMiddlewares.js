import { supabase_config } from "../../../supabase_config/supabase_conlig.js";
const supabase = supabase_config();

export const authenticateUser = async (req, res, next) => {
    // console.log("Cookies från authenticate user:", req.cookies); // Logga cookies för att se om access_token skickas
  
    try {
      // Hämta access token från cookie
      const access_token = req.cookies.cookie_key;
  
      if (!access_token) {
        // console.log('Ingen access token hittades i cookies');
        return res.status(401).json({ error: "No valid session found" });
      }
  
      // Sätt sessionen med access_token (detta är inte korrekt för sessionvalidering)
      // Använd supabase.auth.getSession för att verifiera sessionen baserat på access_token
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser(access_token);
  
      if (error || !user) {
        // console.log('Ingen session hittades');
        return res.status(401).json({ error: "No valid session found" });
      }
  
      // Lägg till användardata i req.user
      req.user = user;
  
      // Fortsätt till nästa middleware eller route
      next();
    } catch (error) {
      // console.log(error);
      return res
        .status(500)
        .json({ error: "An error occurred while verifying session" });
    }
  };

  export const authenticateAdmin = async (req, res, next) => {
    try {
      // console.log("El user", req.user);
      if (!req.user || !req.user.id) {
          console.log("Ingen användare är inloggad");
          return res.status(401).json({ error: "Ingen användare är inloggad" });
        }
    
        const adminUserId = req.user.id;
      
  
      let { data: user_roles, error } = await supabase
        .from("user_roles")
        .select("user_id")
        .eq("user_id", adminUserId)
        .eq("role", "Admin");
  
      
     // Hantera fel eller om ingen admin hittades
     if (error || !user_roles || user_roles.length === 0) {
      console.log("Ingen Admin hittades för user_id:", adminUserId);
      return res.status(403).json({ error: "Användaren är inte en admin" });
    }
      next();
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: "An error occurred while verifying session" });
    }
  };