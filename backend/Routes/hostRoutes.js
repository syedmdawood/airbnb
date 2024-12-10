import express from "express"
import authHost from "../Middleware/authHost.js"
import upload from "../Middleware/multer.js"
import { addProperty, allProperties, availabilityChangeByHost, deleteProperty, } from "../Controllers/hostControllers.js"

const hostRouter = express.Router()

hostRouter.post("/add-property", authHost, upload.single('image'), addProperty)
hostRouter.get("/property-list", authHost, allProperties)
hostRouter.post("/change-availability", authHost, availabilityChangeByHost)
hostRouter.post("/delete-property", authHost, deleteProperty)


export default hostRouter