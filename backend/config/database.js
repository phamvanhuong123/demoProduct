import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from './environment.js'

// Khởi tạo đối tượng trelloDatabaseInstance ban đầu là null (vì chưa connect)
let productDatabaseInstance = null


// Khởi tạo một đối tượng Client Instance để connect tới mongoDB
const clientInstance = new MongoClient(env.MONGODB_URL, {
  serverApi : {
    version : ServerApiVersion.v1,
    strict : true,
    deprecationErrors : true
  }
})

export const CONNECT_DB = async () => {
  await clientInstance.connect()
  // Kết nối thành công thì lấy database theo tên và gán ngược lại trelloDatabaseInstance
  productDatabaseInstance = clientInstance.db(env.DATABASE_NAME)
  console.log(productDatabaseInstance.databaseName)
}

// function này có nhiệm vụ là export ra cái Product Database sau khi đã connect thành công tới mongoDB để chúng ta sử dụng nhiều nơi khác nhau trong code.
// Lưu ý phải đảm bảo chỉ luôn được gọi hàm GET_DB khi đã kết nối database thành công.
export const GET_DB = () => {
  if (!productDatabaseInstance) throw new Error('Must connect to Database first')
  return productDatabaseInstance
}
export const CLOSED_DB = async() => {
  await clientInstance.close()
}