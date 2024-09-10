import { useContext } from "react";
import { wishListContext } from "../../Context/WishListContext";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

const WishList = () => {
  const { products, removeProduct } = useContext(wishListContext);
  const { addProductToCart } = useContext(cartContext);

  console.log(products, "Wishlist page");

  
  async function addProduct(id) {
    const data = await addProductToCart(id);
    console.log(data);
    if (data) {
      toast.success(data.message);
     
    } else {
      toast.error("error");
    }
  }


  return (
    <section className="py-8 ">
      <div className="w-full md:w-[90%] mx-auto bg-slate-200 p-3 mt-12">
        {products?.length != 0 ? (
          <>
            <div className="flex flex-wrap justify-between items-center">
              <h2 className="text-3xl"> My Wish List</h2>
            </div>

            {products?.map((item, idx) => (
              <>
                <div className="flex flex-wrap justify-center items-center border-b-2 border-gray-500">
                  <div className="w-1/6 p-5">
                    <img src={item.imageCover} className="w-full " alt="" />
                  </div>
                  <div className="w-4/6 p-5">
                    <h2 className="mb-3 text-1xl">{item.title}</h2>
                    <h2 className="mb-3 text-1xl"> {item.price} EGP</h2>
                    <h2 className="mb-3 text-1xl"> {item.productId} </h2>

                    <button
                      onClick={() => removeProduct(item.productId)}
                      type="button"
                      className=" text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="w-1/6 p-5">
                    <div className="flex  justify-between items-center">
                    <button
                        onClick={() => addProduct(item.id)}
                        type="button"
                        className="w-[70%] mt-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ))}
            <div className="flex flex-wrap justify-center items-center"></div>
          </>
        ) : (
          <div>
            <h2 className=" text-3xl mb-5"> Wishlist </h2>
            <h3 className=" text-3xl mb-5"> Your Wishlist is empty </h3>
          </div>
        )}
      </div>
    </section>
  );
};

export default WishList;
