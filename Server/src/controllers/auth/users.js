import validator from "validator";
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

    return res.status(200).json({successfully: "User has been created successfully"});
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

export const blabla = async (req, res) => {
  const { token, email } = req.params;

  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  try {
    // Verifiera OTP (token) via Supabase
    const { data, error } = await supabase.auth.verifyOtp({
      email: email,
      token,
      type: "signup",
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res
      .status(200)
      .json({ message: "Email confirmed successfully", session: data.session });
  } catch (err) {
    console.error("Error confirming email:", err);
    return res
      .status(500)
      .json({ error: "An error occurred during confirmation" });
  }
};
