import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Product from "./../models/productModel.js";
import Cart from "./../models/cartModel.js";

// @desc   Create new order
// @route  POST /api/orders
// @access Private
const createOrder = asyncHandler(async (req, res) => {
  const { userName, address, phoneNumber, paymentMethod } = req.body;
  const user = await User.findById(req.user._id);
  const cart = await Cart.findOne({ userId: user });

  if (!userName || !address || !phoneNumber || !paymentMethod) {
    res.status(400);
    throw new Error("Vui lòng nhập đủ thông tin");
  } else {
    const order = new Order({
      userId: req.user._id,
      cartId: cart,
      userName: userName,
      address: address,
      phoneNumber: phoneNumber,
      paymentMethod: paymentMethod === 0 ? "Trực tiếp" : "Chuyển khoản",
    });

    await order.save();

    res.status(201).json({ message: "Đặt hàng thành công" });
  }
});

// @desc   Get order by ID
// @route  GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Không tìm thấy đơn hàng");
  }
});

// @desc   Get all orders
// @route  GET /api/orders
// @access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().sort({ userName: "asc" });
  res.json({ orders });
});

// @desc   delete order
// @route  delete /api/orders/:id
// @access Private
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new Error("Đơn hàng không tồn tại", 404);
  } else {
    if (order.status !== 0) {
      throw new Error(
        "Đơn hàng của bạn đang được giao! Không thể hủy đơn hàng",
        401
      );
    } else {
      await order.remove();
      res.status(200).json({
        success: true,
        message: "Xóa đơn hàng thành công",
      });
    }
  }
});

// @desc   update order
// @route  patch /api/orders/:id
// @access Private
const updateOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.status = req.body.status;
    order.save();
    res.status(200).json({
      message: `Bạn vừa xác nhận đơn hàng có mã là ${req.params.id}`,
      order,
    });
  } else {
    res.status(404).json({
      message: "Không tồn tại đơn hàng này",
    });
  }
});

export { createOrder, getOrders, getOrderById, deleteOrder, updateOrder };
