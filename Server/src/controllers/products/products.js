import { supabase_config } from "../../supabase_config/supabase_conlig.js";
const supabase = supabase_config();

export const newProduct = async (req, res) => {
  const {
    title,
    price,
    category_id,
    category_name,
    description,
    brand,
    connection_type,
    charging_time,
    battery_life,
    garanti,
    img,
  } = req.body;
  try {
    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          title,
          price,
          category_id,
          category_name,
          description,
          brand,
          connection_type,
          charging_time,
          battery_life,
          garanti,
          img,
        },
      ])
      .select();

    if (!data || error) {
      console.log(error);

      return res
        .status(400)
        .json({ error: "Något gick fel. Kunde inte läggas till" });
    }

    return res.status(200).json({ success: "Produkten kunde läggas till" });
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async (req, res) => {
  try {
    let { data: products, error } = await supabase.from("products").select("*");

    if (!products || error) {
      console.log(error);

      return res
        .status(400)
        .json({ error: "Något gick fel. Produkterna kunde inte hämtas" });
    }

    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
};
