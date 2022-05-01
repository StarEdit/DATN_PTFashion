import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const files = req.files;
  const {
    name,
    categoryId,
    description,
    price,
    percentSale,
    colors,
    sizes,
    qtyInStock,
  } = req.body;

  const product = new Product({
    name: name,
    listImage:
      files &&
      files.map((item) => `http://localhost:${process.env.PORT}/` + item.path),
    categoryId: categoryId,
    description: description,
    price: price,
    percentSale: percentSale,
    colors: colors,
    sizes: sizes,
    qtyInStock: qtyInStock,
  });

  await product.save();

  if (product) {
    res.status(201).json({
      message: "Tạo sản phẩm thành công",
    });
  } else {
    res.status(400);
    throw new Error("Tạo không thành công");
  }
});

// @desc   Get all product
// @route  GET /api/products
// @access Private/Admin
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().sort({ name: "asc" });
  res.json({ products });
});

// @desc    Get top rated products
// @route   GET /api/products/params
// @access  Public
const getProductsByCategory = asyncHandler(async (req, res) => {
  const filter = {};

  if (req.query.categoryId) {
    filter = { categoryId: req.query.categoryId.split(",") };
  }

  const products = await Product.find(filter);

  if (products) {
    res.json({ products });
  } else {
    res.status(404);
    throw new Error("Không có sản phẩm");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await Product.delete({ _id: req.params.id });
    res.json({ message: "Xóa sản phẩm thành công" });
  } else {
    res.status(404);
    throw new Error("Không tồn tại sản phẩm");
  }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    weight,
    dimensions,
    categoryId,
    countInStock,
    discount,
  } = req.body;
  const files = req.files;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    (product.listImage =
      files &&
      files.map((item) => `http://localhost:${process.env.PORT}/` + item.path)),
      (product.price = price || product.price);
    product.description = description || product.description;
    product.weight = weight || product.weight;
    product.dimensions = dimensions || product.dimensions;
    product.discount = discount || product.discount;
    product.categoryId = categoryId || product.categoryId;
    product.countInStock = countInStock || product.countInStock;

    await product.save();
    res.json({
      message: "Update Product Successfully",
    });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getAllProducts,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
};
