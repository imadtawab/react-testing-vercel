import React from 'react';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import AdminLayout from './Layouts/Admin/AdminLayout/AdminLayout';
import NewProduct from './Pages/NewProduct/NewProduct';
import Products from './Pages/Products/Products';
import Orders from './Pages/Orders/Orders';
import Home from './Pages/Client/Home/Home';
import OrderDetails from './Pages/OrderDetails/OrderDetails';
import ProductDetails from './Pages/ProductDetails/ProductDetails';
import AddVariants from './Pages/AddVariants/AddVariants';
import OrdersTracking from './Pages/OrdersTracking/OrdersTracking';
import EditProduct from './Pages/EditProduct/EditProduct';
import Dashboard from './Pages/Dashboard/Dashboard';
import AccountAdminLayout from './Layouts/Admin/AccountAdminLayout/AccountAdminLayout';
import { ConfirmEmail, ForgotChangePassword, ForgotPassword, Login, Register } from './Pages/Account/Account';
import { Provider } from 'react-redux';
import store from './store';
import ClientLayout from './Layouts/Client/ClientLayout/ClientLayout';
import ProductsPage from './Pages/Client/ProductsPage/ProductsPage';
import About from './Pages/Client/About/About';
import ClientProductDetails from './Pages/Client/ClientProductDetails/ClientProductDetails';
import Cart from './Pages/Client/Cart/Cart';
import AuthAdmin from './Auth/AuthAdmin';
import {AuthProvider, RequireAuth} from 'react-auth-kit'
import Attributes from './Pages/Attributes/Attributes';
import Categories from './Pages/Categories/Categories';
import Profile from './Pages/Profile/Profile';
import Settings from './Pages/Settings/Settings';
import Password from './Pages/Password/Password';
import UserProfile from './Pages/UserProfile/UserProfile';
import ModalValidation from './Components/ModalValidation/ModalValidation';
import OrderTrackingDetails from './Pages/OrderTrackingDetails/OrderTrackingDetails';
import Invoice from './Pages/Invoice/Invoice';
import WishList from './Pages/Client/WishList/WishList';
// import {disableReactDevTools} from "@fvilers/disable-react-devtools"

// if(process.env.NODE_ENV === "production") disableReactDevTools()

const root = ReactDOM.createRoot(document.getElementById('root'));
const routes = createBrowserRouter([
  {
    path: '/',
    element: <ClientLayout/>,
    children: [
      {
        index:true,
        element:  <Home/>
      },
      {
        path: "collection/:collection_slug",
        element: <div>Collection slug</div>,
      },
      {
        path: "products",
        element:  <ProductsPage/> // cancel this page and the path
      },
      {
        path: "products/:product_slug",
        element: <ClientProductDetails/>
      },
      {
        path: "about",
        element:  <About/>
      },
      {
        path: "cart",
        element: <Cart/>
      },
      {
        path: "wishlist",
        element: <WishList/>
      }
    ]
  },
  {
  path:'/admin',
  element: 
   <RequireAuth loginPath='/admin/account/login'>
              <AdminLayout/>
  </RequireAuth>,
  children: [
    {
      index: true,
      element: <Dashboard/>,
    },
    {
      path:"products",
      element: <Products/>
    },
    {
      path:"products/edit/:id",
      element: <EditProduct/>
    },
    {
      path:"products/:id",
      element: <ProductDetails/>
    },
    // {
    //   path:"products/add-variants/:id",
    //   element: <AddVariants/>
    // },
    {
      path: "new-product",
      element: <NewProduct/>
    },
    {
      path:"orders",
      element: <Orders/>
    },
    {
      path:"orders-tracking",
      element: <OrdersTracking/>
    },
    {
      path:"orders-tracking/details",
      element: <OrderTrackingDetails/>
    },
    {
      path:"orders/invoice",
      element: <Invoice/>
    },
    {
      path:"orders/:id",
      element: <OrderDetails/>
    },

    {
      path:"attributes",
      element: <Attributes/>
    },
    {
      path:"categories",
      element: <Categories/>
    },
    {
      path: "settings",
      element: <Settings/>,
      children: [
        {
          index: true,
          element: <Profile/>
        },
        {
          path: "profile",
          element: <Profile/>
        },
        {
          path: "password",
          element: <Password/>
        },
        {
          path: "notification",
          element: <Profile/>
        },
      ]
    },
  ]

},
{
  path:"/admin/account",
  element: <AccountAdminLayout/>,
  children:[
    {
      path: "login",
      element: <Login/>
    },
    {
      path: "register",
      element: <Register/>
    },
    {
      path: "forgot-password",
      element: <ForgotPassword/>
    },
    {
      path: "forgot-password/:forgotPasswordCode",
      element: <ForgotChangePassword/>
    },
    {
      path: "confirm_email/:activationCode",
      element: <ConfirmEmail isActive={true}/>
    },
  ]
},
{
  path:"/admin/account",
  element: <AdminLayout/>,
  children:[
    {
      path: "profile",
      element: <UserProfile/>
    }
  ]
}
]) 
// loading="lazy"
root.render(
  <React.StrictMode>
    <AuthProvider authType='cookie' authName='_auth' cookieDomain={window.location.hostname} cookieSecure={false}>
      <Provider store={store}>
        <RouterProvider router={routes}/>
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);

const modalRoot = ReactDOM.createRoot(document.getElementById('modal'));
modalRoot.render(  <React.StrictMode>
      <div>
        <ModalValidation/>  
        </div>
</React.StrictMode>)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
