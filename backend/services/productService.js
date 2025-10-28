/**
 * Product Service
 * Cung cấp các nghiệp vụ CRUD: xem danh sách, thêm mới, cập nhật, xóa sản phẩm.
 */

import { StatusCodes } from "http-status-codes";
import { productModel } from "../models/productModel.js";
import ApiError from "../utils/ApiError.js";


const createNew = async (reqBody) => {
  try {
    const newProduct = { ...reqBody };
    const createdProduct = await productModel.createNew(newProduct);
    const getNewProduct = await productModel.findOneById(createdProduct.insertedId);

    return getNewProduct;
  } catch (error) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};


const update = async (id, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now(),
    };

    const updatedProduct = await productModel.update(id, updateData);
    return updatedProduct;
  } catch (error) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};


const getAll = async () => {
  try {
    const products = await productModel.findAll();
    return products;
  } catch (error) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Không thể lấy danh sách sản phẩm");
  }
};


const getDetail = async (id) => {
  try {
    const product = await productModel.findOneById(id);
    if (!product) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Không tìm thấy sản phẩm!");
    }
    return product;
  } catch (error) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};


const deleteItem = async (id) => {
  try {
    const targetProduct = await productModel.findOneById(id);
    if (!targetProduct) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Sản phẩm không tồn tại!");
    }

    const result = await productModel.deleteOneById(id);
    return result;
  } catch (error) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

export const productService = {
  getAll,
  getDetail,
  createNew,
  update,
  deleteItem,
};
