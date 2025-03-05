import { FaRupeeSign } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./ProductCard.css";
import PropTypes from "prop-types";
import Rating from "../Rating/Rating";
const ProductCard = ({ product }) => {
  const { image, name, price, rating, _id } = product;
  return (
    <div className="max-w-xs rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
      <Link to={`/product/${_id}`}>
        <img src = {`http://localhost:7000/${image}`} alt={name} className="w-full h-48 object-cover" />
      </Link>
      <div className="p-4">
        <Link to={`/product/${_id}`}>
          {" "}
          <h3 className="font-semibold text-lg mb-2">{name}</h3>
        </Link>

        <div className="flex  items-center mb-2">
          <span>
            {" "}
            <FaRupeeSign className="mr-2" />
          </span>
          <span className="text-xl font-bold text-black">{price}</span>
        </div>
        <Rating rating={rating} />
      </div>
    </div>
  );
};
ProductCard.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductCard;
