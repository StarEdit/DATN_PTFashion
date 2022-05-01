import { useRoutes } from "react-router-dom";

import { LOGIN, PRODUCT, REGISTER, ROOT, CART, ORDER } from "./CONSTANTS";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProductPage from "../pages/ProductPage";
import CartPage from "pages/CartPage";
import OrderPage from "pages/OrderPage";

const RouterConfig = () => {
  const routes = useRoutes([
    { path: `${ROOT}`, element: <HomePage /> },
    { path: `${LOGIN}`, element: <LoginPage /> },
    { path: `${REGISTER}`, element: <RegisterPage /> },
    { path: `${PRODUCT}`, element: <ProductPage /> },
    { path: `${CART}`, element: <CartPage /> },
    { path: `${ORDER}`, element: <OrderPage /> },
  ]);

  return routes;
};

export default RouterConfig;
