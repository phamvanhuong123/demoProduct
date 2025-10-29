import express from 'express'
import { authController } from '../controllers/authController.js'
import { verifyAccessToken } from '../middleware/authMiddleware.js'

const route = express.Router()

//  Đăng ký tài khoản
route.post('/register', authController.register)

//  Đăng nhập
route.post('/login', authController.login)

//  Lấy thông tin cá nhân (yêu cầu token hợp lệ)
route.get('/profile', verifyAccessToken, authController.getProfile)

export const authRoute = route
