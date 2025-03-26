import React, { useContext } from 'react'
import { ProductContext } from '../../Context/ProductContext';
import { SlClose } from "react-icons/sl";
import { LuCircleCheckBig } from "react-icons/lu";

export default function ProductsMessages() {
    const { okmessage, Errormessage } = useContext(ProductContext);
  return (
    <>
         <p className={okmessage ? "ok-message" : "no-ok-message"}>
                  {okmessage ? (
                    <>
                      <LuCircleCheckBig />
                      {okmessage}
                    </>
                  ) : (
                    ""
                  )}
                </p>
                <p className={Errormessage ? "error-message" : "no-error-message"}>
                  {Errormessage ? (
                    <>
                      <SlClose />
                      {Errormessage}
                    </>
                  ) : (
                    ""
                  )}
                </p>
    </>
  )
}
