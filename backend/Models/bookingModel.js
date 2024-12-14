import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    propertyId: { type: String, required: true },
    userData: { type: String, required: true },
    propertyData: { type: String, required: true },
    date: { type: Number, required: true },
    cancelled: { type: Boolean, required: true },
    isCompleted: { type: Boolean, required: true },
    checkinDate: { type: Number, required: true },
    checkoutDate: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    guestCount: { type: Number, required: true },
})


const bookingModel = mongoose.models.booking || mongoose.model("booking", bookingSchema)
export default bookingModel 