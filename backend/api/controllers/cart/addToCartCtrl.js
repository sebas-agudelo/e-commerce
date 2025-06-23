import { supabase_config } from "../../supabase_config/supabase_conlig.js";
const supabase = supabase_config();

//Hämtar hela varukorgen
export const showCart = async (req, res) => {
  const userID = req?.user?.id;

  if (!userID) {
    return res
      .status(401)
      .json({ error: "Din session har gått ut. Logga in för att fortsätta." });
  }

  try {
    let { data: shopping_cart, error: cartError } = await supabase
      .from("shopping_cart")
      .select(
        "product_id, quantity, unit_price, total_price, product_title, product_img"
      )
      .eq("user_id", userID);

    if (cartError) {
      throw new Error(
        `Internt fel: Något gick fel vid hämtning av användarens varukorg (CartError - ShowCart): ${JSON.stringify(
          cartError
        )}`
      );
    }

    if (!shopping_cart || shopping_cart.length === 0) {
      return res.status(200).json({ shopping_cart: [] });
    }

    let totalPrice = 0;
    shopping_cart.forEach((total) => {
      totalPrice += +total.total_price;
    });

    return res.status(200).json({ shopping_cart, totalPrice });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Något gick fel. Försök igen" });
  }
};

//Lägger till varukorgen
export const addToCart = async (req, res) => {
  const { product_id, quantity } = req.body;

  const userID = req?.user?.id;

  if (!userID) {
    return res
      .status(401)
      .json({ error: "Din session har gått ut. Logga in för att fortsätta." });
  }

  if (!product_id) {
    console.error(`Product_id hittades inte: ${product_id}`);
    return;
  }

  if (!quantity || typeof quantity !== "number") {
    console.error(
      `Quantity är inget nummer eller ett giltigt värde: ${typeof quantity}`
    );
    return;
  }

  try {
    let { data: products, error: productsError } = await supabase
      .from("products")
      .select("id, title, price, img")
      .eq("id", product_id)
      .single();

    if (productsError) {
      throw new Error(
        `Internt fel: Misslyckades med att hämta produkt med category_id: ${product_id}. (productsError - addToCart): ${JSON.stringify(
          productsError
        )}`
      );
    }

    if (!products) {
      return res.status(404).json({
        error: "Produkten kunde inte hittas eller är tillfälligt borttagen.",
      });
    }

    const totalPrice = products.price * quantity;

    let { data: existingItem, error: existingItemError } = await supabase
      .from("shopping_cart")
      .select("id, quantity, total_price")
      .eq("user_id", userID)
      .eq("product_id", product_id)
      .maybeSingle();

    if (existingItemError) {
      throw new Error(
        `Internt fel vid kontroll om produkten redan finns i kundvagnen (addToCart: existingItemError): ${JSON.stringify(
          existingItemError
        )}`
      );
    }

    if (existingItem) {
      let updateQty = existingItem.quantity + quantity;
      let updateTotalPrice = updateQty * products.price;

      const { data: updateCartItem, error: updateError } = await supabase
        .from("shopping_cart")
        .update({
          quantity: updateQty,
          total_price: updateTotalPrice,
        })
        .eq("user_id", userID)
        .eq("id", existingItem.id)
        .select();

      if (updateError) {
        throw new Error(
          `Internt fel: Misslyckades att uppdatera redan existerande produkt i varukorgen. (addToCart: updateError): ${JSON.stringify(
            updateError
          )}`
        );
      }

      if (updateCartItem.length === 0) {
        return res.status(404).json({
          error:
            "Produkten du försöker uppdatera finns inte i varukorgen. Vänligen lägg till produkten i varukorgen.",
        });
      }

      return res.status(200).json({ success: "Varukorgen har uppdaterats." });
    } else {
      //Lägger jag till produkten i varukorgen om den inte finns.
      const { data: insertProduct, error: insertError } = await supabase
        .from("shopping_cart")
        .insert([
          {
            user_id: userID,
            product_id,
            product_title: products.title,
            unit_price: products.price,
            total_price: totalPrice,
            quantity,
            product_img: products.img,
          },
        ])
        .select();

      if (insertError) {
        throw new Error(
          `internt fel: Misslyckades att lägga till produkten/produkterna i varukorgen. (addToCart: insertError): ${JSON.stringify(
            insertError
          )}`
        );
      }

      return res.status(201).json({ success: "Tillagd i varukorgen." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Något gick fel. Försök igen." });
  }
};

//Uppdaterar produkten i varukorgen
export const updateCartQty = async (req, res) => {
  const { product_id, quantity } = req.body;
  const userID = req?.user?.id;

  if (!userID) {
    return res
      .status(401)
      .json({ error: "Din session har gått ut. Logga in för att fortsätta." });
  }

  if (!product_id) {
    console.error(`Product_id hittades inte: ${product_id}`);
    return;
  }

  if (typeof quantity !== "number") {
    console.error(
      `Quantity är inget nummer eller ett giltigt värde: ${typeof quantity}`
    );
    return;
  }

  try {
    let { data: shopping_cart, error: cartError } = await supabase
      .from("shopping_cart")
      .select("quantity, unit_price, total_price")
      .eq("product_id", product_id)
      .eq("user_id", userID)
      .single();

    if (cartError) {
      throw new Error(
        `internt fel: Misslyckades vid hämtning av varukorgen i varukorgen. (updateCartQty: cartError): ${JSON.stringify(
          cartError
        )}`
      );
    }

    const totalPrice = quantity * parseFloat(shopping_cart.unit_price);

    if (quantity < 1) {
      const { error: deleteError } = await supabase
        .from("shopping_cart")
        .delete()
        .eq("product_id", product_id)
        .eq("user_id", userID);

      if (deleteError) {
        throw new Error(
          `Internt fel: Misslyckades vid borttagning av produkt i varukorgen. (updateCartQty: deleteError): ${JSON.stringify(deleteError)}`
        );
      }

      return res.status(200).json({ deleted: "Produkten har tagits bort" });
    }

    const { data: updateCartItem, error: updateError } = await supabase
      .from("shopping_cart")
      .update({ quantity, total_price: totalPrice })
      .eq("user_id", userID)
      .eq("product_id", product_id)
      .select();

    if (updateError) {
      throw new Error(
        `Internt fel: Misslyckades vid uppdatering av produkt i varukorgen. (updateCartQty: updateError): ${JSON.stringify(updateError)}`
      );
    }

     if (updateCartItem.length === 0) {
      return res.status(404).json({
        error:
          "Produkten du försöker uppdatera finns inte i varukorgen. Vänligen lägg till produkten i varukorgen.",
      });
    };

    return res.status(200).json({
      success: "Varukorgen har uppdaterats",
      data: updateCartItem,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Något gick fel. Försök igen." });
  }
};

//Rensar hela varukorgen
export const deleteCart = async (req, res) => {
  const userID = req?.user?.id;

  if (!userID) {
    return res
      .status(401)
      .json({ error: "Din session har gått ut. Logga in för att fortsätta." });
  }

  try {
    const { error: deleteError } = await supabase
      .from("shopping_cart")
      .delete()
      .eq("user_id", userID);

    if (deleteError) {
      throw new Error(
        `internt fel vid produkt borttagning i varukorgen. 'deleteError' (deleteCart): ${deleteError.message}`
      );
    }

    return res.status(200).json({ success: "Varukorgen rensades" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Något fick fel. Försök igen" });
  }
};
