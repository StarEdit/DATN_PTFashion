import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Product from "./../models/productModel.js";
import Cart from "./../models/cartModel.js";

// @desc   Tạo đơn hàng
// @route  POST /api/order
// @access Protect
const createOrder = asyncHandler(async (req, res) => {
  const { userName, address, phoneNumber, email } = req.body;
  const user = await User.findById(req.user._id);
  const cart = await Cart.findOne({ userId: user });

  if (!userName || !address || !phoneNumber || !email) {
    res.status(400);
    throw new Error("Vui lòng nhập đủ thông tin");
  } else {
    const order = new Order({
      userId: req.user._id,
      cartId: cart,
      userName: userName,
      address: address,
      phoneNumber: phoneNumber,
      email: email,
    });

    await order.save();

    res.status(201).json({ message: "Đặt hàng thành công" });
  }
});

// @desc   Xem đơn hàng theo id
// @route  GET /api/order/:id
// @access Protect
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Không tìm thấy đơn hàng");
  }
});

// @desc   Xem tất cả đơn hàng
// @route  GET /api/order
// @access Protect/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().sort({ userName: "asc" });
  res.json({ orders });
});

// @desc   Xóa đơn hàng
// @route  delete /api/order/:id
// @access Protect
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Đơn hàng không tồn tại");
  } else {
    if (order.status === 1) {
      res.status(401);
      throw new Error(
        "Đơn hàng của bạn đang được giao! Không thể hủy đơn hàng"
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

// @desc   Cập nhật đơn hàng
// @route  patch /api/order/:id
// @access Protect/Admin
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
