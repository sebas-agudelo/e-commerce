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