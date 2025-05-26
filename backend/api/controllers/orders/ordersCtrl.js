import { supabase_config } from "../../supabase_config/supabase_conlig.js";
import validator from "validator";
import { userDataValidations } from "../../validate/signValidation.js";

const supabase = supabase_config();

//Hämtar inloggade användarens order för att visa i Mina beställningar
export const showCostumersOrders = async (req, res) => {
  const userId = req?.user?.id || null;

  if (!userId) {
    return res
      .status(401)
      .json({ error: "Din session har gått ut. Logga in för att fortsätta." });
  }

  try {
    const { data: orders, error } = await supabase
      .from("orders")
      .select(
        `
    id,
    total_amount,
    created_at,
    payment_status,
    email,
    items_order (
      order_id,
      product_id,
      quantity,
      unit_price,
      product_title
    )
  `
      )
      .eq("user_id", userId);

    if (error) {
      throw new Error(
        `Internt fel vid hämtning av orders ---> showCostumersOrders orders: ${orders.message}`
      );
    }

    if (!orders || orders.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(orders);
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({ error: "Något gick fel. Försök igen." });
  }
};

//Bearbeartar inloggade användarens order
export const customerAuthOrders = async (req, res) => {
  const { ItemsToSend, email } = req.body;

  const userId = req?.user?.id || null;

  if (!userId) {
    return res
      .status(401)
      .json({ error: "Din session har gått ut. Logga in för att fortsätta." });
  }

  try {
    const { data: shopping_cart, error } = await supabase
      .from("shopping_cart")
      .select("id, user_id, total_price")
      .eq("user_id", userId);

    if (error) {
      throw new Error(
        `Internt fel vid hämtning av varukorgen i samband med skapande av order (customerAuthOrders): ${error.message}`
      );
    }

    if (shopping_cart.length <= 0) {
      return res.status(400).json({
        error:
          "Ordern kunde inte skapas eftersom varukorgen är tom. Försök igen efter att du har lagt till produkter.",
      });
    }

    let totalAmount = 0;
    shopping_cart.forEach((item) => {
      totalAmount += item.total_price;
    });

    const { data: orders, error: ordersError } = await supabase
      .from("orders")
      .insert([
        {
          user_id: userId,
          email: email,
          total_amount: totalAmount,
          payment_status: "paid",
          guest_id: null,
        },
      ])
      .select();

    if (ordersError) {
      throw new Error(
        `Internt fel vid skapande av orders. 'ordersError' (customerAuthOrders): ${ordersError.message}`
      );
    }

    if (
      orders === null ||
      orders === undefined ||
      orders.length === 0 ||
      !orders[0].id
    ) {
      return res.status(500).json({
        error: "Din order kunde inte registreras korrekt. Försök igen.",
      });
    }

    const orderID = orders[0].id;

    const theItems = ItemsToSend.map((item) => ({
      order_id: orderID,
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: item.unit_price,
      total_amount: item.total_price,
      product_title: item.product_title,
    }));

    const { data: items_order, error: items_orders_Error } = await supabase
      .from("items_order")
      .insert(theItems)
      .select();

    if (items_orders_Error) {
      throw new Error(
        `Internt fel vid skapande av items order. 'items_orders_Error' (customerAuthOrders): ${items_orders_Error.message}`
      );
    }

    return res
      .status(201)
      .json({ success: "Tack för din betalning, din order är skapad" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Något gick fel. Försök igen." });
  }
};

//Bearbetar utloggade användarens order
export const customerOrders = async (req, res) => {
  const { guestDataObject, ItemsToSend } = req.body;
  const { email, firstname, lastname, birthday, phone, address, postal_code } =
    guestDataObject;

  const userId = req?.user?.id || null;
  const validationError = userDataValidations(email, firstname, lastname, birthday, phone, address, postal_code);
  if (validationError) {
    return res.status(400).json(validationError);
  }

  try {

    const { data: guestData, error: guestDataError } = await supabase
      .from("guest")
      .insert([
        {
          email: email || null,
          firstname: firstname || null,
          lastname: lastname || null,
          person_number: birthday || null,
          phone: phone || null,
          address: address || null,
          postal_code: postal_code || null,
        },
      ])
      .select();

    if (guestDataError) {
      throw new Error(
        `Internt fel vid skapande av gäst data. 'guestDataError' (Utloggad användare) (customerAuthOrders): ${guestDataError.message}`
      );
    }

    if (
      guestData === null ||
      guestData === undefined ||
      guestData.length === 0 ||
      !guestData[0].id
    ) {
      return res.status(500).json({
        error: "Dina personuppgifter kunde inte registreras korrekt. Försök igen.",
      });
    }
    const guestID = guestData[0].id;

    let totalAmount = 0;
    ItemsToSend.forEach((item) => {
      totalAmount += item.total_price;
    });

    const { data: orders, error: ordersError } = await supabase
      .from("orders")
      .insert([
        {
          user_id: userId,
          email: email,
          total_amount: totalAmount,
          payment_status: "paid",
          guest_id: guestID,
        },
      ])
      .select();

    if (ordersError) {
      throw new Error(
        `Internt fel vid skapande av orders. 'ordersError' (Utloggad användare) (customerAuthOrders): ${ordersError.message}`
      );
    }

    if (
      orders === null ||
      orders === undefined ||
      orders.length === 0 ||
      !orders[0].id
    ) {
      return res.status(500).json({
        error: "Din order kunde inte registreras korrekt. Försök igen.",
      });
    }

    const orderID = orders[0].id;

    const theItems = ItemsToSend.map((item) => ({
      order_id: orderID,
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: item.unit_price,
      total_amount: item.total_price,
      product_title: item.product_title,
    }));

    const { data: items_order, error: items_orders_Error } = await supabase
      .from("items_order")
      .insert(theItems)
      .select();

    if (items_orders_Error) {
      throw new Error(
        `Internt fel vid skapande av items order. 'items_orders_Error' (Utloggad användare) (customerAuthOrders): ${items_orders_Error.message}`
      );
    }

    return res
      .status(201)
      .json({ success: "Tack för din betalning, din order är skapad" });
  } catch (error) {
    // console.error(error);
    return res.status(500).json({ error: "Något gick fel. Försök igen." });
  }
};
