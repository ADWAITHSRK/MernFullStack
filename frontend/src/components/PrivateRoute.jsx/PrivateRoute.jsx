import { Navigate} from "react-router-dom";
import { useGetProfileQuery } from "../../redux/featurtes/userApiSlice.js";
import PropTypes from 'prop-types';

const PrivateRoute = ({children}) => {
  const { data: profile, isLoading } = useGetProfileQuery();
  console.log("prtctd",profile.user);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if ( !profile.user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;