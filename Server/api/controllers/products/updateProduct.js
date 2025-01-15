import { supabase_config } from "../../supabase_config/supabase_conlig.js";
import { productDataValidation } from "../../validate/productDataValidation.js";
import { productFileValidation } from "../../validate/productDataValidation.js";
import multer from 'multer';

const supabase = supabase_config();
export const upload = multer({storage: multer.memoryStorage()}); 

export const updateProduct = async (req, res) => {
    const { id } = req.params;

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
    } = req.body;

    const file = req.file;

    if (!id) {
        return res.status(400).json({ error: "Ogiltigt produkt-ID" });
    }

    try {
        const { data: existingProduct, error: fetchError } = await supabase
            .from("products")
            .select("*")
            .eq("id", id)
            .single();

        if (fetchError || !existingProduct) {
            console.log("Produkt hittades inte:", fetchError || "Ingen produkt med det ID:t.");
            return res.status(404).json({ error: "Produkten hittades inte" });
        }

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
            garanti
        );

        if (dataValidation) {
            return res.status(400).json({ error: dataValidation.error });
        }

        let imageUrl = existingProduct.img; 

        if (file) {
            const fileValidation = productFileValidation(file);

            if (fileValidation) {
                return res.status(400).json({ error: fileValidation.error });
            }

            const { data: uploadData, error: uploadError } = await supabase.storage
                .from("product_img")
                .upload(`public/${Date.now()}_${file.originalname}`, file.buffer, {
                    contentType: file.mimetype,
                });

            if (uploadError) {
                console.log("Upload Error: ", uploadError);
                return res
                    .status(500)
                    .json({ error: "Något gick fel under filuppladdning" });
            }

            if (!uploadData) {
                return res
                    .status(500)
                    .json({ error: "Filen kunde inte laddas upp. Försök igen." });
            }

            const { data: publicUrlData } = supabase.storage
                .from("product_img")
                .getPublicUrl(uploadData.path);

            imageUrl = publicUrlData.publicUrl;
        }

        const { data, error } = await supabase
            .from("products")
            .update({
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
                img: imageUrl,
            })
            .eq("id", id) 
            .select();

        if (!data || error) {
            console.log("Uppdateringsfel:", error);
            return res.status(400).json({
                error: "Något gick fel. Kontrollera att alla obligatoriska fält är ifyllda",
            });
        }

        return res
            .status(200)
            .json({ success: `Produkten ${title} har uppdaterats i databasen` });

    } catch (error) {
        console.log("Internt fel:", error);
        return res.status(500).json({ error: "Ett oväntat fel inträffade" });
    }
};
