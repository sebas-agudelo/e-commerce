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