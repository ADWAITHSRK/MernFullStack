import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  ShoppingOutlined,
  InboxOutlined,
  UserOutlined
} from '@ant-design/icons';

const { Sider } = Layout;


const AdminSidebar = () => {
  return (
    <Sider theme='dark' className='min-h-screen fixed left-8' width={240}>
        <div className='p-4'>
            <h2 className='text-white text-xl font-bold text-center'>Admin Panel</h2>
        </div>
        <Menu theme='dark' mode='inline' defaultSelectedKeys={['dashboard']} className='mt-4'> 
            <Menu.Item key='products' icon={<ShoppingOutlined />}>
                <Link to="/admin/product"></Link>
                Products
            </Menu.Item>

            <Menu.Item key='orders' icon={<InboxOutlined />}>
                <Link to="/admin/order"></Link>
                Orders
            </Menu.Item>

            <Menu.Item key='Users' icon={<UserOutlined />}>
                <Link to="/admin/user"></Link>
                Users
            </Menu.Item>
        </Menu>
    </Sider>

  )
}

export default AdminSidebar