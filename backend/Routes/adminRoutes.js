import express from "express"
import { addProperty, allProperties, deleteProperty, loginAdmin } from "../Controllers/adminController.js"
import upload from "../Middleware/multer.js"
import authAdmin from "../Middleware/authAdmin.js"
import { changeAvailability } from "../Controllers/propertyControler.js"

const adminRouter = express.Router()


adminRouter.post("/add-property", authAdmin, upload.single('image'), addProperty)
adminRouter.post("/login", loginAdmin)
adminRouter.post("/all-properties", authAdmin, allProperties)
adminRouter.post("/change-availability", authAdmin, changeAvailability)
adminRouter.post("/delete-property", authAdmin, deleteProperty)


export default adminRouter