import { supabase_config } from "../../../supabase_config/supabase_conlig.js";
const supabase = supabase_config();

export const passwordResetLink = async (req, res) => {
  const { email } = req.body;

  try {
    let { data, error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      return res.status(400).json({ error: error.message });
    } else {
      return res.status(200).json({ success: "A link has been sent to your email address." });
    }

  } catch (error) {
    console.log(error);
  }
};

export const resetPassword = async (req, res) => {
  const { password, repetpassword } = req.body;
  const { tokenHash } = req.params; 
  
  if (!tokenHash) {
    return res.status(400).json({ error: "Token is required" });
  }
  
  
  try {
    if (repetpassword !== password) { 
      return res.status(400).json({ error: "Passwords do not match" });
    }
    const { data: verifyData, error: verifyError } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type: 'recovery' });
    
    if (verifyError) {
      return res.status(400).json({ verifyError: "Please request a new link to reset your password if needed." });
    }
    
    const { data: userData, error: updateError } = await supabase.auth.updateUser({
      password,
      repetpassword
    });
    
    
    if (updateError) {
      return res.status(400).json({ error: updateError.message });
    } else {
      return res.status(200).json({ success: "Password is changed" });
    }

  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
