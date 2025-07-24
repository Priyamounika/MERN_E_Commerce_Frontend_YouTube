import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";

const ShowProduct = () => {
  const { products, filteredData, addToCart } = useContext(AppContext);
  return (
    <>
      <div className="container  d-flex justify-content-center align-items-center">
        <div className="row container d-flex justify-content-center align-items-center my-5">
          {filteredData?.map((product) => (
            <div
              key={product._id}
              className="my-3 col-md-4 
            d-flex justify-content-center align-items-center"
            >
              <div
                className="card bg-white !rounded-xl text-light shadow text-center"
                style={{ width: "18rem" }}
              >
                <Link
                  to={`/product/${product._id}`}
                  className="d-flex justify-content-center align-items-center p-3"
                >
                  <img
                    src={product.imgSrc}
                    className="card-img-top"
                    alt="..."
                    style={{
                      width: "200px",
                      height: "200px",
                      borderRadius: "10px",
                      border: "1px solid #d0a9f5",
                    }}
                  />
                </Link>
                <div className="card-body">
                  <h5 className="card-title !text-black">{product.title}</h5>
                  <div className="my-3">
                    <button className="btn btn-primary mx-3 !text-[15px] !py-[6px] !px-2 !font-normal !border-gray-500 !border-[1px] !bg-white !text-black ">
                      {product.price} {"₹"}
                    </button>
                    <button
                      className="btn btn-warning !text-white !uppercase !text-[14px] !py-[7px] !px-2 !font-normal !border-white !bg-[#461971]"
                      onClick={() =>
                        addToCart(
                          product._id,
                          product.title,
                          product.price,
                          1,
                          product.imgSrc
                        )
                      }
                    >
                      Add To Cart
                    </button>
                  </div>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShowProduct;
