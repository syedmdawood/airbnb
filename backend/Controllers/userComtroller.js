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

// const bookProperty = async (req, res) => {
//     try {
//         const { userId, propertyId, checkInDate, checkOutDate, totalPrice, guestCount } = req.body;





//         if (!propertyData.availability) {
//             return res.status(400).json({ success: false, message: "Property is not available" });
//         }

//         let slots_booked = propertyData.slots_booked;

//         // Validate and update slot availability
//         const checkIn = new Date(checkInDate);
//         const checkOut = new Date(checkOutDate);

//         let isAvailable = true;
//         let nextAvailableDate = null;

//         for (let date = checkIn; date < checkOut; date.setDate(date.getDate() + 1)) {
//             const formattedDate = date.toISOString().split("T")[0];
//             if (slots_booked[formattedDate]) {
//                 if (slots_booked[formattedDate] + guestCount > propertyData.maxGuests) {
//                     isAvailable = false;
//                     break;
//                 }
//             }
//         }

//         // If dates are not available, find the next available date
//         if (!isAvailable) {
//             const bookedDates = Object.keys(slots_booked)
//                 .filter(date => slots_booked[date] >= propertyData.maxGuests)
//                 .sort((a, b) => new Date(a) - new Date(b)); // Sort dates in ascending order

//             const lastBookedDate = new Date(bookedDates[bookedDates.length - 1]);
//             nextAvailableDate = new Date(lastBookedDate);
//             nextAvailableDate.setDate(nextAvailableDate.getDate() + 1);

//             return res.status(400).json({
//                 success: false,
//                 message: `Selected dates are unavailable. Next available date is ${nextAvailableDate.toISOString().split("T")[0]}`,
//             });
//         }

//         // Update slots if dates are available
//         for (let date = checkIn; date < checkOut; date.setDate(date.getDate() + 1)) {
//             const formattedDate = date.toISOString().split("T")[0];
//             if (slots_booked[formattedDate]) {
//                 slots_booked[formattedDate] += guestCount;
//             } else {
//                 slots_booked[formattedDate] = guestCount;
//             }
//         }

//         // Fetch user data
//         const userData = await userModel.findById(userId).select("-password");

//         // Create booking data
//         const bookingData = {
//             userId,
//             propertyId,
//             userData,
//             propertyData,
//             checkInDate,
//             checkOutDate,
//             totalPrice,
//             guestCount,
//             date: Date.now(),
//         };

//         // Save booking data
//         const newBooking = new bookingModel(bookingData);
//         await newBooking.save();

//         // Update slots in the property
//         await propertyModel.findByIdAndUpdate(propertyId, { slots_booked });

//         res.status(200).json({ success: true, message: "Booking successful" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };



export { registerUser, loginUser }



