

import { useContext } from "react";
import { cartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";


const CartIcon = () => {
  const { products, totalPrice, updateCount, deleteProduct, clearCart } =
    useContext(cartContext);

  console.log(products, "cart page");

  return (
    <section className="py-8 ">
      <div className="w-full md:w-[80%] mx-auto bg-slate-200 p-5">
        {products?.length != 0 ? (
          <>
            <div className="flex flex-wrap justify-between items-center">
              <h2 className="text-3xl">Cart Shop</h2>

              <Link
                to="/payment"
                className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Check Out
              </Link>
            </div>

            <h2 className="text-green-400 text-2xl font-mono">
              Total Price : {totalPrice}{" "}
            </h2>

            {products?.map((item, idx) => (
              <>
                <div  className="flex flex-wrap justify-center items-center border-b-2 border-gray-500">
                  <div className="w-1/6 p-5">
                    <img
                      src={item.product.imageCover}
                      className="w-full"
                      alt=""
                    />
                  </div>
                  <div className="w-4/6 p-5">
                    <h2 className="mb-3 text-1xl">{item.product.title}</h2>
                    <h2 className="mb-3 text-1xl"> {item.price} EGP</h2>
                    <h2 className="mb-3 text-1xl"> {item.product.id} </h2>

                    <button
                      onClick={() => deleteProduct(item.product.id)}
                      type="button"
                      className=" text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="w-1/6 p-5">
                    <div className="flex  justify-between items-center">
                      <button
                        onClick={() =>
                          updateCount(item.product.id, item.count + 1)
                        }
                        type="button"
                        className=" text-white focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                      >
                        +
                      </button>

                      <h2 className="mx-3">{item.count}</h2>

                      <button
                        onClick={() =>
                          updateCount(item.product.id, item.count - 1)
                        }
                        type="button"
                        disabled={item.count == 0 ? true : false}
                        className={`${
                          item.count == 0 ? "disabled:opacity-25" : ""
                        }  text-white focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800`}
                      >
                        -
                      </button>
                    </div>
                        

                  </div>
                  
                </div>
                
              </>
            ))}
            <div className="flex flex-wrap justify-center items-center">
            <button
                  onClick={clearCart }
                      type="button"
                      className="my-5 text-3xl text-black border border-green-400 border-solid  focus:ring-4 focus:ring-green-300 font-medium rounded-lg  px-5 py-2.5 me-2 mb-2 focus:outline-none dark:focus:ring-green-500"
                    >
                  Clear Cart
                    </button>

            </div>
          </>
        ) : (
          <div>
            <h2 className=" text-3xl mb-5"> Cart Shop</h2>
            <h3 className=" text-3xl mb-5"> Your Cart is empty </h3>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartIcon;