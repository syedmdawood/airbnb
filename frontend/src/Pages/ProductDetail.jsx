import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { FaHeart, FaShare } from "react-icons/fa";
import "../Styles/ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const { data } = useContext(AppContext);

  // Find the specific product by its ID
  const product = data
    .flatMap((category) => category.item)
    .find((item) => item.id === parseInt(id, 10));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-detail px-16 ">
      <div className="flex justify-between items-center py-6">
        <span className="text-3xl font-medium">{product.mainTitle}</span>
        <div className="flex items-center justify-between">
          <p className="flex items-center justify-between w-16 mx-6 ">
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
        <img src={product.img1} alt="" className="w-[650px] h-[100%]" />
        <div className="flex flex-col justify-center">
          <img src={product.img2} alt="" className="w-72 h-[49%] mb-2" />
          <img src={product.img3} alt="" className="w-72 h-[49%]" />
        </div>
        <div className="flex flex-col ">
          <img src={product.img4} alt="" className="w-72 h-[49%] mb-2" />
          <img src={product.img5} alt="" className="w-72 h-[49%]" />
        </div>
      </div>

      <div className="flex items-center justify-between pb-10">
        <div>
          <span className="text-2xl font-medium">{product.subMainTitle}</span>
          <p>
            {product.noOfGuest} guests . {product.noOfbedrooms} bedrooms .{" "}
            {product.noOfBathroom} bath
          </p>
        </div>
        <Link to={`/book/${product.id}`}>
          <button className="border bg-Button text-white px-6 py-3 rounded-xl">
            Book Now
          </button>
        </Link>
      </div>

      {product.bedRoomImg1 || product.bedRoomImg2 ? (
        <div className="flex flex-col mb-10">
          <p className="text-2xl font-medium mb-5">Where you’ll sleep</p>
          <div className="flex gap-5">
            <div>
              <img
                src={product.bedRoomImg1}
                alt=""
                className="w-[320px] h-[230px] rounded-[10px] mb-3"
              />
              <p className="font-medium">Bedroom 1</p>
              <p className="text-sm">1 double bed</p>
            </div>
            {product.bedRoomImg2 ? (
              <div>
                <img
                  src={product.bedRoomImg2}
                  alt=""
                  className="w-[320px] h-[230px] rounded-[10px] mb-3"
                />
                <p className="font-medium">Bedroom 2</p>
                <p className="text-sm">1 double bed</p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProductDetail;
