import React, { useContext, useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { CartContext } from "../Context/CartContext";
import { AuthSessionContext } from "../Context/SessionProvider";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const { session } = useContext(AuthSessionContext);
  const { clearCart, cartItems, total } = useContext(CartContext);

  const [errorMessage, setErrorMessage] = useState(null);
  const [isCheckedItem, setIsCheckedItem] = useState(false);
  const [toThePayment, setToThePayment] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isClicked, setIsClicked] = useState(true);
  const [theUser, setTheUser] = useState([]);
  const [payUserData, setPayUserData] = useState({
    email: "",
    birthday: "",
    firstname: "",
    lastname: "",
    phone: "",
    address: "",
    postal: "",
  });

  useEffect(() => {
    if (session) {
      fetchCostumerById();
    }
  }, []);

  const fetchCostumerById = async () => {
    const response = await fetch(`http://localhost:3030/auth/profile`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    // console.log(data.users_info);

    if (response.ok) {
      alert(data.success);
      setTheUser(data.users_info);
    } else {
      alert(data.error);
    }
  };

  //Funktionen är för att gå vidare till användarinformationen
  const goToUserData = () => {
    setIsCheckedItem(true);
    setToThePayment(true);
  };

  //Funktionen för att gå tillbaka till orderöversitt
  const goBackToOrder = () => {
    setIsCheckedItem(false);
    setToThePayment(false);
    setIsCompleted(false);
  };

//Funktionen för att gå vidare till betalning
  const goToPayment = () => {
    if (
      !payUserData.email ||
      !payUserData.firstname ||
      !payUserData.lastname ||
      !payUserData.phone ||
      !payUserData.address ||
      !payUserData.postal
    ) {
      alert("Fälten är obligatoriska");
      return;
    }

    setIsCompleted(true);
    setToThePayment(false);
    setIsClicked(false);
  };

  //Funktionen för att gå tillbaka till kunduppgifter
  const goBackToUserInfo = () => {
    setToThePayment(true);
    setIsCompleted(false);
    setIsCheckedItem(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPayUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    localStorage.removeItem("cart");
    if (session) {
      clearCart();
    }

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/payment-success",
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <main className="checkout-container">
      <section className="checkout-section-wrapper">
   
        {isCheckedItem ? (
          <div className="checkout-show-order">
            <h1>Orderöversitt</h1>
            <p onClick={goBackToOrder}>Visa</p>
          </div>
        ) : (
          <>
            <article className="ckeckout-order-items-wrapper">
              <h1>Orderöversitt</h1>
              {cartItems.map((item) => (
                <div className="checkout-items">
                  <div className="checkout-items-img">
                    <img src={item.product_img} />
                  </div>

                  <div className="checkout-items-details">
                    <div className="checkout-items-title-price">
                    <p>{item.product_title}</p>
                    <p id="checkout-unit_price">{item.unit_price}.-</p>
                    </div>
                    <p>Antal: {item.quantity}</p>
                  </div>
                </div>
              ))}

              <div className="checkout-total-price">
                <p>Totalbelopp:</p>
                <p id="checkout-price">{total}.-</p>
              </div>

              <div className="checkout-to-costumer-info-btn">
                <p onClick={goToUserData}>Nästa - Kunduppgifter</p>
              </div>
            </article>
          </>
        )}

        <article className="checkout-form">
          <form onSubmit={handleSubmit}>
            {toThePayment ? (
              <>
                <article className="checkout-user-form">
                  <h1>Kunduppgifter</h1>

                  <div className="peronnr-email-wrapper">
                    <input
                      id="personnr"
                      type="text"
                      placeholder="Personnummer"
                      required
                      name="birthday"
                      onChange={handleChange}
                    />
                    <input
                      id="email"
                      type="email"
                      placeholder="Email"
                      required
                      name="email"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="firstname-lastname-wrapper">
                    <input
                      type="text"
                      placeholder="Förnamn"
                      required
                      name="firstname"
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      placeholder="Efternamn"
                      required
                      name="lastname"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="phonenumber-wrapper">
                    <input
                      type="text"
                      placeholder="Telefonnummer"
                      required
                      name="phone"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="address-postalcode-wrapper">
                    <input
                      id="address"
                      type="text"
                      placeholder="Address"
                      required
                      name="address"
                      onChange={handleChange}
                    />
                    <input
                      id="postalcode"
                      type="text"
                      placeholder="Postnummer"
                      required
                      name="postal"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="checkout-to-payment-btn">
                    <p className="checkout-btn" onClick={goToPayment}>
                      Fortsätt - Betalning
                    </p>
                  </div>
                </article>
              </>
            ) : (
              <>
                <div className="checkout-costumer-info">
                  <h1>Kunduppgifter</h1>
                  {isClicked ? "" : <p onClick={goBackToUserInfo}>Visa</p>}
                </div>
              </>
            )}
            {isCompleted ? (
              <article className="checkout-payment-wrapper">
                <PaymentElement />
                <div className="checkout-pay-btn-wrapper">
                  <button className="pay-btn" disabled={!stripe}>
                    Betala
                  </button>
                </div>
                {/* Show error message to your customers */}
                {errorMessage && <div>{errorMessage}</div>}
              </article>
            ) : (
              <>
                <div className="checkout-show-payment">
                  <h1>Betalningssätt</h1>
                </div>
              </>
            )}
          </form>
        </article>
      </section>
    </main>
  );
};

export default CheckoutForm;
