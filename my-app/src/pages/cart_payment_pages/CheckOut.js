import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm ";
import { CartContext } from "../../Context/CartContext";
import Spinners from "../../components/spinners/Spinners";

export default function CheckOut() {
  const stripePromise = loadStripe("pk_test_51QcxyBC8xBDEyq1IR3JDFzfgJGgjFiZZAhiodN7TVq5ruc0xyohbyDMWhnfQoYp87rwM6nfskIhkFZE1rBAmhF6K00MyGgTfj9");
  const [clientSecret, setClientSecret] = useState("");

  const {cartItems} = useContext(CartContext);

  useEffect(() => {

    fetch("http://localhost:3030/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cartItems}),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Server response:", data); // 
        if (data.client_secret) {
          
          setClientSecret(data.client_secret);
        } else {
          console.error("No client_secret in server response");
        }
      })
      .catch((err) => console.error("Error fetching client secret:", err));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return clientSecret ? (
    <Elements options={options} stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  ) : (
    <Spinners />
  );
  
}
