import { supabase_config } from "../../supabase_config/supabase_conlig.js";
const supabase = supabase_config();

export const sessionAuthCheck = async (req, res) => {
  try {
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError || !sessionData.session) {
      return res.status(200).json({ isLoggedIn: false });
    }

    return res.status(200).json({ isLoggedIn: true });
  } catch (error) {
    console.log({ error: "Ett oväntat fel inträffade. Försök senare igen." });
  }
};

export const authenticateUser = async (req, res, next) => {
  try {
    const access_token = req.cookies.cookie_key;
    if (!access_token) {
      return res
        .status(401)
        .json({ error: "Ingen giltig inloggning hittades" });
    }
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(access_token);

    if (error || !user) {
      return res
        .status(401)
        .json({ error: "Ingen giltig inloggning hittades" });
    }

    req.user = user;

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Ett oväntat fel inträffade. Försök senare igen." });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    let { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res
        .status(400)
        .json({
          error: "Felaktig e-postadress eller lösenord. Vänligen försök igen.",
        });
    }

    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError || !sessionData.session) {
      return res.status(400).json({ error: error.message });
    }
    const { access_token } = sessionData.session;

    console.log(access_token);
    console.log(email);
    
    

    return res
    .cookie("cookie_key", access_token, {
      httpOnly: true,
      secure: true,
      sameSite: "none", 
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json({ successfully: "Du är inloggad" });
  
  } catch (error) {
    console.log({ error: "Ett oväntat fel inträffade. Försök senare igen." });
  }
};

export const signOut = async (req, res) => {
  try {
    let { error } = await supabase.auth.signOut();

    if (error) {
      return res
        .status(400)
        .json({ error: "Vi kunde inte logga ut dig. Försök igen." });
    } else {
      return res
      .clearCookie("cookie_key", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      
        .status(200)
        .json({ successfully: "Du är utloggad" });
    }
  } catch (error) {
    console.log({ error: "Ett oväntat fel inträffade. Försök senare igen." });
  }
};

export const profile = async (req, res) => {
  try {
    const userId = req.user.id;

    let { data: users_info, error } = await supabase
      .from("users_info")
      .select("*")
      .eq("user_id", userId);

    if (!users_info) {
      console.log("Ingen användare hittades för user_id:", userId);
      return res.status(200).json({ success: [] });
    } else if (users_info) {
      return res.status(200).json({ success: "Ja Ja", users_info });
    }
  } catch (error) {
    console.log("");
  }
};

export const insertUserData = async (req, res) => {
  const { firstname, lastname, phone, birthday, address, postal } = req.body;
  const userID = req.user.id;

  try {
    const { data, error } = await supabase
      .from("users_info")
      .insert([
        {
          firstname,
          lastname,
          phone,
          birthday,
          address,
          postal,
          user_id: userID,
        },
      ])
      .select();

    if (error) {
      console.log(error);
      return res
        .status(400)
        .json({ error: "Kontrollera om alla fält är ifyllda" });
    }

    console.log(data);

    return res.status(201).json({ success: "Dina uppgifter registrerades" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Ett oväntat fel inträffade. Försök senare igen." });
  }
};
