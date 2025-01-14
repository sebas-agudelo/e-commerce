import { supabase_config } from "../../../supabase_config/supabase_conlig.js";
const supabase = supabase_config();

export const signIn = async (req, res) => {
  const {email, password} = req.body;
    try {
      let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        return res.status(400).json({ error: "Felaktig e-postadress eller lösenord. Vänligen försök igen." });
      } 

      const { data: sessionData, error: sessionError } = await supabase.auth.getSession()

      if(sessionError || !sessionData.session){
        return res.status(400).json({ error: error.message });
      }
        const { access_token } = sessionData.session;
        console.log('Access Token:', access_token);

        return res
        .cookie('cookie_key', access_token, {
          httpOnly: "true",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dagar i millisekunder
        })
        .status(200)
        .json({ successfully: "User successfully login" });
      
    } catch (error) {
      console.log(error);
    }
  };

  export const signOut = async (req, res) => {
    try {
      let { error } = await supabase.auth.signOut();
  
      if (error) {
        return res.status(400).json({ error: "Det uppstod ett problem med att logga ut dig. Försök igen." });
      } else {
        return res
        .clearCookie('cookie_key')
        .status(200)
        .json({ successfully: "User successfully logout" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  export const sessionAuthCheck = async (req, res) => {
    try{
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
  
      if(sessionError || !sessionData.session){
        console.log('Det finns ingen session');
        
        return res.status(200).json({ isLoggedIn: false })
      };
  
      return res
      .status(200)
      .json({isLoggedIn: true});
  
    }catch(error){
      console.log(error);
      
    }
  } 
  
  export const validateAdminRole = async (req, res) => {
    try {    
  
        const { data: user, error: userError } = await supabase.auth.getUser();
  
        if (userError || !user || !user.user) {
            console.log("Användaren kunde inte hämtas från session");
            return res.status(200).json({ error: "Användaren kunde inte hämtas från session" , isAdmin: false});
        }
        const userID = user.user.id;
  
        const { data: user_roles, error } = await supabase
            .from("user_roles")
            .select("user_id")
            .eq("user_id", userID)
            .eq("role", "Admin");
  
        if (!user_roles || user_roles.length === 0) {
            console.log("Användaren är inte admin");
            return res.status(200).json({isAdmin: false});
        }
  
        console.log("Användaren är autentiserad admin från verifyAdminSession:", user_roles);
        return res.status(200).json({ isAdmin: true });
    } catch (error) {
        console.error("Ett fel uppstod:", error);
        return res.status(500).json({ error: "An error occurred while verifying session", isAdmin: false });
    }
  };