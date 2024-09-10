import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Products from "./Components/Products/Products";
import Category from "./Components/Category/Category";
import Brand from "./Components/Brand/Brand";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NotFound from "./Components/NotFound/NotFound";
import { Toaster } from "react-hot-toast";
import AuthContextProvider from "./Context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import Home from './Components/Home/Home';
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import CartContextProvider from "./Context/CartContext";
import Cart from "./Components/Cart/Cart";
import Payment from "./Components/Payment/Payment";
import CartIcon from "./Components/CartIcon/CartIcon";
import WishList from "./Components/WishList/WishList";
import WishListContextProvider from "./Context/WishListContext";
import SubCategory from "./Components/SubCategory/SubCategory";


function App() {
  const x = new QueryClient();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "/",
          element: (
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          ),
        },
        {
          path: "/productDetails/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails/>
            </ProtectedRoute>
          ),
        },
        {
          path: "/category",
          element: (
            <ProtectedRoute>
              <Category />
            </ProtectedRoute>
          ),
        },
        {
          path: "/subcategories",
          element: (
            <ProtectedRoute>
              <SubCategory />
            </ProtectedRoute>
          ),
        },

        {
          path: "/wishlist",
          element: (
            <ProtectedRoute>
              <WishList />
            </ProtectedRoute>
          ),
        },
        {
          path: "/payment",
          element: (
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          ),
        },

        {
          path: "/cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },

        {
          path: "/cart",
          element: (
            <ProtectedRoute>
              <CartIcon />
            </ProtectedRoute>
          ),
        },
       
       
        {
          path: "/brand",
          element: (
            <ProtectedRoute>
              <Brand />
            </ProtectedRoute>
          ),
        },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },

        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <QueryClientProvider client={x}>
      <AuthContextProvider>
      
        <CartContextProvider>
          <WishListContextProvider>
        <Toaster />
        <RouterProvider router={router} />
        </WishListContextProvider>
        </CartContextProvider>
       
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
