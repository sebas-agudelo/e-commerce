import { supabase_config } from "../../supabase_config/supabase_conlig.js";
const supabase = supabase_config();

export const authenticateUser = async (req, res, next) => {
    
  try {
    // Hämta access token från cookie
    const access_token = req.cookies.cookie_key;

    if (!access_token) {
      return res.status(401).json({ error: "No valid session found" });
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(access_token);

    if (error || !user) {
  
      return res.status(401).json({ error: "No valid session found" });
    }

    // Lägg till användardata i req.user
    req.user = user;

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
          maxAge: 7 * 24 * 60 * 60 * 1000, 
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
            return res.status(200).json({ error: "Användaren kunde inte hämtas från session" , isAdmin: false});
        }
        const userID = user.user.id;
  
        const { data: user_roles, error } = await supabase
            .from("user_roles")
            .select("user_id")
            .eq("user_id", userID)
            .eq("role", "Admin");
  
        if (!user_roles || user_roles.length === 0) {
          
            return res.status(200).json({isAdmin: false});
        }
  
     
        return res.status(200).json({ isAdmin: true });
    } catch (error) {
      
        return res.status(500).json({ error: "An error occurred while verifying session", isAdmin: false });
    }
  };



    export const profile = async (req, res) => {
      try {
        const userId = req.user.id;
    
        let { data: users_info, error } = await supabase
          .from("users_info")
          .select("*")
          .eq("user_id", userId);
    
          if(!users_info){
            console.log("Ingen användare hittades för user_id:", userId);
            return res.status(200).json({success: []});
          } else if(users_info){
              return res.status(200).json({ success: "Ja Ja", users_info});
          }
      } catch (error) {
        console.log("");
      }
    };
    
    export const insertUserData = async (req, res) => {
        const { firstname, lastname, phone, birthday, address, postal } = req.body;
        const userID = req.user.id;
    
        try {
       
            const { data, error } = await supabase
            .from('users_info')
            .insert([
                { firstname, lastname, phone, birthday, address, postal, user_id: userID },
            ])
            .select();
    
            if (error) {
                console.log(error);
                return res.status(400).json({ error: 'Kontrollera om alla fält är ifyllda' });
            }
    
            console.log(data);
    
            return res.status(201).json({ success: "Dina uppgifter registrerades" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Ett oväntat fel inträffade. Försök senare igen.' });
        }
    };
    