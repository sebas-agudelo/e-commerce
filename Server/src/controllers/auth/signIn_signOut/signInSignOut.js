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
        return res.status(400).json({ error: error.message });
      } else {
        const users = data.user.id;
        console.log(users);
  
        return res.status(200).json({ successfully: "User successfully login" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  export const signOut = async (req, res) => {
    try {
      let { error } = await supabase.auth.signOut();
  
      if (error) {
        return res.status(400).json({ error: error.message });
      } else {
        return res.status(200).json({ successfully: "User successfully logout" });
      }
    } catch (error) {
      console.log(error);
    }
  };