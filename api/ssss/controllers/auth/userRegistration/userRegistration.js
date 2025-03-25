import { supabase_config } from "../../../supabase_config/supabase_conlig.js";

const supabase = supabase_config();

export const signUpUser = async (req, res) => {
  const { email, password } = req.body;
 
  try {
    let { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      console.log(error);
      
      return res.status(400).json({ error: error.message });
    }
    return res
      .status(200)
      .json({ success: "Ett verifieringsmejl har skickats till din inkorg." });
  } catch (error) {
    return res.status(500).json({ error: "Ett oväntat fel inträffade. Försök senare igen." });
  }
};

export const verifyEmail = async (req, res) => {
  const { tokenHash  } = req.params; 

  if (!tokenHash) {
      return res.status(400).json({ error: "Token is required" });
  }

  try {
      // Verifiera token via Supabase
      const { data, error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type: 'email'})

      
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      
      const email = data.email; 
      
      return res.status(200).json({
          message: "E-post bekräftad framgångsrikt",
          email,
          session: data.session,
      });
  } catch (err) {
      return res.status(500).json({ error: "Ett oväntat fel inträffade. Försök senare igen." });
  }
};