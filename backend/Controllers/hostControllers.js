
import { v2 as cloudinary } from "cloudinary"
import propertyModel from "../Models/propertyModel.js"
import jwt from "jsonwebtoken"
import validator from "validator"

const addProperty = async (req, res) => {
    try {
        const { title, description, location, pricePerNight, amenities, category, maxGuests, distance, checkin, checkout } = req.body;
        const imageFile = req.file;

        // Check for all required fields
        if (!title || !description || !location || !pricePerNight || !maxGuests || !category || !amenities || !distance || !checkin || !checkout) {
            return res.status(400).json({ success: false, message: "Missing Details" });
        }

        // Upload image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        // Get the userId from req.user
        const userId = req.user.userId;

        // Create the property data
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
            userId, // Attach userId here
        };

        // Save the property
        const newProperty = new propertyModel(propertyData);
        await newProperty.save();

        res.status(200).json({ success: true, message: "Property Added" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


const allProperties = async (req, res) => {
    try {
        const { userId } = req.user; // Assuming req.user contains the authenticated user's information

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is missing" });
        }

        // Find properties with the same userId
        const propertyList = await propertyModel.find({ userId });

        res.status(200).json({ success: true, propertyList });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};



const availabilityChangeByHost = async (req, res) => {
    try {
        const { userId } = req.user; // Assuming req.user contains the authenticated user's information
        const { propertyId } = req.body;

        if (!userId || !propertyId) {
            return res.status(400).json({ success: false, message: "User ID or Property ID is missing" });
        }

        // Find the property by ID and check ownership
        const propertyData = await propertyModel.findOne({ _id: propertyId, userId });

        if (!propertyData) {
            return res.status(404).json({ success: false, message: "Property not found or not owned by user" });
        }

        // Update the availability of the property
        propertyData.availability = !propertyData.availability;
        await propertyData.save();

        res.json({ success: true, message: "Availability changed" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


const deleteProperty = async (req, res) => {
    try {
        const { userId } = req.user;
        const { propertyId } = req.body;

        if (!propertyId) {
            return res.status(400).json({ success: false, message: "Property ID is required" });
        }


        const property = await propertyModel.findOne({ _id: propertyId, userId });
        if (!property) {
            return res.status(404).json({ success: false, message: "Property not found or unauthorized" });
        }
        await propertyModel.findByIdAndDelete(propertyId);

        res.status(200).json({ success: true, message: "Property deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};



export { addProperty, allProperties, availabilityChangeByHost, deleteProperty }