import { Navigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom';
import { useGetProfileQuery } from "../../redux/featurtes/userApiSlice.js";

const AdminRoute = () => {
  const { data: profile, isLoading, isError } = useGetProfileQuery();
  console.log(profile)
  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  // Handle error or non-admin user
  if (isError || !profile?.user?.isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet/>;
}

export default AdminRoute;