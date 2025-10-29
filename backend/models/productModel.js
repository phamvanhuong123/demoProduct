/**
 * Product Model (Phiên bản CRUD rút gọn)
 * Mục đích: Quản lý sản phẩm (Xem – Thêm – Sửa – Xóa)
 */

import Joi from "joi";
import { GET_DB } from "../config/database.js";
import { ObjectId } from "mongodb";

// Tên collection trong MongoDB
const PRODUCT_COLLECTION_NAME = "products";

// Schema validation bằng Joi
const PRODUCT_COLLECTION_SCHEMA = Joi.object({
  name: Joi.string().required().min(3).max(100).trim(),
  description: Joi.string().allow("").max(500).default(""),
  price: Joi.number().required().min(0),
  category: Joi.string().allow("").max(50).default(""),
  createdAt: Joi.date().timestamp("javascript").default(Date.now),
  updatedAt: Joi.date().timestamp("javascript").default(null)
});

// Validate dữ liệu trước khi thêm mới
const validateBeforeCreate = async (data) => {
  return await PRODUCT_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false });
};

// 1. Xem danh sách sản phẩm
const findAll = async (filter = {}) => {
  try {
    const results = await GET_DB()
      .collection(PRODUCT_COLLECTION_NAME)
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();

    return results;
  } catch (error) {
    throw new Error("Không thể lấy danh sách sản phẩm: " + error);
  }
};

// 2) Xem chi tiết
const findOneById = async (id) => {
  try {
    return await GET_DB()
      .collection(PRODUCT_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(String(id)) });
  } catch (error) {
    throw new Error("Không thể lấy chi tiết sản phẩm: " + error);
  }
};
// 3. Thêm sản phẩm mới
const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data);
    const insertResult = await GET_DB()
      .collection(PRODUCT_COLLECTION_NAME)
      .insertOne(validData);

    return insertResult;
  } catch (error) {
    throw new Error("Không thể thêm sản phẩm: " + error);
  }
};

// 4. Cập nhật sản phẩm
const update = async (id, updateData) => {
  try {
    updateData.updatedAt = Date.now();

    const result = await GET_DB()
      .collection(PRODUCT_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(String(id)) },
        { $set: updateData },
        { returnDocument: "after" }
      );

    return result;
  } catch (error) {
    throw new Error("Không thể cập nhật sản phẩm: " + error);
  }
};

// 5. Xóa sản phẩm
const deleteOneById = async (id) => {
  try {
    const result = await GET_DB()
      .collection(PRODUCT_COLLECTION_NAME)
      .deleteOne({ _id: new ObjectId(String(id)) });

    return result;
  } catch (error) {
    throw new Error("Không thể xóa sản phẩm: " + error);
  }
};

export const productModel = {
  PRODUCT_COLLECTION_NAME,
  PRODUCT_COLLECTION_SCHEMA,
  findAll,
  createNew,
  update,
  deleteOneById,
  findOneById
};
