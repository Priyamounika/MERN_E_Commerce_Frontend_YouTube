import React,{useContext,useEffect,useState} from 'react'
import AppContext from '../context/AppContext';

const TableProduct = ({ cart }) => {
    const {decreaseQty, addToCart, removeFromCart, clearCart } =
      useContext(AppContext);
    const [qty, setQty] = useState(0);
    const [price, setPrice] = useState(0);
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

    
  return (
    <>
      <table className="table table-bordered border-gray-400 bg-white !text-black text-center">
        <thead>
          <tr>
            <th scope="col" className="bg-white !text-black text-light">
              Product Img
            </th>
            <th scope="col" className="bg-white !text-black text-light">
              Title
            </th>
            <th scope="col" className="bg-white !text-black text-light">
              Price
            </th>
            <th scope="col" className="bg-white !text-black text-light">
              Qty
            </th>
            <th scope="col" className="bg-white !text-black text-light">
              +
            </th>
            <th scope="col" className="bg-white !text-black text-light">
              -
            </th>
            <th scope="col" className="bg-white !text-black text-light">
              remove
            </th>
          </tr>
        </thead>
        <tbody>
          {cart?.items?.map((product) => (
            <tr key={product._id}>
              <th scope="row" className="bg-white !text-black text-light">
                <img
                  src={product.imgSrc}
                  style={{ width: "50px", height: "50px" }}
                />
              </th>
              <td className="bg-white !text-black text-light">{product.title}</td>
              <td className="bg-white !text-black text-light">{product.price}</td>
              <td className="bg-white !text-black text-light">{product.qty}</td>
              <td className="bg-white !text-black text-light">
                <span
                  className="material-symbols-outlined"
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
                  add_circle
                </span>
              </td>
              <td className="bg-white !text-black text-light">
                <span
                  className="material-symbols-outlined"
                  onClick={() => decreaseQty(product?.productId, 1)}
                >
                  do_not_disturb_on
                </span>
              </td>
              <td className="bg-white !text-black text-light">
                <span
                  className="material-symbols-outlined"
                  onClick={() => {
                    if (confirm("Are you sure, want remove from cart")) {
                      removeFromCart(product?.productId);
                    }
                  }}
                >
                  delete
                </span>
              </td>
            </tr>
          ))}

          <tr>
            <th scope="row" className="bg-white !text-black text-light"></th>
            <td className="bg-white !text-black text-light">
              {" "}
              <button
                className="btn btn-primary !bg-[#461971] !border-none !px-5"
                style={{ fontWeight: "bold" }}
              >
                Total
              </button>{" "}
            </td>
            <td className="bg-white !text-black text-light">
              {" "}
              <button
                className="btn btn-warning !bg-white !border-none"
                style={{ fontWeight: "bold" }}
              >
                {price}
              </button>
            </td>
            <td className="bg-white !text-black text-light">
              <button className="btn btn-info !bg-white !border-none" style={{ fontWeight: "bold" }}>
                {qty}
              </button>
            </td>
            <td className="bg-white !text-black text-light"></td>
            <td className="bg-white !text-black text-light"></td>
            <td className="bg-white !text-black text-light"></td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default TableProduct