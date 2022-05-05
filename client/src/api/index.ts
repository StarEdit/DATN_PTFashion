export const BASE_URL = "http://localhost:5000/api";

export const REGISTER = `${BASE_URL}/user`;
export const LOGIN = `${BASE_URL}/user/login`;
export const LOGOUT = `${BASE_URL}/user/logout`;
export const GET_CATEGORY = `${BASE_URL}/categories`;
export const GET_PRODUCT_CATEGORY = `${BASE_URL}/product-page`;
export const GET_PRODUCT = `${BASE_URL}/product-page`;
export const GET_PRODUCT_NAME = `${BASE_URL}/product-page/search?name=`;
export const ADD_CART = `${BASE_URL}/cart`;
export const PLUS_PRODUCT = `${BASE_URL}/cart/plus`;
export const MINUS_PRODUCT = `${BASE_URL}/cart/minus`;
export const DELETE_PRODUCT = `${BASE_URL}/cart/delete`;
export const GET_TOTAL = `${BASE_URL}/cart/total`;
export const CREATE_ORDER = `${BASE_URL}/order`;
export const PAY_MENT = `${BASE_URL}/paymentSuccess`;
