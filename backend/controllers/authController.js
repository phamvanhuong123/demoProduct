import { StatusCodes } from "http-status-codes";
import { authService } from "../services/authService.js";

/**
 * Đăng ký người dùng mới
 */
const register = async (req, res, next) => {
  try {
    const createdUser = await authService.register(req.body);
    res.status(StatusCodes.CREATED).json({
      message: "Đăng ký tài khoản thành công!",
      data: createdUser
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Đăng nhập
 */
const login = async (req, res, next) => {
  try {
    const loginResult = await authService.login(req.body);
    res.status(StatusCodes.OK).json({
      message: "Đăng nhập thành công!",
      data: loginResult
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Lấy thông tin cá nhân (Profile)
 */
const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id; // đã được gán từ middleware verifyToken
    const user = await authService.getProfile(userId);
    res.status(StatusCodes.OK).json({
      message: "Thông tin người dùng",
      data: user
    });
  } catch (error) {
    next(error);
  }
};

export const authController = {
  register,
  login,
  getProfile
};
