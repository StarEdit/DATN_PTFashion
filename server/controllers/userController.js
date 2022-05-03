import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateAuthToken from "../utils/generateToken.js";
import sendEmail from "../utils/sendEmail.js";
import generator from "generate-password";

// @desc   AUTH và lấy token
// @route  POST /api/user/login
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

// @desc   Đăng xuất
// @route  POST /api/logout
// @access Public
const logout = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Đăng xuất thành công",
    token: "",
  });
});

// @desc   Đăng ký
// @route  POST /api/user
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
      email: req.body.email,
      isAdmin: req.body.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Đăng ký không thành công");
  }
});

// @desc   Xem thông tin người dùng
// @route  GET /api/user/info
// @access Protect
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

// @desc   Xem thông tin người dùng
// @route  GET /api/user/profile
// @access Protect/Admin
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.find().sort({ name: "asc" });

  res.json({ user });
});

// @desc   Cập nhật thông tin người dùng
// @route  PUT /api/user/info
// @access Protect
const updateUserInfo = asyncHandler(async (req, res) => {
  const { full_name, email, phone, address } = req.body;
  const user = await User.findById(req.user._id);
  if (user) {
    user.full_name = full_name || user.full_name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.address = address || user.address;
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

// @desc   Xóa người dùng
// @route  DELETE /api/user/:id
// @access Protect/Admin
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

// @desc   xem người dùng bằng ID
// @route  GET /api/user/:id
// @access Protect/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("Người dùng không tồn tại");
  }
});

// @desc   Quên mật khẩu
// @route  POST /api/user/forgot-password
// @access Protect
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
      html: `Mật khẩu mới của bạn là ${password}. <a href="${loginURl}>Đăng nhập lại</a>`,
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

// @desc   Cập nhật mật khẩu
// @route  POST /api/user/change-password
// @access Protect
const updatePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const user = await User.findById(req.user._id);
  const isPasswordMatched = await user.matchPassword(oldPassword);

  if (!isPasswordMatched) {
    res.status(400);
    throw new Error("Mật khẩu cũ không chính xác");
  }
  if (newPassword !== confirmPassword) {
    res.status(400);
    throw new Error("Mật khẩu không đúng! Vui lòng nhập lại");
  }

  user.password = newPassword;
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
  updateUserInfo,
  deleteUser,
  getUserById,
  forgotPassword,
  updatePassword,
};
