import express from 'express'
import { productRoute } from './productRoute.js'
import { authRoute } from './authRoute.js'

const router = express.Router()


router.get('/status', (req,res) =>{
    res.json("OK")
})

router.use("/product",productRoute)
router.use("/auth",authRoute)
export const APIs_V1 = router