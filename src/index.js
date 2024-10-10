import './index.scss'
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import store from './Store/index'
import { Provider } from 'react-redux';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AccountAdminLayout from './Admin/Layouts/AccountAdminLayout/AccountAdminLayout';
import Regsiter from './Admin/Pages/AccountPages/Regsiter';
import Login from './Admin/Pages/AccountPages/Login';
import ForgotPassword from './Admin/Pages/AccountPages/ForgotPassword';
import ConfirmEmail from './Admin/Pages/AccountPages/ConfirmEmail';
import PageNotFound from './Admin/Components/PageNotFound/PageNotFound';
import ForgotChangePassword from './Admin/Pages/AccountPages/ForgotChangePassword';
import AdminLayout from './Admin/Layouts/AdminLayout/AdminLayout';
import ModalValidation from './Admin/Components/ModalValidation/ModalValidation';
import Attributes from './Admin/Pages/AttributePages/Attributes/Attributes';
import EditAttribute from './Admin/Pages/AttributePages/New_Edit_Attribute/EditAttribute';
import NewAttribute from './Admin/Pages/AttributePages/New_Edit_Attribute/NewAttribute';
import Categories from './Admin/Pages/CategoriePages/Categories/Categories';
import NewCategory from './Admin/Pages/CategoriePages/New_Edit_Category/NewCategory';
import EditCategory from './Admin/Pages/CategoriePages/New_Edit_Category/EditCategory';
import ProductsAdmin from './Admin/Pages/ProductPages/Products/Products';
import NewProduct from './Admin/Pages/ProductPages/New_Edit_Product/NewProduct';
import EditProduct from './Admin/Pages/ProductPages/New_Edit_Product/EditProduct';
import ProductVariants from './Admin/Pages/ProductPages/ProductVariants/ProductVariants';
import ClientLayout from './Client/Layouts/ClientLayout/ClientLayout';
import Home from './Client/Pages/Home/Home';
import ProductDetails from './Client/Pages/ProductDetails/ProductDetails';
import WishList from './Client/Pages/WishList/WishList';
import Cart from './Client/Pages/Cart/Cart';
import Orders from './Admin/Pages/OrderPages/Orders/Orders';
import OrderDetails from './Admin/Pages/OrderPages/OrderDetails/OrderDetails';
import OrdersTracking from './Admin/Pages/OrderPages/OrdersTracking/OrdersTracking';
import OrderTrackingDetails from './Admin/Pages/OrderPages/OrderTrackingDetails/OrderTrackingDetails';
import Dashboard from './Admin/Pages/Dashboard/Dashboard';
import ProductsClient from './Client/Pages/Products/Products';
import SettingsLayout from './Admin/Layouts/SettingsLayout/SettingsLayout';
import SettingsAccountPages from './Admin/Pages/SettingsAccountPages/SettingsAccountPages';
import Profile from './Admin/Pages/SettingsAccountPages/Profile/Profile';
import Password from './Admin/Pages/SettingsAccountPages/Password/Password';
import SettingsGeneralPages from './Admin/Pages/SettingsGeneralPages/SettingsGeneralPages';
import StoreDetails from './Admin/Pages/SettingsGeneralPages/StoreDetails/StoreDetails';
import SocialMedia from './Admin/Pages/SettingsGeneralPages/SocialMedia/SocialMedia';
import Address from './Admin/Pages/SettingsGeneralPages/Address/Address';
import SettingsShippingPages from './Admin/Pages/SettingsShippingPages/SettingsShippingPages';
import ShippingMethods from './Admin/Pages/SettingsShippingPages/ShippingMethods/ShippingMethods';
import NewShippingMethod from './Admin/Pages/SettingsShippingPages/NewShippingMethod/NewShippingMethod';
import Coupons from './Admin/Pages/CouponPages/Coupons/Coupons';
import NewCoupon from './Admin/Pages/CouponPages/New_Edit_Coupon/NewCoupon';
import EditCoupon from './Admin/Pages/CouponPages/New_Edit_Coupon/EditCoupon';
import Checkout from './Client/Pages/Checkout/Checkout';

const root = ReactDOM.createRoot(document.getElementById('root'));


