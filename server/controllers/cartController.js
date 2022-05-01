import asyncHandler from "express-async-handler";
import Cart from "../models/cartModel.js";

// @desc    get all cart by userId
// @route   GET /api/carts/
// @access  private
const getCarts = asyncHandler(async (req, res, next) => {
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

// @desc    post new cart
// @route   POST /api/carts/
// @access  private
const createCart = asyncHandler(async (req, res) => {
  const { name, quantity, price, discount, image, productId } = req.body;
  const newCart = {
    name,
    quantity,
    price,
    discount,
    image,
    userId: req.user._id,
    productId,
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
    });
  } else {
    const newCart = await Cart.create({
      userId: req.user._id,
      products: [
        {
          name,
          quantity,
          price,
          discount,
          image,
          productId,
        },
      ],
    });

    if (newCart) {
      res.status(201).json({
        mesage: "Thêm sản phẩm vào giỏ hàng thành công",
      });
    } else {
      res.status(404);
      throw new Error("Không tìm thấy sản phẩm giỏ hàng");
    }
  }
});

// @desc    delete cart
// @route   DELETE/api/carts/:id
// @access  private
const deleteCart = asyncHandler(async (req, res) => {
  let carts = await Cart.findOne({ userId: req.user._id });
  if (carts) {
    let itemIndex = carts.products.findIndex(
      (pro) => pro._id.toString() === req.params.id.toString()
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

export { getCarts, createCart, deleteCart };
