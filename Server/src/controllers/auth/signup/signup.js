import { supabase_config } from "../../supabase_config/supabase_conlig.js";

const supabase = supabase_config();

export const createNewUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // console.log(data.user.id);
    return res
      .status(200)
      .json({ successfully: "User has been created successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

export const confirmSignup = async (req, res) => {
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
      
      const email = data.email; // E-postadress associerad med tokenet
      console.log("Email confirmed for:", email);
      
      return res.status(200).json({
          message: "Email confirmed successfully",
          email,
          session: data.session,
      });
  } catch (err) {
      console.error("Error confirming email:", err);
      return res.status(500).json({ error: "An error occurred during confirmation" });
  }
};