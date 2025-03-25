import { supabase_config } from "../../supabase_config/supabase_conlig.js";
const supabase = supabase_config();

export const profile = async (req, res) => {
  try {
    const userId = req.user.id;

    let { data: users_info, error } = await supabase
      .from("users_info")
      .select("*")
      .eq("user_id", userId);

      if(!users_info){
        console.log("Ingen användare hittades för user_id:", userId);
        return res.status(200).json({success: []});
      } else if(users_info){
          return res.status(200).json({ success: "Ja Ja", users_info});
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
        .from('users_info')
        .insert([
            { firstname, lastname, phone, birthday, address, postal, user_id: userID },
        ])
        .select();

        if (error) {
            console.log(error);
            return res.status(400).json({ error: 'Kontrollera om alla fält är ifyllda' });
        }

        console.log(data);

        return res.status(201).json({ success: "Dina uppgifter registrerades" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Ett oväntat fel inträffade. Försök senare igen.' });
    }
};
