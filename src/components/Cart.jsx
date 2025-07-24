import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, decreaseQty, addToCart, removeFromCart, clearCart } =
    useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (cart?.items) {
      for (let i = 0; i < cart.items?.length; i++) {
        qty += cart.items[i].qty;
        price += cart.items[i].price;
      }
    }
    setPrice(price);
    setQty(qty);
  }, [cart]);

  // console.log("my cart", cart);
  return (
    <>
      {cart?.items?.length == 0 ? (
        <>
        <div className="text-center my-5">

          <button
            className="btn btn-warning mx-3"
            style={{ fontWeight: "bold", fontSize: "1.2rem" }}
            onClick={()=>navigate('/')}
            >
            Continue Shopping...
          </button>
            </div>
        </>
      ) : (
        <>
          <div className="my-5 text-center">
            <button
              className="btn btn-info mx-3 !bg-white !border-violet-200 shadow-sm"
              style={{ fontWeight: "bold", fontSize: "1.2rem" }}
            >
              <span className="!font-medium !text-gray-800 !text-[18px]">Total Qty:</span> {qty}
            </button>
            <button
              className="btn btn-warning mx-3 !bg-white !border-violet-200 shadow-sm"
              style={{ fontWeight: "bold", fontSize: "1.2rem" }}
            >
                <span className="!font-medium !text-gray-800 !text-[18px]">Total Price:</span> {price}
            </button>
          </div>
        </>
      )}

      {cart?.items?.map((product) => (
        <div
          key={product._id}
          className="container p-3 bg-white border rounded-lg my-5 text-center"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <div className="cart_img">
              <img
                src={product.imgSrc}
                alt=""
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "10px",
                }}
              />
            </div>
            <div className="cart_des !text-black">
              <h2 className="!text-[22px] md:!w-[] lg:!w-80">{product.title}</h2>
              <div>
              <h4 className="!text-[17px]"><span className="text-gray-500">Price: </span>{product.price}</h4>
              <h4 className="!text-[17px]"><span className="text-gray-500">Quantity: </span>{product.qty}</h4>
            </div>
            </div>
            
            <div className="cart_action">
              <button
                className="btn btn-warning mx-3 !border-gray-400 !p-0 !py-1 !px-[15px] !bg-white"
                style={{ fontWeight: "bold" }}
                onClick={() => decreaseQty(product?.productId, 1)}
              >
                -
              </button>
              <button
                className="btn btn-info mx-3 !border-gray-400 !p-0 !py-1 !px-3 !bg-white"
                style={{ fontWeight: "extrabold" }}
                onClick={() =>
                  addToCart(
                    product?.productId,
                    product.title,
                    product.price / product.qty,
                    1,
                    product.imgSrc
                  )
                }
              >
                +
              </button>
              <button
                className="btn btn-danger mx-3"
                style={{ fontWeight: "bold" }}
                onClick={() => {
                  if (confirm("Are you sure, want remove from cart")) {
                    removeFromCart(product?.productId);
                  }
                }}
              >
                Remove{" "}
              </button>
            </div>
          </div>
        </div>
      ))}

      {cart?.items?.length > 0 && (
        <div className="container text-center my-3">
          <button
            className="btn btn-warning mx-3 !px-5 !border-none !text-[18px] !font-normal !text-white !bg-[#461971]"
            style={{ fontWeight: "bold" }}
            onClick={() => navigate("/shipping")}
          >
            Checkout
          </button>
          <button
            className="btn btn-danger mx-3 !px-5 !border-gray-400 !text-[18px] !font-normal !text-black !bg-white"
            style={{ fontWeight: "bold" }}
            onClick={() => {
              if (confirm("Are you sure, want clear cart ...?")) {
                clearCart();
              }
            }}
          >
            Clear Cart
          </button>
        </div>
      )}
    </>
  );
};

export default Cart;
