import { Rate } from "antd"
import PropTypes from 'prop-types';

const Rating = ({rating}) => {
  return (
    
    <div className="flex items-center gap-2">
        <Rate allowHalf disabled value={rating} className="text-sm" />
        <span className="text-gray-500 text-sm">{rating}</span>
    </div>
  )
}
Rating.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default Rating
