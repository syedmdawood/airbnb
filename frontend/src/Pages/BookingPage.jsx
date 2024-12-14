import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import axios from "axios"; // Import axios for making API requests

const BookingPage = () => {
  const { id } = useParams();
  const { properties, gToken, calculateDaysBetweenDates, calculateTotalPrice } =
    useContext(AppContext);
  const navigate = useNavigate();

  // Find the selected product from the context
  const product = properties.find((item) => item._id === id);

  // If no product is found, redirect to a 404 page or show an error

  // Form state for booking details
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guestCount, setGuestCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  // Calculate total price based on dates and guest count
  // const calculateTotalPrice = () => {
  //   if (checkInDate && checkOutDate && guestCount > 0) {
  //     const pricePerNight = product.pricePerNight;
  //     const total =
  //       (pricePerNight *
  //         guestCount *
  //         (new Date(checkOutDate) - new Date(checkInDate))) /
  //       (1000 * 3600 * 24); // Calculate total price based on the number of nights
  //     setTotalPrice(total);
  //   }
  // };

  // UseEffect to recalculate total price when input values change
  // useEffect(() => {
  //   calculateTotalPrice();
  // }, [checkInDate, checkOutDate, guestCount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  if (!product) {
    return <div>Product not found</div>; // You could redirect here instead
  }

  return (
    <div className="booking-page px-8 py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Book Your Stay at {product.title}
        </h2>

        <div className="product-summary flex mb-8">
          <img
            src={product.image}
            alt={product.title}
            className="w-48 h-32 object-cover rounded-md mr-6"
          />
          <div className="flex flex-col justify-center">
            <h3 className="text-xl font-medium text-gray-800">
              {product.title}
            </h3>
            <p className="text-gray-600">{product.subMainTitle}</p>
            <p className="text-lg font-bold text-orange-500">
              ${product.pricePerNight} per night
            </p>

            <p>
              Total Days:{" "}
              {calculateDaysBetweenDates(product.checkin, product.checkout)}
            </p>
            <p>
              Total Price:{" "}
              {calculateTotalPrice(
                product.checkin,
                product.checkout,
                product.pricePerNight
              )}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Check-in Date
            </label>
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="form-group mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Check-out Date
            </label>
            <input
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="form-group mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Number of Guests
            </label>
            <input
              type="number"
              value={guestCount}
              min="1"
              onChange={(e) => setGuestCount(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-Button text-white font-semibold rounded-md hover:bg-orange-600 transition"
            // disabled={loading}
          >
            {/* {loading ? "Booking..." : "Confirm Booking"} */}
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
