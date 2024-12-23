
import { v2 as cloudinary } from "cloudinary"
import propertyModel from "../Models/propertyModel.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"

// Api for adding property from admin
const addProperty = async (req, res) => {
    try {
        const { title, description, location, pricePerNight, amenities, category, maxGuests, distance, checkin, checkout } = req.body
        const imageFile = req.file

        // checking for all data to add property
        if (!title || !description || !location || !pricePerNight || !maxGuests || !category || !amenities || !distance || !checkin || !checkout) {
            return res.status(400).json({ success: false, message: "Missing Details" });
        }

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url

        // Check if the user is an admin or a regular user
        let userId = req.user ? req.user._id : new mongoose.Types.ObjectId("60c72b2f9e1d4f23d4d3c1f3"); // Replace with a valid ObjectId for admin


        const propertyData = {
            title,
            description,
            location,
            pricePerNight,
            amenities,
            category,
            distance,
            checkin,
            checkout,
            maxGuests,
            image: imageUrl,
            userId: userId // Assigning userId from request or hardcoding for admin
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

// Api to get all property list for admin panel
const allProperties = async (req, res) => {
    try {
        const propertyList = await propertyModel.find({})
        res.status(200).json({ success: true, propertyList })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
    }
}
const deleteProperty = async (req, res) => {
    try {

        const { propertyId } = req.body

        if (!propertyId) {
            return res.status(400).json({ success: false, message: "Property ID is required" })
        }

        const deleteProperty = await propertyModel.findByIdAndDelete(propertyId)

        if (!deleteProperty) {
            return res.status(404).json({ success: false, message: "Property not found" })
        }

        res.status(200).json({ success: true, message: "Property deleted successfully" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
    }
}


export { addProperty, loginAdmin, allProperties, deleteProperty }