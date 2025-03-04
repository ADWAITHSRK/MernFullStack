import { Button, Space } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const AdminHeader = () => {
  const handleLogout = () => {
    // Add logout logic here
    console.log('Logged out');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end h-16"> {/* Changed to justify-end */}
          {/* Right side - Actions only */}
          <Space className="space-x-4">
        
            
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