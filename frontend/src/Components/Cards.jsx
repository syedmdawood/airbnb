import { useContext } from "react";

import { FaStar } from "react-icons/fa";
import "../Styles/Cards.css";
import { AppContext } from "../Context/AppContext.jsx";
import { Link } from "react-router-dom";

const Cards = () => {
  const { selectedCategory } = useContext(AppContext);

  if (!selectedCategory) {
    return <div>Loading</div>;
  }

  return (
    <div className="cards">
      {selectedCategory.item.map((card) => (
        <Link to={`/product/${card.id}`} key={card.id} className="inner-card">
          <img src={card.img1} alt="" />
          <div className="top">
            <h2>{card.title}</h2>
            <p className="rating">
              <FaStar size={13} style={{ marginRight: "4px" }} />
              {card.rating}
            </p>
          </div>
          <p className="property">{card.distance} kilometeres away</p>
          <p className="property">{card.date}</p>
          <p className="price">${card.price} night</p>
        </Link>
      ))}
    </div>
  );
};

export default Cards;
