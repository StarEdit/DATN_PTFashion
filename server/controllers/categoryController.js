import asyncHandler from "express-async-handler";
import Category from "./../models/categoryModel.js";
import Product from "./../models/productModel.js";

// @desc  Create a category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = asyncHandler(async (req, res) => {
  const category = new Category({
    key: req.body.key,
    category_name: req.body.category_name,
  });

  await category.save();

  res.status(201).json({
    message: "Tạo danh mục thành công",
  });
});

// @desc   Get all category
// @route  GET /api/categories
// @access public
const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ key: "asc" });

  res.json({ categories });
});

// @desc   Get all category by params
// @route  GET /api/categories
// @access Private/Admin
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.json({ categories });
});

// @desc   search  category
// @route  GET /api/categories/search
// @access Private/Admin
const searchCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({ name: req.query.name });

  res.json({ categories });
});

// @desc   get category by Id
// @route  GET /api/categories/:id
// @access private/admin
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    res.json(category);
  } else {
    res.status(404);
    throw new Error("Không tồn tại danh mục");
  }
});

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin
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

// @desc    sort Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  const product = await Product.find({ categoryId: req.params.id });
  if (product.length !== 0) {
    res.status(406);
    res.json({
      message: "không thể xóa danh mục này",
    });
  } else {
    if (category) {
      await Category.delete({ _id: req.params.id });
      res.json({ message: "Xóa danh mục thành công" });
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
  searchCategories,
};
