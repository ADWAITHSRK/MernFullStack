import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../../components/admin/AdminSidebar/AdminSidebar'
import AdminHeader from '../../../components/admin/AdminHeader/AdminHeader'
const AdminLayout = () => {
  return (
    <Layout className="min-h-screen">
      <AdminSidebar />
      
      <Layout className="bg-gray-50 ml-[240px]"> {/* Offset for sidebar width */}
        {/* Sticky Header */}
        <div className="sticky top-0 z-10">
          <AdminHeader />
        </div>

        {/* Main Content Area */}
        <Layout.Content className="p-8">
          <div className="bg-white rounded-lg shadow-sm p-6 min-h-[calc(100vh-160px)]">
            <Outlet />
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
