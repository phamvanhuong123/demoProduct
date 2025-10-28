import express from 'express'
import {productController} from '../controllers/productController.js'
const route = express.Router()



// Lấy danh sách sản phẩm
route.get('/',productController.getAll)

// Chi tiết sản phẩm
route.get('/:id',productController.getDetail)
route.post('/create',productController.createNew)
route.put('/update/:id', productController.update)
route.delete("/delete/:id",productController.deleteItem)


export const productRoute = route