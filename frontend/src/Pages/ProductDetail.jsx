import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaHeart, FaShare } from "react-icons/fa";
import { AppContext } from "../Context/AppContext";
import "../Styles/ProductDetail.css";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // React Router's navigation hook
  const { properties, formatDate } = useContext(AppContext);

  const product = properties.find((item) => item._id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleBooking = () => {
    const gToken = localStorage.getItem("gToken");
    const hToken = localStorage.getItem("hToken");

    if (!gToken && !hToken) {
      // Redirect to login if no tokens are found
      toast.warn("Login to book a property");
      return navigate("/login");
    } else {
      // Redirect to booking page if tokens exist
      navigate(`/book/${product._id}`);
    }
  };

  return (
    <div className="product-detail px-16">
      <div className="flex justify-between items-center py-6">
        <span className="text-3xl font-medium">{product.title}</span>
        <div className="flex items-center justify-between">
          <p className="flex items-center justify-between w-16 mx-6">
            <FaShare />
            Share
          </p>
          <p className="flex items-center justify-between w-14">
            <FaHeart />
            Save
          </p>
        </div>
      </div>

      <div className="flex justify-between border rounded-[10px] gap-2 h-[50vh] mb-6">
        <img
          src={product.image}
          alt={product.title}
          className="w-[650px] h-[100%]"
        />
        <div className="flex flex-col justify-center sm:hidden md:block lg:block w-[600px] mx-10 pt-10 text-justify items-center">
          <p>{product.description}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pb-10">
        <div>
          <span className="text-2xl font-medium">
            ${product.pricePerNight} per night
          </span>
          <p>{product.distance} kilometers away</p>
          <p>{formatDate(product.checkin, product.checkout)}</p>
          <p>{product.amenities}</p>
        </div>
        <button
          onClick={handleBooking}
          className="border bg-Button text-white px-6 py-3 rounded-xl"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
