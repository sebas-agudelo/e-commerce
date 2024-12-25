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


export const login = async (req, res) => {
  const { email, password } = req.body;
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

export const logout = async (req, res) => {
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

export const recavoryPwdLink = async (req, res) => {
  const {email} = req.body;

  try{

    let { data, error } = await supabase.auth.resetPasswordForEmail(email)

    if(error){
      return res.status(400).json({error: error.message});
    }else{
      return res.status(200).json({successfully: "A email link is send"});
    }


  }catch(error){
    console.log(error);
    
  }

};

export const resetpwd = async (req, res) => {
  const {password} = req.body;
  const { tokenHash  } = req.params; 

  if (!tokenHash) {
      return res.status(400).json({ error: "Token is required" });
  }
try{

 const { verify, verifyError } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type: 'recovery'})
   
 if (verifyError) {
  return res.status(400).json({ error: error.verifyError });
}


const { data, error } = await supabase.auth.updateUser({
  password,
})

if(error){
  return res.status(400).json({error: error.message});
}else{
  return res.status(200).json({successfully: "Password is changed"});
}

}catch(error){
  console.log(error);
  
}

}
