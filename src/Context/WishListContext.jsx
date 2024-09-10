import { createContext, useContext, useEffect, useState } from "react";
import { authContext } from "./AuthContext";
import axios from "axios";

export const wishListContext = createContext();

const WishListContextProvider = ({ children }) => {
  const { token } = useContext(authContext);

  const [products, setProducts] = useState([]);

  async function addProductToWishList(productId) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId: productId,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );

      getUserWishList();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserWishList() {
    try {
      const { data } = await axios(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );

      setProducts(data.data);

      return data;
    } catch (error) {
      console.log(error, "getUserWishList Context");
    }
  }

  async function removeProduct(id) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );

      setProducts(data.data.products);

      return data;
    } catch (error) {
      console.log(error, "delete error");
    }
  }

  useEffect(
    function () {
      if (token !== null) {
        getUserWishList();
      }
    },
    [token]
  );

  return (
    <wishListContext.Provider
      value={{ addProductToWishList, products, removeProduct }}
    >
      {children}
    </wishListContext.Provider>
  );
};

export default WishListContextProvider;
