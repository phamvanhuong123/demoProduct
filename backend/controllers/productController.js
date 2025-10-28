import { StatusCodes } from 'http-status-codes'
import { productService } from '../services/productService.js'


const createNew = async (req, res, next) => {
  try {
    const createdProduct = await productService.createNew(req.body)
    res.status(StatusCodes.CREATED).json({
      message: 'Tạo sản phẩm thành công!',
      data: createdProduct
    })
  } catch (error) {
    next(error)
  }
}


const update = async (req, res, next) => {
  try {
    const productId = req.params.id
    const updatedProduct = await productService.update(productId, req.body)

    res.status(StatusCodes.OK).json({
      message: 'Cập nhật sản phẩm thành công!',
      data: updatedProduct
    })
  } catch (error) {
    next(error)
  }
}


const getAll = async (req, res, next) => {
  try {
    const products = await productService.getAll()
    res.status(StatusCodes.OK).json({
      message: 'Danh sách sản phẩm',
      data: products
    })
  } catch (error) {
    next(error)
  }
}


const getDetail = async (req, res, next) => {
  try {
    const productId = req.params.id
    const product = await productService.getDetail(productId)
    res.status(StatusCodes.OK).json({
      message: 'Chi tiết sản phẩm',
      data: product
    })
  } catch (error) {
    next(error)
  }
}


const deleteItem = async (req, res, next) => {
  try {
    const productId = req.params.id
    const result = await productService.deleteItem(productId)

    res.status(StatusCodes.OK).json({
      message: 'Xóa sản phẩm thành công!',
      data: result
    })
  } catch (error) {
    next(error)
  }
}

export const productController = {
  createNew,
  update,
  getAll,
  getDetail,
  deleteItem
}
