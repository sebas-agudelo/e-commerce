import { supabase_config } from "../../supabase_config/supabase_conlig.js";
const supabase = supabase_config();

export const productByCategory = async (req, res) => {
    const { categoryID } = req.params;
    try{

        let { data: products, error } = await supabase
        .from('products')
        .select('*')
        .eq('category_id', categoryID)
    

        if(error){
            return status(500).json({error: "Något gick fel kunde inte hämta kategorierna", error})
        }
        console.log(products);
        
        return res.status(200).json(products)
                
    }catch(error){
        console.error(error);
        
    }
}