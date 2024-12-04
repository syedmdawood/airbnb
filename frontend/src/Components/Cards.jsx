import { useContext } from "react";
import { FaStar } from "react-icons/fa";
import "../Styles/Cards.css";
import { AppContext } from "../Context/AppContext.jsx";
import { Link } from "react-router-dom";

const Cards = () => {
  const { selectedCategory, properties, formatDate } = useContext(AppContext);

  // Handle loading state if `selectedCategory` is not yet available
  if (!selectedCategory) {
    return <div>Loading...</div>;
  }

  // Filter properties based on the selected category
  const filteredProperties = properties.filter(
    (property) => property.category === selectedCategory.name
  );

  return (
    <div className="cards">
      {filteredProperties.map((property) => (
        <Link
          to={`/product/${property._id}`}
          key={property._id}
          className="inner-card"
        >
          <img src={property.image} alt={property.title} />
          <div className="top">
            <h2>{property.location}</h2>
            <p className="rating">
              <FaStar size={13} style={{ marginRight: "4px" }} />
              {/* You can adjust the rating value here if available */}
              {property.rating}
            </p>
          </div>
          <p className="property">{property.distance} kilometers away</p>
          {/* <p className="property">{new Date(property.date).toDateString()}</p> */}
          <p>{formatDate(property.checkin, property.checkout)}</p>

          <p className="price">${property.pricePerNight} per night</p>
        </Link>
      ))}
    </div>
  );
};

export default Cards;
