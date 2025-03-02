import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ConfigProvider } from "antd";
import "antd/dist/reset.css";
import { createRoutesFromElements } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import ProductScreen from "./Pages/ProductScreen/ProductScreen";
import HomeScreen from "./Pages/HomeScreen/HomeScreen";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import LoginScreen from "./Pages/LoginScreen/LoginScreen.jsx";
import CartScreen from "./Pages/CartScreen/CartScreen.jsx";
import RegisterScreen from "./Pages/RegisterScreen/RegisterScreen.jsx";
import ProfileScreen from "./Pages/profileScreen/profileScreen.jsx";
import ShippingScreen from "./Pages/shippingScreen/shippingScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx/PrivateRoute.jsx";
import PlaceOrderScreen from "./Pages/PlaceOrderScreen.jsx/PlaceOrderScreen.jsx";
import PaymentScreen from "./Pages/PaymentScreen/PaymentScreen.jsx";
import AdminRoute from "./Pages/admin/AdminRoute/AdminRoute.jsx";
import AdminLayout from "./Pages/admin/AdminLayout/AdminLayout.jsx";
import AdminOrders from "./Pages/admin/AdminOrderList/AdminOrderList.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <ProfileScreen />
          </PrivateRoute>
        }
      />
      <Route path="/shipping" element={<ShippingScreen />} />
      <Route
        path="/payment"
        element={
          <PrivateRoute>
            <PaymentScreen />
          </PrivateRoute>
        }
      />
      <Route
        path="/placeorder"
        element={
          <PrivateRoute>
            <PlaceOrderScreen />
          </PrivateRoute>
        }
      />
      <Route element={<AdminRoute />}>
        <Route element={AdminLayout}>
          <Route path="/admin/orders" element={<AdminOrders/>} />
        </Route>
      </Route>
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#1890ff",
          },
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
