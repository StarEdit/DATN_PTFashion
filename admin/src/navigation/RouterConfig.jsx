import { useRoutes } from "react-router-dom";

import {
  ROOT,
  LOGIN,
  PRODUCT,
  PRODUCT_EDIT,
  CATEGORY,
  CATEGORY_EDIT,
  ORDER,
  ORDER_EDIT,
  ACCOUNT,
  ACCOUNT_EDIT,
} from "./CONSTANTS.js";

import CategoryPage from "../pages/CategoryPage";
import LoginPage from "../pages/LoginPage";
import AccountPage from "../pages/AccountPage";
import ProductPage from "../pages/ProductPage";
import OrderPage from "../pages/OrderPage";

const RouterConfig = () => {
  const routes = useRoutes([
    {
      path: `${PRODUCT}`,
      element: <ProductPage />,
      children: [{ path: `${PRODUCT_EDIT}`, element: <ProductPage /> }],
    },
    { path: `${ROOT}`, element: <LoginPage /> },
    {
      path: `${CATEGORY}`,
      element: <CategoryPage />,
      children: [{ path: `${CATEGORY_EDIT}`, element: <CategoryPage /> }],
    },
    {
      path: `${ACCOUNT}`,
      element: <AccountPage />,
      children: [{ path: `${ACCOUNT_EDIT}`, element: <AccountPage /> }],
    },
    {
      path: `${ORDER}`,
      element: <OrderPage />,
      children: [{ path: `${ORDER_EDIT}`, element: <OrderPage /> }],
    },
  ]);

  return routes;
};

export default RouterConfig;
