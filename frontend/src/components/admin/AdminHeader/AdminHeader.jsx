import { Button, Space } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const AdminHeader = () => {
  const handleLogout = () => {
   
    console.log('Logged out');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end h-16"> 
          
          <Space className="space-x-4">
            <Button
              type="link"
              icon={<UserOutlined />}
              className="flex items-center text-gray-600 hover:text-blue-600"
            >
              <Link to="/admin/profile">Admin Profile</Link>
            </Button>
            
            <Button
              type="default"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              className="hover:bg-red-50 text-red-600 border-red-100"
            >
              Logout
            </Button>
          </Space>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;