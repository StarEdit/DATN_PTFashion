import asyncHandler from "express-async-handler";
import Cart from "../models/cartModel.js";

// @desc    Xem giỏ hàng theo id người dùng
// @route   GET /api/cart
// @access  Protect
const getCarts = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error("Không tìm thấy giỏ hàng");
  }

  res.status(200).json({
    success: true,
    products: cart.products,
  });
});

// @desc    Tạo giỏ hàng
// @route   POST /api/cart
// @access  Protect
const createCart = asyncHandler(async (req, res) => {
  const { productId, productName, quantity, price, percentSale, color, size } =
    req.body;
  const newCart = {
    userId: req.user._id,
    productId,
    productName,
    quantity,
    price,
    percentSale,
    color,
    size,
  };
  const cart = await Cart.findOne({ userId: req.user._id });

  if (cart) {
    const isCart = cart.products.find(
      (pro) => pro.productId.toString() === productId.toString()
    );
    if (isCart) {
      cart.products.forEach((pro) => {
        if (pro.productId.toString() === productId.toString()) {
          pro.quantity = quantity;
        }
      });
    } else {
      cart.products.push(newCart);
    }
    await cart.save();
    res.status(200).json({
      success: true,
      message: "Thêm sản phẩm vào giỏ hàng thành công",
      cart,
    });
  } else {
    const newCart = await Cart.create({
      userId: req.user._id,
      products: [
        {
          productId,
          productName,
          quantity,
          price,
          percentSale,
          color,
          size,
        },
      ],
    });

    if (newCart) {
      res.status(201).json({
        message: "Thêm sản phẩm vào giỏ hàng thành công",
      });
    } else {
      res.status(404);
      throw new Error("Không tìm thấy sản phẩm giỏ hàng");
    }
  }
});

// @desc    Tăng số lượng sản phẩm
// @route   PATCH /api/cart/plus/:id
// @access  Protect
const plusProduct = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  let carts = await Cart.findOne({ userId: userId });

  if (carts) {
    let itemIndex = carts.products.findIndex(
      (pro) => pro.productId.toString() === req.params.id.toString()
    );
    if (itemIndex === -1)
      return res
        .status(400)
        .json({ message: "Sản phẩm không có trong giỏ hàng" });

    carts.products[itemIndex].quantity += 1;

    carts = await carts.save();

    return res.status(200).json({ message: "Thêm thành công" });
  } else {
    res.status(404);
    throw new Error("Không tìm thấy sản phẩm trong giỏ hàng");
  }
});

// @desc    Giảm số lượng sản phẩm
// @route   PATCH /api/cart/minus/:id
// @access  Protect
const minusProduct = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  let carts = await Cart.findOne({ userId: userId });

  if (carts) {
    let itemIndex = carts.products.findIndex(
      (pro) => pro.productId.toString() === req.params.id.toString()
    );
    if (itemIndex === -1)
      return res
        .status(400)
        .json({ message: "Sản phẩm không có trong giỏ hàng" });

    carts.products[itemIndex].quantity -= 1;

    if (carts.products[itemIndex].quantity === 0) {
      carts.products.splice(itemIndex, 1);
    }

    carts = await carts.save();

    return res.status(200).json({ message: "Giảm thành công" });
  } else {
    res.status(404);
    throw new Error("Không tìm thấy sản phẩm trong giỏ hàng");
  }
});

// @desc    Xóa giỏ hàng
// @route   DELETE /api/cart/delete/:id
// @access  Protect
const deleteCart = asyncHandler(async (req, res) => {
  let carts = await Cart.findOne({ userId: req.user._id });
  if (carts) {
    let itemIndex = carts.products.findIndex(
      (pro) => pro.productId.toString() === req.params.id.toString()
    );
    if (itemIndex > -1) {
      carts.products.splice(itemIndex, 1);
    } else {
      return res.json({ message: "Sản phẩm không có trong giỏ hàng" });
    }
    carts = await carts.save();
    res.json({ message: "Xóa sản phẩm trong giỏ hàng thành công" });
  } else {
    res.status(404);
    throw new Error("Không tìm thấy sản phẩm giỏ hàng");
  }
});

// @desc    Tổng tiền
// @route   GET /api/cart/total
// @access  Protect
const getTotal = asyncHandler(async (req, res) => {
  let carts = await Cart.findOne({ userId: req.user._id });

  if (!carts) {
    res.status(404);
    throw new Error("Không tìm thấy giỏ hàng");
  }

  let total = carts.products.reduce((prev, product) => {
    return (prev +=
      (product.price - product.price * (product.percentSale / 100)) *
      product.quantity);
  }, 0);

  let totalProduct = carts.products.length;

  return res.status(200).json({
    success: true,
    message: "Thành công",
    total: total,
    totalProduct: totalProduct,
  });
});

export {
  getCarts,
  createCart,
  plusProduct,
  minusProduct,
  deleteCart,
  getTotal,
};
