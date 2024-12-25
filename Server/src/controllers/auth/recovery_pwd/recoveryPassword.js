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
