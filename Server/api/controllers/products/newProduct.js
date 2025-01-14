import { supabase_config } from "../../supabase_config/supabase_conlig.js";
import { productDataValidation } from "../../validate/productDataValidation.js";
import { productFileValidation } from "../../validate/productDataValidation.js";
import multer from 'multer';
import validator from 'validator';

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
    garanti
  } = req.body;

  const file = req.file;

  // Validerar om om kommande data uppfyller alla krav innan den når databasen
  const dataValidation = productDataValidation( 
    title,
    price,
    category_id,
    category_name,
    description,
    brand,
    connection_type,
    charging_time,
    battery_life,
    garanti);

    if(dataValidation){
      return res
      .status(400)
      .json({ error: dataValidation.error });
    }

  try {

    let imageUrl = null;

    //Om det finns en file så kör vi koden annars fortsätter koden med att lägga till produkten
    if(file){

      //Kontrollerar om filen är giltig bildformat
      const fileValidation = productFileValidation(file);

      if(fileValidation){
        return res
      .status(400)
      .json({ error: fileValidation.error });
      }

    const {data: uploadData, error: uploadError} = await supabase.storage
    .from('product_img')
    .upload(`public/${Date.now()}_${file.originalname}`, file.buffer, {
      contentType: file.mimetype
    });

    if (uploadError) {
      console.log('Upload Error: ', uploadError); 
      return res.status(500).json({error: "Något gick fel under filuppladdning"});
  }

  if(!uploadData){
      return res.status(500).json({ error: "Filen kunde inte laddas upp. Försök igen." });
  };

  const { data: publicUrlData } = supabase.storage
  .from('product_img')
  .getPublicUrl(uploadData.path);

   imageUrl = publicUrlData.publicUrl;

}
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
        .json({ error: "Något gick fel. Kontrollera att inga obligatoriska fält har lämnats tomma" });
    }

    return res.status(200).json({ success: `Produkten ${title} är nu tillagd i databasen`  });
  } catch (error) {
    console.log(error);
  }
};