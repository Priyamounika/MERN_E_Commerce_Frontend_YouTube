import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AppContext from "../context/AppContext";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState(" ");
  const [menuOpen, setMenuOpen] = useState(false); // Toggle state for mobile
  const navigate = useNavigate();
  const location = useLocation();

  const { setFilteredData, products, logout, isAuthenticated, cart } =
    useContext(AppContext);

  const filterbyCategory = (cat) => {
    setFilteredData(
      products.filter(
        (data) => data.category?.toLowerCase() === cat?.toLowerCase()
      )
    );
  };

  const filterbyPrice = (price) => {
    setFilteredData(products.filter((data) => data.price >= price));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/product/search/${searchTerm}`);
    setSearchTerm(" ");
    setMenuOpen(false); // close menu after search
  };

  return (
    <>
      <div className="nav sticky-top">
        {/* <div className="nav_bar flex justify-between items-center py-2 bg-purple-800 text-white"> */}
          <div className="nav_bar !flex !items-center !justify-between py-3 bg-purple-800 text-white !px-10">
          <Link
            to={"/"}
            className="text-xl font-bold"
            style={{ textDecoration: "none", color: "white" }}
          >
            E-Commerce
          </Link>

          {/* Hamburger icon for mobile */}
          <div
            className="flex justify-center items-center gap-3 md:hidden cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Link to="/cart" className="relative btn btn-primary">
                  <span className="material-symbols-outlined">shopping_cart</span>
                  {cart?.items?.length > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-xs px-1 rounded-full">
                      {cart?.items?.length}
                    </span>
                  )}
                </Link>
            <span className=" material-symbols-outlined text-white text-3xl">
              menu
            </span>
            
          </div>

          {/* Desktop view */}
          {/* <div className="hidden md:flex items-center space-x-4"> */}
          <div className="hidden md:flex items-center justify-end space-x-4 ml-auto">
            <form className="search_bar flex !bg-white !w-fit" onSubmit={submitHandler}>
              <span className="material-symbols-outlined text-black">search</span>
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="Search Products..."
                className="px-2 rounded-full w-full"
              />
            </form>

            {isAuthenticated ? (
              <>
                <Link to="/cart" className="relative btn btn-primary !bg-orange-400 !border-none">
                  <span className="material-symbols-outlined">shopping_cart</span>
                  {cart?.items?.length > 0 && (
                    <span className="absolute -top-2 right-0 !bg-red-500 text-xs px-1 rounded-full">
                      {cart?.items?.length}
                    </span>
                  )}
                </Link>
                <Link to="/profile" className="btn btn-info !bg-white !border-white">Profile</Link>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary !bg-white !text-black">Login</Link>
                <Link to="/register" className="btn btn-info !bg-orange-400 !border-white">Register</Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow-md p-4">
            <form className="search_bar !w-70 flex mb-3  !border" onSubmit={submitHandler}>
              <span className="material-symbols-outlined text-black">search</span>
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="Search Products..."
                className="px-2 py-0 rounded-full"
              />
            </form>

            {isAuthenticated ? (
              <>
                {/* <Link to="/cart" className="flex items-center mb-2">
                  <span className="material-symbols-outlined">shopping_cart</span>
                  <span className="ml-2">Cart ({cart?.items?.length || 0})</span>
                </Link> */}
                <Link to="/profile" className="btn btn-info w-60 mb-2 !border-white !text-white !bg-[#461971]">Profile</Link>
                <button
                  className="btn btn-danger w-60"
                  onClick={() => {
                    logout();
                    navigate("/");
                    setMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary w-full mb-2 !bg-white !text-black">Login</Link>
                <Link to="/register" className="btn btn-info w-full !bg-[#461971] !text-white !border-none">Register</Link>
              </>
            )}
          </div>
        )}

        {/* Filter bar (only on homepage) */}
        {location.pathname === "/" && (
          <div className="sub_bar overflow-x-auto shadow-lg bg-white text-black flex space-x-4 text-sm">
            <div className="items cursor-pointer !text-gray-400" onClick={() => setFilteredData(products)}>No Filter</div>
            <div className="items cursor-pointer" onClick={() => filterbyCategory("mobiles")}>Mobiles</div>
            <div className="items cursor-pointer" onClick={() => filterbyCategory("laptops")}>Laptops</div>
            <div className="items cursor-pointer" onClick={() => filterbyCategory("cameras")}>Cameras</div>
            <div className="items cursor-pointer" onClick={() => filterbyCategory("headphones")}>Headphones</div>
            <div className="items cursor-pointer" onClick={() => filterbyPrice(15999)}>₹15999</div>
            <div className="items cursor-pointer" onClick={() => filterbyPrice(25999)}>₹25999</div>
            <div className="items cursor-pointer" onClick={() => filterbyPrice(49999)}>₹49999</div>
            <div className="items cursor-pointer" onClick={() => filterbyPrice(69999)}>₹69999</div>
            <div className="items cursor-pointer" onClick={() => filterbyPrice(89999)}>₹89999</div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
