import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";

import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { cartContext } from "../../Context/CartContext";
import { wishListContext } from "../../Context/WishListContext";



const Products = () => {
  const { addProductToCart } = useContext(cartContext);
  const { addProductToWishList } = useContext(wishListContext);
  async function getAllProducts() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { data, isLoading, error, isFetching } = useQuery(
    "products",
    getAllProducts,
    {}
  );

  console.log(data?.data.data);

  async function addProduct(id) {
    const data = await addProductToCart(id);
    console.log(data);

    if (data) {
      toast.success(data.message);
    } else {
      toast.error("error");
    }
  }

  async function addWishList(id) {
    const data = await addProductToWishList(id);
    console.log(data);

    if (data) {
      toast.success(data.message);
    } else {
      toast.error("error");
    }
  }

  if (isLoading) {
    return (
      <div className="h-screen flex flex-wrap justify-center items-center bg-green-400 ">
        <i className="fa-solid fa-spinner fa-spin text-white text-7xl"></i>
      </div>
    );
  }

  return (
    <>
      <section className="p-8">

       
        <div className="w-full md:w-[90%] m-auto mt-10">
          <div className="flex flex-wrap justify-center items-center ">
            {data?.data.data.map((product, idx) => (
              <>
                <div key={idx} className="w-full sm:w-1/2 md:w-1/4  p-4">
                  <div className="inner p-3 bg-slate-200 ">
                    <Link to={`/productDetails/${product.id}`}>
                      <img
                        src={product.imageCover}
                        alt="img"
                        className="w-full"
                      />
                      <h2 className="text-green-500 mt-3 ">
                        {" "}
                        {product.category.name}{" "}
                      </h2>
                      <h2 className="mt-3">
                        {" "}
                        {product.title.split(" ").slice(0, 2).join(" ")}
                      </h2>

                      <div className="flex flex-wrap justify-between items-center mt-3">
                        <div>
                          <h4> {product.price} EGP</h4>
                        </div>
                        <div>
                          <h4>
                            {" "}
                            <i className="fa-solid fa-star text-yellow-400 mr-2"></i>{" "}
                            {product.ratingsAverage}{" "}
                          </h4>
                        </div>
                      </div>
                    </Link>

                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => addProduct(product.id)}
                        type="button"
                        className="w-[70%] mt-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                      >
                        Add To Cart
                      </button>

                      <button onClick={() => addWishList(product.id)}>
                        <i className="text-2xl fa-solid fa-heart"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ))}

           
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
