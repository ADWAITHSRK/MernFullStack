import {Navigate } from 'react-router-dom'
import { useGetProfileQuery } from "../../../redux/featurtes/userApiSlice.js";
import PropTypes from 'prop-types';

const AdminRoute = ({children}) => {
      const { data: profile } = useGetProfileQuery();
    

      if (!profile || !profile.user) {
        return <Navigate to="/login" replace />;
      }
      return children
 
}
AdminRoute.propTypes = {
  children: PropTypes.node
};

export default AdminRoute;