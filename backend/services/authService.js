/**
 * Auth Service
 * Cung cấp nghiệp vụ đăng ký, đăng nhập và lấy thông tin người dùng.
 */

import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel.js";
import ApiError from "../utils/ApiError.js";

/**
 * 1️ Đăng ký tài khoản mới
 */
const register = async (reqBody) => {
  try {
    const { name, email, password } = reqBody;

    // Kiểm tra trùng email
    const existedUser = await userModel.findOneByEmail(email);
    if (existedUser) {
      throw new ApiError(StatusCodes.CONFLICT, "Email đã tồn tại trong hệ thống");
    }

    // Tạo người dùng mới
    const createdUser = await userModel.createNew({ name, email, password });
    const newUser = await userModel.findOneById(createdUser.insertedId);

    return newUser;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

/**
 * 2️ Đăng nhập
 */
const login = async (reqBody) => {
  try {
    const { email, password } = reqBody;

    const user = await userModel.findOneByEmail(email);
    if (!user) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, "Email hoặc mật khẩu không đúng!");
    }

    // So sánh mật khẩu (plain text)
    const isValid = userModel.comparePassword(password, user.password);
    if (!isValid) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, "Email hoặc mật khẩu không đúng!");
    }

    // Tạo JWT token
    const accessToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRECT,
      { expiresIn: "1h" }
    );

    // Trả về thông tin user + token
    return {
      user: { id: user._id, name: user.name, email: user.email },
      accessToken
    };
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

/**
 * 3️ Lấy thông tin người dùng (profile)
 */
const getProfile = async (userId) => {
  try {
    const user = await userModel.findOneById(userId);
    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Không tìm thấy người dùng!");
    }

    // Ẩn mật khẩu trước khi trả về
    delete user.password;
    return user;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

export const authService = {
  register,
  login,
  getProfile
};
