import {
  useGetProfileQuery,
  useLogoutMutation,
} from "../../redux/featurtes/userApiSlice";
import { Card, Avatar, Tag, Button } from "antd";
import { UserOutlined, CrownOutlined, SmileOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProfileScreen = () => {
  const { data: profile } = useGetProfileQuery();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  console.log(profile);

  const handleLogout = () => {
     logout().unwrap();
    navigate("/");

    toast.error("Logged Out successful!", {
      position: "top-center",
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <Card className="w-full max-w-md shadow-lg">
        <div className="text-center">
          <Avatar
            size={100}
            src={
              profile?.user?.profilePicture
                ? `http://localhost:7000/${profile.user.profilePicture}`
                : undefined
            }
            icon={!profile?.user?.profilePicture && <UserOutlined />}
            className="mb-4"
          />

          <h1 className="text-5xl font-bold mb-2">{profile.user.name}</h1>
          <h1 className="text-gray-600 text-2xl mb-4">{profile.user.email}</h1>
          <p className="text-gray-500 font-bold">
            {profile?.isAdmin ? (
              <Tag icon={<CrownOutlined />} color="gold">
                Admin User
              </Tag>
            ) : (
              <Tag icon={<SmileOutlined />} color="blue">
                Regular User
              </Tag>
            )}
          </p>

          <Button type="primary" danger onClick={handleLogout} className="mt-4">
            {" "}
            LogOut
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ProfileScreen;
