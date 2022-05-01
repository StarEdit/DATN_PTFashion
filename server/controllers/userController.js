import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateAuthToken from "../utils/generateToken.js";
import sendEmail from "../utils/sendEmail.js";
import generator from "generate-password";

// @desc   Auth user & get token
// @route  POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.full_name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateAuthToken(user._id),
      message: "Đăng nhập thành công!",
    });
  } else {
    res.status(401);
    throw new Error("Email hoặc mật khẩu không chính xác");
  }
});

// @desc   logout
// @route  POST /api/logout
// @access Public
const logout = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Đăng xuất thành công",
    token: "",
  });
});

// @desc   Register a new user
// @route  POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, isAdmin, password } = req.body;
  const user = User.create({
    ...req.body,
    isWork: true,
    isAdmin: isAdmin || false,
  });

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("Email đã tồn tại");
  }

  if (user) {
    const loginURL = `http://localhost:3000`;
    await sendEmail({
      email: email,
      subject: `Bạn vừa đăng ký tài khoản`,
      message: `Thông tin tài khoản của bạn:`,
      html: `<h5>email: ${email}</h5> <h5>password: ${password}</h5> <a href=${loginURL}>Đăng nhập ngay</a>`,
    });
    res.status(201).json({
      _id: req.body._id,
      full_name: req.body.full_name,
      phone: req.body.phone,
      address: req.body.address,
      email: req.body.email,
      isAdmin: req.body.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Đăng ký không thành công");
  }
});

// @desc   Get user info
// @route  GET /api/userInfo
// @access public
const getUserInfo = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      user: {
        full_name: user.full_name,
        address: user.address,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin,
      },
    });
  } else {
    res.status(404);
    throw new Error("Không tìm thấy người dùng");
  }
});

// @desc   Get user profile
// @route  GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      full_name: user.full_name,
      email: user.email,
      password: user.password,
      address: user.address,
      phone: user.phone,
    });
  } else {
    res.status(404);
    throw new Error("Không tìm thấy người dùng");
  }
});

// @desc   Update user profile
// @route  PUT /api/user/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.full_name = req.body.full_name || user.full_name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;
    user.password = user.password;
    user.isWork = user.isWork;
    user.isAdmin = user.isAdmin;

    await user.save();

    res.json({
      message: "Cập nhật thành công!",
    });
  } else {
    res.status(404);
    throw new Error("Không tìm thấy người dùng");
  }
});

// @desc   Delete user
// @route  DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.isAdmin) {
      res.status(405);
      throw new Error("Bạn không có quyền xóa các tài khoản admin khác");
    } else {
      await User.delete({ _id: req.params.id });
      res.json({ message: "Xóa người dùng thành công" });
    }
  } else {
    res.status(404);
    throw new Error("Người dùng không tồn tại");
  }
});

// @desc   Get user by ID
// @route  GET /api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("Người dùng không tồn tại");
  }
});

// forgot password
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    const password = generator.generate({
      length: 10,
      numbers: true,
    });
    user.password = password;
    await user.save();

    const loginURl = `http://localhost:3000/login`;
    await sendEmail({
      email: email,
      subject: `Lấy lại mật khẩu`,
      html: `Mật khẩu mới của bạn là ${password}. <a href="http://localhost:3000">Đăng nhập lại</a>`,
    });

    res.status(200).json({
      success: true,
      message: `Mật khẩu đã được gửi tới Email:${user.email}! Vui lòng kiểm tra email của bạn`,
    });
  } else {
    res.status(401);
    throw new Error("Tài khoản không tồn tại");
  }
});

//update password
const updatePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const isPasswordMatched = await user.matchPassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    res.status(400);
    throw new Error("Mật khẩu cũ không chính xác");
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    res.status(400);
    throw new Error("Mật khẩu không đúng! Vui lòng nhập lại");
  }

  user.password = req.body.newPassword;
  await user.save();
  res.status(200).json({
    success: true,
    message: `Cập nhật mật khẩu thành công`,
  });
});

export {
  authUser,
  logout,
  registerUser,
  getUserInfo,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getUserById,
  forgotPassword,
  updatePassword,
};
