import express from "express"
import { addProperty, loginAdmin } from "../Controllers/adminController.js"
import upload from "../Middleware/multer.js"
import authAdmin from "../Middleware/authAdmin.js"

const adminRouter = express.Router()


adminRouter.post("/add-property", authAdmin, upload.single('image'), addProperty)
adminRouter.post("/login", loginAdmin)


export default adminRouter