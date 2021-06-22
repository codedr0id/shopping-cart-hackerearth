import React from "react";
import "../styles/FinalPrice.css";

const PriceContainer = ({
  totalQuantity,
  discount,
  typeDiscount,
  totalPrice,
  finalPrice,
  resetCart,
}) => {
  return (
    <div>
      <div className="price-details-container">
        <h2>Total</h2>
        <div className="space-between">
          <p>Items({totalQuantity})</p>
          <p>:</p>
          <p>${totalPrice}</p>
        </div>
        <div className="space-between">
          <p>Discount</p>
          <p>:</p>
          <p>-${discount}</p>
        </div>
        <div className="space-between">
          <p>Type discount</p>
          <p>:</p>
          <p>-${typeDiscount}</p>
        </div>
        <div className="space-between highlight">
          <p>Order total</p>
          <p>${finalPrice}</p>
        </div>
      </div>
      <button className="reset" onClick={() => resetCart()}>
        Reset cart
      </button>
    </div>
  );
};

export default PriceContainer;
