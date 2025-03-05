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
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import LoginScreen from "./pages/LoginScreen/LoginScreen.jsx";
import RegisterScreen from "./pages/RegisterScreen/RegisterScreen.jsx";
import AdminRoute from "./pages/AdminRoute/AdminRoute.jsx";
import AdminLayout from "./pages/AdminLayout/AdminLayout.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import UserManagement from "./pages/UserManagement/UserManagement.jsx";
import OrderManagement from "./pages/OrderManagement/OrderManagement.jsx";
import ProductManagementPage from "./pages/ProductControl/ProductControl.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/db" element={<Dashboard />} />
          <Route path="/admin/user" element={<UserManagement />} />
          <Route path="/admin/order" element={<OrderManagement/>} />
          <Route path="/admin/product" element={<ProductManagementPage/>} />

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
