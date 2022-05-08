import asyncHandler from "express-async-handler";
import Category from "./../models/categoryModel.js";
import Product from "./../models/productModel.js";

// @desc    Tạo danh mục
// @route   POST /api/category
// @access  Protect/Admin
const createCategory = asyncHandler(async (req, res) => {
  const category = new Category({
    category_name: req.body.category_name,
  });

  await category.save();

  res.status(201).json({
    message: "Tạo danh mục thành công",
  });
});

// @desc   Xem tất cả danh mục
// @route  GET /api/categories
// @access Public
const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ key: "asc" });

  res.json({ categories });
});

// @desc   Xem tất cả danh mục
// @route  GET /api/category
// @access Protect/Admin
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ key: "asc" });
  res.json({ categories });
});

// @desc   xem danh mục theo id
// @route  GET /api/category/:id
// @access Protect/admin
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    res.json(category);
  } else {
    res.status(404);
    throw new Error("Không tồn tại danh mục");
  }
});

// @desc    Cập nhật danh mục
// @route   PUT /api/category/:id
// @access  Protect/Admin
const updateCategory = asyncHandler(async (req, res) => {
  const { category_name } = req.body;

  const category = await Category.findById(req.params.id);

  if (category) {
    category.category_name = category_name
      ? category_name
      : category.category_name;

    await category.save();
    res.json({
      message: "Cập nhật thành công",
    });
  } else {
    res.status(404);
    throw new Error("Không tìm thấy danh mục");
  }
});

// @desc    Xóa danh mục
// @route   DELETE /api/category/:id
// @access  Protect/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  const product = await Product.find({ categoryId: category._id });
  if (product.length !== 0) {
    res.status(406).json({
      message: "không thể xóa danh mục này",
    });
  } else {
    if (category) {
      await Category.delete({ _id: req.params.id });
      res.status(200).json({ message: "Xóa danh mục thành công" });
    } else {
      res.status(404);
      throw new Error("Không tồn tại danh mục này");
    }
  }
});

export {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getAllCategories,
};
