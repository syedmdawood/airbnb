
import { v2 as cloudinary } from "cloudinary"
import propertyModel from "../Models/propertyModel.js"
import jwt from "jsonwebtoken"

// Api for adding property from admin
const addProperty = async (req, res) => {
    try {

        const { title, description, location, pricePerNight, amenities, category, maxGuests, distance, date } = req.body
        const imageFile = req.file

        // checking for all data to ad doctor
        if (!title || !description || !location || !pricePerNight || !maxGuests || !category || !amenities || !distance || !date) {
            return res.status(400).json({ success: false, message: "Missing Details" });
        }

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url

        const propertyData = {
            title,
            description,
            location,
            pricePerNight,
            amenities,
            category,
            distance,
            date,
            maxGuests,
            image: imageUrl,
            date: Date.now(),
        }

        const newProperty = new propertyModel(propertyData)
        await newProperty.save()

        res.status(200).json({ success: true, message: "Property Added" })


    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })

    }
}


// Api for admin logn
const loginAdmin = async (req, res) => {
    try {

        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            return res.status(401).json({ success: false, message: "Invalid Credentials" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
    }
}


export { addProperty, loginAdmin }