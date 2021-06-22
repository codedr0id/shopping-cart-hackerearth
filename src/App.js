import React, { useState, useEffect } from "react";
import "./App.css";

import ItemList from "./components/ItemList";
import PriceContainer from "./components/FinalPrice";
import data from "./data/data";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [items, setItems] = useState(
    data.map((d) => {
      return { ...d, quantity: 1 };
    })
  );
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [typeDiscount, setTypeDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const items = localStorage.getItem("items");
    if (items) {
      setItems(
        JSON.parse(items).map((d) => {
          return { ...d, quantity: 1 };
        })
      );
    }
  }, []);

  useEffect(() => {
    const totalQuantity = items.reduce((t, item) => t + item.quantity, 0);
    setTotalQuantity(totalQuantity);

    const discount = items.reduce(
      (t, item) => t + item.discount * item.quantity,
      0
    );
    setDiscount(discount);

    let typeDiscount = 0;
    for (const item of items) {
      if (item.type === "fiction") {
        typeDiscount += item.quantity * (item.price * 0.15);
      }
    }
    setTypeDiscount(typeDiscount);

    const totalPrice = items.reduce(
      (t, item) => t + item.price * item.quantity,
      0
    );
    setTotalPrice(totalPrice);

    setFinalPrice(totalPrice - discount - typeDiscount);

    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const removeItem = (id) => {
    const name = items.filter((item) => item.id === id);
    const updatedItems = items.filter((item) => item.id !== id);
    console.log(name);
    toast.success(`❌ ${name[0].name} deleted successfully`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
    setItems(updatedItems);
  };

  const increaseItemQuantity = (id) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        item.quantity++;
      }
      return item;
    });
    setItems(updatedItems);
  };

  const decreaseItemQuantity = (id) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        item.quantity > 0 && item.quantity--;
      }
      return item;
    });
    setItems(updatedItems);
  };

  const resetCart = () => {
    setItems(
      data.map((d) => {
        return { ...d, quantity: 1 };
      })
    );
    toast.success("✔ Cart reset successful", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Order Summary</h1>
      </div>
      <div className="cart-container">
        <ItemList
          items={items}
          totalQuantity={totalQuantity}
          removeItem={(id) => removeItem(id)}
          increaseItemQuantity={(id) => increaseItemQuantity(id)}
          decreaseItemQuantity={(id) => decreaseItemQuantity(id)}
        />
        <PriceContainer
          totalQuantity={totalQuantity}
          discount={discount}
          typeDiscount={typeDiscount}
          totalPrice={totalPrice}
          finalPrice={finalPrice}
          resetCart={resetCart}
        />
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
