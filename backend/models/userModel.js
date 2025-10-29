import Joi from "joi";
import { GET_DB } from "../config/database.js";
import { ObjectId } from "mongodb";

// Tên collection trong MongoDB
const USER_COLLECTION_NAME = "users";

// Schema validation bằng Joi
const USER_COLLECTION_SCHEMA = Joi.object({
  name: Joi.string().required().min(2).max(50).trim(),
  email: Joi.string().email().required().trim(),
  password: Joi.string().required().min(4).max(50),
  createdAt: Joi.date().timestamp("javascript").default(Date.now),
  updatedAt: Joi.date().timestamp("javascript").default(null)
});

// Validate dữ liệu trước khi thêm mới
const validateBeforeCreate = async (data) => {
  try {
    return await USER_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false });
  } catch (error) {
    throw new Error("Dữ liệu người dùng không hợp lệ: " + error.message);
  }
};

/**
 * 1️ Tạo người dùng mới (Đăng ký)
 */
const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data);

    const existed = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .findOne({ email: validData.email });

    if (existed) throw new Error("Email đã tồn tại trong hệ thống");

    const insertResult = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .insertOne(validData);

    if (!insertResult.insertedId) throw new Error("Không thể tạo người dùng mới");

    return insertResult;
  } catch (error) {
    throw new Error("Không thể đăng ký người dùng: " + error.message);
  }
};

/**
 * 2️ Tìm người dùng theo email
 */
const findOneByEmail = async (email) => {
  try {
    const user = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .findOne({ email });

    return user;
  } catch (error) {
    throw new Error("Không thể tìm người dùng theo email: " + error.message);
  }
};

/**
 * 3️ Tìm người dùng theo ID
 */
const findOneById = async (id) => {
  
  try {
    const user = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(String(id)) });

    if (!user) throw new Error("Không tìm thấy người dùng");
    return user;
  } catch (error) {
    throw new Error("Không thể lấy thông tin người dùng: " + error.message);
  }
};

/**
 * 4️ So sánh mật khẩu 
 */
const comparePassword = (plain, stored) => {
  try {
    return plain === stored;
  } catch (error) {
    throw new Error("Không thể so sánh mật khẩu: " + error.message);
  }
};

export const userModel = {
  USER_COLLECTION_NAME,
  USER_COLLECTION_SCHEMA,
  createNew,
  findOneByEmail,
  findOneById,
  comparePassword
};
