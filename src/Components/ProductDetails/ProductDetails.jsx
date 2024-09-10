import React, { useContext, useState } from "react";

import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { wishListContext } from "../../Context/WishListContext";

const ProductDetails = () => {
 const {addProductToWishList} = useContext(wishListContext)

   const {addProductToCart} =  useContext(cartContext)
const [loader , setLoader] =  useState()

   const {id} = useParams();

   async function getProduct (){
   
        return  await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }

   async function addWishList (){
   const data =   await addProductToWishList(id)
   console.log(data);

   if(data){
    toast.success(data.message)
   } else{
    toast.error('error')
   }
    }

  async  function  addProduct(){
    setLoader(true)
   const data = await addProductToCart(id);
   console.log(data);
   setLoader(false)

   if(data){
    toast.success(data.message)
   }else{
    toast.error('error')
    setLoader(false)  
   }

    }

   


  const {data , isLoading} = useQuery(`products${id}` , getProduct)

  if (isLoading) {
    return (
      <div className="h-screen flex flex-wrap justify-center items-center bg-green-400 ">
        <i className="fa-solid fa-spinner fa-spin text-white text-7xl"></i>
      </div>
    );
  }

  return (
    <section className="py-8">
      <div className="w-full md:w-[80%] mx-auto">
        <div className="flex flex-wrap justify-center items-center">
          <div className="w-full md:w-1/3 p-5">
            <div>
              <img src={data?.data.data.imageCover} alt="" />
            </div>
          </div>

          <div className="w-full md:w-2/3 p-5" > 
          
            <div>
                <h2 className="text-2xl mb-3  font-semibold"> {data?.data.data.title}</h2>

                <p className="text-1xl mb-3 ">{data?.data.data.description}</p>

                <h2 className="text-1xl mb-3 font-semibold text-green-400">{data?.data.data.category.name}</h2>
                <div className="flex flex-wrap justify-between items-center mt-3">
                      <div>
                        <h4> {data?.data.data.price} EGP</h4>
                      </div>
                      <div>
                        <h4>
                          {" "}
                          <i className="fa-solid fa-star text-yellow-400 mr-2"></i>{" "}
                         {data?.data.data.ratingsAverage}{" "}
                        </h4>

                      </div>
                    </div>
                    <button
                    onClick={addProduct}
                      type="button"
                      className="w-[90%] mt-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                    >
                    {loader? <i className="fa-solid fa-spinner fa-spin text-white"></i> : 'Add To Cart'}
                    </button>
                    <button onClick={addWishList}>  <i className="text-2xl fa-solid fa-heart"></i></button>
            </div>
          
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
