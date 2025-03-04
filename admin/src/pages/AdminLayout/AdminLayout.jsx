import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar.jsx'
import AdminHeader from '../../components/AdminHeader/AdminHeader.jsx'

const { Content } = Layout;

const AdminLayout = () => {
  return (
    <div className="flex h-screen w-full ">
      {/* Sidebar */}
      <div className="w-[240px] bg-gray-900 text-white fixed h-full z-5">
        <AdminSidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 ml-[240px] flex flex-col bg-gray-50">
        {/* Sticky Header */}
        <div className="sticky top-0 w-full  shadow bg-white mx-auto z-0">
          <AdminHeader />
        </div>

        {/* Content Area */}
        <div className="p-8 flex-1 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 min-h-[calc(100vh-160px)]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
