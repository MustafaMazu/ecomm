import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { authContext } from "./AuthContext";

export const cartContext = createContext();

const CartContextProvider = ({ children }) => {

   const {token} = useContext(authContext)

    const [numOfItems, setNumOfItems] = useState(0)
    const [products, setProducts] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)


  async function addProductToCart(productId) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: productId
        }, {
          headers: {
            token: localStorage.getItem("tkn"),
          }
        }
      );


      getUSerCart()
      return data;
    } catch (error) {
      console.log(error);
    }
  }


  async function getUSerCart(){
    try {
        const {data} = await axios('https://ecommerce.routemisr.com/api/v1/cart' , {
            headers: {
                token: localStorage.getItem("tkn")
            }
        }
     )
     setNumOfItems(data.numOfCartItems)
     setProducts(data.data.products)
     setTotalPrice(data.data.totalCartPrice)

     return data
    } catch (error) {
        console.log(error , "getUserCart Context");
    }
  }

  async function updateCount(id, count ){
    try {
        const {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
            count : count 
        } , {
            headers : {
                token: localStorage.getItem('tkn')
            }
            
        }
    )
        
    
    setNumOfItems(data.numOfCartItems)
     setProducts(data.data.products)
     setTotalPrice(data.data.totalCartPrice) 
    return data
        
    } catch (error) {
        console.log(error , 'count error update');
        
    }
  }


 async function  deleteProduct(id){

    try {
        const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
            headers: {
                token : localStorage.getItem('tkn')
            }
        })

        setNumOfItems(data.numOfCartItems)
     setProducts(data.data.products)
     setTotalPrice(data.data.totalCartPrice) 
        return data;
        
    } catch (error) {
        console.log(error , "delete error");
    }



 }



 async function  clearCart(){

    try {
        const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers: {
                token : localStorage.getItem('tkn')
            }
        })

        setNumOfItems(0)
     setProducts([])
     setTotalPrice()
        return data;
        
    } catch (error) {
        console.log(error , "delete error");
    }



 }


  useEffect( function () {
   if(token !== null) {
    getUSerCart()
   }
  },[token])


  return (
    <cartContext.Provider value={{addProductToCart , products , totalPrice , numOfItems , updateCount , deleteProduct , clearCart}}>
      {children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;
