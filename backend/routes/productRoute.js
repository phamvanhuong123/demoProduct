import express from 'express'
import {productController} from '../controllers/productController.js'
import { verifyAccessToken } from '../middleware/authMiddleware.js'
const route = express.Router()



// Lấy danh sách sản phẩm
route.get('/',productController.getAll)

// Chi tiết sản phẩm
route.get('/:id',productController.getDetail)
route.post('/create',verifyAccessToken,productController.createNew)
route.put('/update/:id',verifyAccessToken, productController.update)
route.delete("/delete/:id",verifyAccessToken,productController.deleteItem)


export const productRoute = route