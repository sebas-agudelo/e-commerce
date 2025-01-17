import { supabase_config } from "../../supabase_config/supabase_conlig.js";
const supabase = supabase_config();

export const searchProduct = async (req, res) => {
    try{
         const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Sökterm saknas.' });
  }

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .ilike('title', `%${query}%`); // Matchar case-insensitivt

    if (error) {
      throw error;
    }

    res.status(200).json(data);

    }catch(error){
        console.error(error);
        
    }
}