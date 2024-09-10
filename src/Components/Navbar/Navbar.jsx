import { useContext } from "react";
import logo from "./../../assets/images/freshcart-logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";
import { cartContext } from "../../Context/CartContext";


const Navbar = () => {
  const { token, setToken } = useContext(authContext);
  const { numOfItems } = useContext(cartContext);
  

  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("tkn");
    setToken(null);
    navigate("/login");
  }

  return (
    <nav className=" z-50 fixed top-0 w-full  py-3 bg-slate-200">
      <div className="lg:w-[90%] mx-auto lg:flex lg:flex-wrap lg:justify-between lg:items-center">
        <div className="logo">
          <img src={logo} alt="" />
        </div>

        <div className="navlinks text-center">
          <ul className="lg:flex lg:flex-wrap lg:justify-between lg:items-center">
            {token ? (
              <>
                <li className="mt-4 lg:ml-4">
                  <NavLink to="/">Home</NavLink>
                </li>


                <li className="mt-4 lg:ml-4 relative">
                  <NavLink to="/cart">
                    Cart
                   
                  </NavLink>
                </li>

                <li className="mt-4 lg:ml-4">
                  <NavLink to="/products">Products</NavLink>
                </li>

                
            <li className="mt-4 lg:ml-4">
              <NavLink to="/wishlist">Wish List</NavLink>
            </li>
           
           
            <li className="mt-4 lg:ml-4">
                  <NavLink to="/category">Category</NavLink>
                </li>

                <li className="mt-4 lg:ml-4">
                  <NavLink to="/brand">Brand</NavLink>
                </li>

               
              </>
            ) : (
              ""
            )}
          </ul>
        </div>

        <div className="social text-center lg:flex lg:flex-wrap lg:justify-between lg:items-center">
          <div className="mt-4">
           
           {token ? (
           <NavLink to="/cart">  <i className=" text-2xl relative fa-solid fa-cart-shopping">
              <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-green-500   -top-4 -end-4 ">
                      {numOfItems}
                    </div>
            </i></NavLink>
           ) : ""}

          </div>

          <div className="mt-4">
            {token ? (
             
              
              <button onClick={logout} className="lg:ml-5 ml-4">
                logout
              </button>
            ) : (
              <>
                <NavLink className="lg:ml-5 ml-4" to="/login">
                  Login
                </NavLink>
                <NavLink className="lg:ml-5 ml-4" to="/register">
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
