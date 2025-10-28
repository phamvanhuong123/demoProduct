import express from 'express'
import { productRoute } from './productRoute.js'

const router = express.Router()


router.get('/status', (req,res) =>{
    res.json("OK")
})

router.use("/product",productRoute)
// router.use("/auth")
export const APIs_V1 = router