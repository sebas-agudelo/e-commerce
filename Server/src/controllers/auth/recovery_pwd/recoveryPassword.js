import { supabase_config } from "../../../supabase_config/supabase_conlig.js";

const supabase = supabase_config();

export const recavoryPwdLink = async (req, res) => {
  const { email } = req.body;

  try {
    let { data, error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      return res.status(400).json({ error: error.message });
    } else {
      return res.status(200).json({ successfully: "An email link has been sent" });
    }

  } catch (error) {
    console.log(error);
  }
};

export const resetpwd = async (req, res) => {
  const { password } = req.body;
  const { tokenHash } = req.params; // Token kommer nu från URL-parametern

  if (!tokenHash) {
    return res.status(400).json({ error: "Token is required" });
  }

  try {
    const { data: verifyData, error: verifyError } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type: 'recovery' });

    if (verifyError) {
      return res.status(400).json({ verifyError: "Please request a new link to reset your password if needed." });
    }

    const { data: userData, error: updateError } = await supabase.auth.updateUser({
      password,
    });

    if (updateError) {
      return res.status(400).json({ error: updateError.message });
    } else {
      console.log("Password updated successfully.");  // För debug
      return res.status(200).json({ successfully: "Password is changed" });
    }

  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
