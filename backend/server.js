import express from 'express'
import {CONNECT_DB,CLOSED_DB} from './config/database.js'
import cors from 'cors'
import exitHook from 'async-exit-hook'
import { APIs_V1 } from './routes/index.js'
import { errorHandlingMiddleware } from './middleware/errorHandlingMiddleware.js'

const START_SERVER = () => {
  const app = express()
  // xu li cors
  app.use(cors())
  const port = 8071
  // enable req.body json data
  app.use(express.json())

  //use api/v1
  app.use('/v1', APIs_V1)
  // middleware xử lí lỗi tập trung
  app.use(errorHandlingMiddleware)

  app.listen(port, () => {
    console.log(`Listen port :http://localhost:${port}`)
})

  // Thực hiện các tác vụ cleanup trước khi dừng server
  exitHook(() => {
    console.log('closed disconnected mongoDB alast')
    CLOSED_DB()
  })
}

(async() => {
  try {
    await CONNECT_DB()
    console.log('Connected mongoDB database')
    START_SERVER()
  }
  catch (error) {
    console.error(error)
    process.exit(0)
  }
})()