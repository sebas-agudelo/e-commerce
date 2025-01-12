import { supabase_config } from "../../supabase_config/supabase_conlig.js";
import multer from 'multer';

const supabase = supabase_config();
export const upload = multer({storage: multer.memoryStorage()}); 

export const newProduct =  async (req, res) => {
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

  const file = req.file;

  if(!file){
    console.error("Ingen fil bifogades.");
    return res.status(400).json({ error: "En bildfil måste tillhandahållas." });  
  }

  if (!title || !price || !category_id) {
    return res
      .status(400)
      .json({ error: "Titel, pris och kategori-ID måste tillhandahållas." });
  }
  
  try {

    const {data: uploadData, error: uploadError} = await supabase.storage
    .from('product_img')
    .upload(`public/${Date.now()}_${file.originalname}`, file.buffer, {
      contentType: file.mimetype
    });

    if (uploadError) {
      console.log('Upload Error: ', uploadError); 
      return res.status(500).json({error: "EROOR 500...... Något gick fel under filuppladdning"});
  }

  if(!uploadData){
      return res.status(500).json({ error: "Filen kunde inte laddas upp. Försök igen." });
  };

  const { data: publicUrlData } = supabase.storage
  .from('product_img')
  .getPublicUrl(uploadData.path);

  const imageUrl = publicUrlData.publicUrl;

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
          img: imageUrl
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