import validator from "validator"
import bcrypt from "bcrypt"
import userModel from "../Models/userModel.js"
import jwt from "jsonwebtoken"
import propertyModel from "../Models/propertyModel.js";
import bookingModel from "../Models/bookingModel.js";

// Api for register user
const registerUser = async (req, res) => {
    try {
        const { name, email, role, password } = req.body;

        // Validate required fields
        if (!name || !email || !role || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Enter a valid email" });
        }

        // Fix password length check (should be at least 8 characters)
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
        }

        // Check for existing user
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email is already registered" });
        }

        // Hash password and save user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = { name, email, role, password: hashedPassword };
        const newUser = new userModel(userData);
        const user = await newUser.save();

        // Generate token
        let token;
        if (role === "host") {
            token = jwt.sign({ id: user._id, role: "host" }, process.env.JWT_SECRET_HOST);
        } else if (role === "guest") {
            token = jwt.sign({ id: user._id, role: "guest" }, process.env.JWT_SECRET_GUEST);
        } else {
            return res.status(400).json({ success: false, message: "Invalid role" });
        }

        res.status(200).json({ success: true, token, message: "User registered successfully" });

    } catch (error) {
        console.error("Error in registerUser:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};


const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Credentials" })
        }

        let token;
        if (user.role === 'host') {
            token = jwt.sign({ id: user._id, role: 'host' }, process.env.JWT_SECRET_HOST)
        } else if (user.role === 'guest') {
            token = jwt.sign({ id: user._id, role: 'guest' }, process.env.JWT_SECRET_GUEST)
        } else {
            return res.status(400).json({ success: false, message: "Invalid role" });
        }

        res.status(200).json({ success: true, token, user })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
    }
}


const bookProperty = async (req, res) => {
    try {
        const { propertyId, checkin, checkout, guest, totalPrice } = req.body;

        // Use the userId from the token
        const userId = req.user.userId;

        if (!propertyId || !userId || !checkin || !checkout || !guest || !totalPrice) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const checkinDate = new Date(checkin);
        const checkoutDate = new Date(checkout);

        if (checkinDate >= checkoutDate) {
            return res.status(400).json({ message: "Check-in date must be before check-out date." });
        }

        const property = await propertyModel.findById(propertyId);
        if (!property) {
            return res.status(404).json({ message: "Property not found." });
        }

        const slotsBooked = property.slots_booked || {};
        for (const date in slotsBooked) {
            const bookedCheckin = new Date(slotsBooked[date].checkin);
            const bookedCheckout = new Date(slotsBooked[date].checkout);
            if (checkinDate < bookedCheckout && checkoutDate > bookedCheckin) {
                return res.status(400).json({ success: false, message: "Property is already booked for the dates" });
            }
        }

        const booking = new bookingModel({
            propertyId,
            userId,
            checkin: checkinDate,
            checkout: checkoutDate,
            guest,
            totalPrice,
            date: Date.now(),
        });

        await booking.save();

        const newSlot = { checkin: checkinDate, checkout: checkoutDate, userId };
        const slotKey = `${checkinDate.toISOString()}-${checkoutDate.toISOString()}`;
        property.slots_booked[slotKey] = newSlot;

        await property.save();

        return res.status(200).json({ success: true, message: "Property Booked Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};



export { registerUser, loginUser, bookProperty }



