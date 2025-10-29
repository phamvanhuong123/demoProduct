/**
 * Middleware xác thực Access Token (JWT) + Kiểm tra người dùng tồn tại trong DB
 */

import jwt from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes'
import ApiError from '../utils/ApiError.js'
import { userModel } from '../models/userModel.js'

export const verifyAccessToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Thiếu token xác thực!')
    }

    const token = authHeader.split(' ')[1]

    //  Bước 1: Xác thực token
    const decoded = jwt.verify(token, process.env.JWT_SECRECT)

    //  Bước 2: Kiểm tra người dùng còn tồn tại trong DB
    const user = await userModel.findOneById(decoded.userId)
    if (!user) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Người dùng không tồn tại hoặc đã bị xóa!')
    }

    // Gắn thông tin người dùng vào request
    req.user = { id: user._id, name: user.name, email: user.email }
    
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      next(new ApiError(StatusCodes.UNAUTHORIZED, 'Token đã hết hạn!'))
    } else if (error.name === 'JsonWebTokenError') {
      next(new ApiError(StatusCodes.UNAUTHORIZED, 'Token không hợp lệ!'))
    } else {
      next(
        new ApiError(
          error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
          error.message
        )
      )
    }
  }
}
