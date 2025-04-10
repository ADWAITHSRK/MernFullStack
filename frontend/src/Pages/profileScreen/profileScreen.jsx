import {
  useGetProfileQuery,
  useLogoutMutation,
} from "../../redux/featurtes/userApiSlice";
import { Card, Avatar, Tag, Button } from "antd";
import { UserOutlined, CrownOutlined, SmileOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import OrderPage from "../OrderPage/OrderPage";

const ProfileScreen = () => {
  const { data: profile } = useGetProfileQuery();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout().unwrap();
    navigate("/");
    
    toast.error("Logged Out successful!", {
      position: "top-center",
    });
  };

  return (
    <div className="w-full min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl  mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Card */} 
        <div className=" h-[60vh] flex justify-center">
          <Card className="w-full max-w-md shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="text-center py-4">
              <Avatar
                size={120}
                src={profile?.user?.profilePicture || undefined}
                icon={!profile?.user?.profilePicture && <UserOutlined />}
                className="mb-6 border-4 border-blue-100"
              />
              <h1 className="text-3xl font-bold mb-2 text-gray-800">{profile?.user?.name}</h1>
              <p className="text-gray-600 text-lg mb-4">{profile?.user?.email}</p>
              {profile?.isAdmin ? (
                <Tag icon={<CrownOutlined />} color="gold" className="mb-6 px-4 py-1 text-base">
                  Admin User
                </Tag>
              ) : (
                <Tag icon={<SmileOutlined />} color="blue" className="mb-6 px-4 py-1 text-base">
                  Regular User
                </Tag>
              )}
              <Button 
                type="primary" 
                danger 
                onClick={handleLogout}
                size="large"
                className="font-medium px-6 hover:opacity-90"
              >
                Log Out
              </Button>
            </div>
          </Card>
        </div>

        {/* Orders Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 h-[60vh]">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">Your Orders</h2>
          <OrderPage />
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;