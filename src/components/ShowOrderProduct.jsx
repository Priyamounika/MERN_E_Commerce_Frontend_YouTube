import React, {useEffect, useState } from "react";


const ShowOrderProduct = ({ items }) => {
 
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (items) {
      for (let i = 0; i < items?.length; i++) {
        qty += items[i].qty;
        price += items[i].price;
      }
    }
    setPrice(price);
    setQty(qty);
  }, [items]);

  return (
    <>
      <table className="table table-bordered border-gray-600 bg-white !text-black text-center">
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
            
          </tr>
        </thead>
        <tbody>
          {items?.map((product) => (
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
             
            </tr>
          ))}

          <tr>
            <th scope="row" className="bg-white !text-black text-light"></th>
            <td className="bg-white !text-black text-light">
              {" "}
              <button
                className="btn btn-primary !bg-[#461971] !border-none !px-2"
                style={{ fontWeight: "bold" }}
              >
                Total
              </button>{" "}
            </td>
            <td className="bg-white !text-black text-light">
              {" "}
              <button
                className="btn "
                style={{ fontWeight: "bold" }}
              >
                {price}
              </button>
            </td>
            <td className="bg-white !text-black text-light">
              <button className="btn" style={{ fontWeight: "bold" }}>
                {qty}
              </button>
            </td>
            
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ShowOrderProduct;
