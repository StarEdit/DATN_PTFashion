import { useRoutes } from "react-router-dom";

import {
  LOGIN,
  PRODUCT,
  REGISTER,
  ROOT,
  CART,
  ORDER,
  PRODUCT_CATEGORY,
  SEARCH,
  ABOUT_US,
} from "./CONSTANTS";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProductPage from "../pages/ProductPage";
import CartPage from "pages/CartPage";
import OrderPage from "pages/OrderPage";
import SearchResult from "pages/SearchResult";
import AboutUs from "pages/AboutUs";

const RouterConfig = () => {
  const routes = useRoutes([
    { path: `${ROOT}`, element: <HomePage /> },
    { path: `${LOGIN}`, element: <LoginPage /> },
    { path: `${REGISTER}`, element: <RegisterPage /> },
    {
      path: `${PRODUCT}`,
      element: <ProductPage />,
      children: [{ path: `${PRODUCT_CATEGORY}`, element: <ProductPage /> }],
    },
    { path: `${CART}`, element: <CartPage /> },
    { path: `${ORDER}`, element: <OrderPage /> },
    { path: `${SEARCH}`, element: <SearchResult /> },
    { path: `${ABOUT_US}`, element: <AboutUs /> },
  ]);

  return routes;
};

export default RouterConfig;
