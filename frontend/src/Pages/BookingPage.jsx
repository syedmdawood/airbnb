import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const BookingPage = () => {
  const { id } = useParams();
  const { data } = useContext(AppContext);
  const navigate = useNavigate();

  // Find the selected product
  const product = data
    .flatMap((category) => category.item)
    .find((item) => item.id === parseInt(id, 10));

  // Form state for booking details
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guestCount, setGuestCount] = useState(1);
  const [errors, setErrors] = useState({
    checkIn: "",
    checkOut: "",
    guestCount: "",
  });
  const [totalPrice, setTotalPrice] = useState(0); // New state for total price

  // Calculate total price based on dates and guest count
  const calculateTotalPrice = () => {
    if (checkInDate && checkOutDate && guestCount > 0) {
      const pricePerNight = product.price;
      const total =
        (pricePerNight *
          guestCount *
          (new Date(checkOutDate) - new Date(checkInDate))) /
        (1000 * 3600 * 24); // Calculate total price based on the number of nights
      setTotalPrice(total);
    }
  };

  // UseEffect to recalculate total price when input values change
  useEffect(() => {
    calculateTotalPrice();
  }, [checkInDate, checkOutDate, guestCount]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    let valid = true;
    const newErrors = { checkIn: "", checkOut: "", guestCount: "" };

    if (!checkInDate) {
      newErrors.checkIn = "Check-in date is required";
      valid = false;
    }

    if (!checkOutDate) {
      newErrors.checkOut = "Check-out date is required";
      valid = false;
    }

    if (new Date(checkOutDate) <= new Date(checkInDate)) {
      newErrors.checkOut = "Check-out date must be after check-in date";
      valid = false;
    }

    if (guestCount <= 0) {
      newErrors.guestCount = "Number of guests must be greater than 0";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      // Show confirmation alert
      const confirmed = window.confirm(
        `Are you sure you want to book this stay for $${totalPrice.toFixed(2)}?`
      );
      if (confirmed) {
        // Booking successful
        alert(`Booking successful! Total price: $${totalPrice.toFixed(2)}`);
        navigate("/"); // Redirect to home page after booking
      }
    }
  };

  if (!product) {
    return <div className="text-center">Product not found</div>;
  }

  return (
    <div className="booking-page px-8 py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Book Your Stay at {product.mainTitle}
        </h2>

        <div className="product-summary flex mb-8">
          <img
            src={product.img1}
            alt={product.mainTitle}
            className="w-48 h-32 object-cover rounded-md mr-6"
          />
          <div className="flex flex-col justify-center">
            <h3 className="text-xl font-medium text-gray-800">
              {product.mainTitle}
            </h3>
            <p className="text-gray-600">{product.subMainTitle}</p>
            <p className="text-lg font-bold text-orange-500">
              ${product.price} per night
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
            {errors.checkIn && (
              <span className="text-red-500 text-sm">{errors.checkIn}</span>
            )}
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
            {errors.checkOut && (
              <span className="text-red-500 text-sm">{errors.checkOut}</span>
            )}
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
            {errors.guestCount && (
              <span className="text-red-500 text-sm">{errors.guestCount}</span>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-Button text-white font-semibold rounded-md hover:bg-orange-600 transition"
          >
            Confirm Booking
          </button>
        </form>

        <div className="booking-summary mt-8">
          <h3 className="text-2xl font-medium text-gray-800">
            Booking Summary
          </h3>
          <p className="text-gray-600">
            Check-in Date: {checkInDate || "Not selected"}
          </p>
          <p className="text-gray-600">
            Check-out Date: {checkOutDate || "Not selected"}
          </p>
          <p className="text-gray-600">Number of Guests: {guestCount}</p>
          {totalPrice !== null && (
            <p className="text-lg font-semibold text-gray-800 mt-4">
              Total Price: ${totalPrice.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