const routes = createBrowserRouter([
  {
    path: "/",
    element: <ClientLayout/>,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: "/products",
        children: [
          {
            index: true,
            element: <ProductsClient/>
          },
          {
            path: ":slug",
            element: <ProductDetails/>
          },
        ]
      },
      {
        path: "/wishlist",
        element: <WishList/>
      },
      {
        path: "/cart",
        element: <Cart/>
      },
      // {
      //   path: "/checkout/:id",
      //   element: <Checkout/>
      // },
    ]
  },
  {
    path: "/admin",
    element:   
      <AdminLayout/>,
    children: [
      {
        index: true,
        element: <Dashboard/>
      },
      {
        path: "products",
        children: [
          {
            index: true,
            element: <ProductsAdmin/>
          },
          {
            path: "new",
            element: <NewProduct/>
          },
          {
            path: "edit/:id",
            element: <EditProduct/>
          },
          {
            path: "variants/:id",
            element: <ProductVariants/>
          },
        ]
      },
      {
        path: "categories",
        children: [
          {
            index: true,
            element: <Categories/>
          },
          {
            path: "new",
            element: <NewCategory/>
          },
          {
            path: "edit/:id",
            element: <EditCategory/>
          },
        ]
      },
      {
        path: "attributes",
        children: [
          {
            index: true,
            element: <Attributes/>
          },
          {
            path: "new",
            element: <NewAttribute/>
          },
          {
            path: "edit/:id",
            element: <EditAttribute/>
          },
        ]
      },
      {
        path: "orders",
        children: [
          {
            index: true,
            element: <Orders/>
          },
          {
            path: ":id",
            element: <OrderDetails/>
          },
        ]
      },
      {
        path: "orders-tracking",
        children: [
          {
            index: true,
            element: <OrdersTracking/>
          },
          {
            path: "details",
            element: <OrderTrackingDetails/>
          },
        ]
      },
      {
        path: "coupons",
        children: [
          {
            index: true,
            element: <Coupons/>
          },
          {
            path: "new",
            element: <NewCoupon/>
          },
          {
            path: "edit/:id",
            element: <EditCoupon/>
          },
        ]
      },
      {
        path: "settings",
        element: <SettingsLayout/>,
        children: [
          {
            index: true,
            element: <Navigate to="account" replace={true} />
          },
          {
            path: "account",
            element: <SettingsAccountPages/>,
            children: [
              {
                index: true,
                element: <Navigate to="profile" replace={true} />
              },
              {
                path: "profile",
                element: <Profile/>
              },
              {
                path: "password",
                element: <Password/>
              },
            ]
          },
          {
            path: "general",
            element: <SettingsGeneralPages/>,
            children: [
              {
                index: true,
                element: <Navigate to="store-details" replace={true} />
              },
              {
                path: "store-details",
                element: <StoreDetails/>
              },
              {
                path: "social-media",
                element: <SocialMedia/>
              },
              {
                path: "address",
                element: <Address/>
              },
            ]
          },
          {
            path: "shipping",
            element: <SettingsShippingPages/>,
            children: [
              {
                index: true,
                element: <Navigate to="methods" replace={true} />
              },
              {
                path: "methods",
                element: <ShippingMethods/>
              },
              {
                path: "new",
                element: <NewShippingMethod/>
              },
            ]
          },
          {
            path: "payment",
            element: <div>payment</div>
          },
        ]
      },
      {
        path: "*",
        element: <PageNotFound to="/admin"/>
      }
    ]
  },
  {
    path: "/admin/account",
    element: <AccountAdminLayout/>,
    children:[
      {
        index: true,
        element: <Navigate to="/admin/account/login" replace={true} />
      },
      {
        path: "login",
        element: <Login/>
      },
      {
        path: "register",
        element: <Regsiter/>
      },
      {
        path: "register/activation",
        element: <Navigate to="/admin/account/register" replace={true} />
      },
      {
        path: "register/confirm_email/:activationCode",
        element: <ConfirmEmail/>
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
        path: "*",
        element: <PageNotFound to="/admin/account/login"/>
      }
    ]
  },
  {
    path: "*",
    element: <PageNotFound to="/"/>
  }
])
root.render(
  <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={routes}/>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          />
          <ModalValidation/>
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
